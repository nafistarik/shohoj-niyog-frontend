"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Target, Clock } from "lucide-react";
import { usePathname } from "next/navigation";
import CandidateResultCard from "./_components/candidate-result-card";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { API_BASE_URL } from "@/lib/constants";
import { formatDate, getCookie } from "@/lib/utils";
import { LevelBadge } from "@/components/shared/level-badge";

export default function SessionResultsPage() {
  const [resultsData, setResultsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resultLoading, setIsResultLoading] = useState(false);
  const [resultError, setResultError] = useState("");
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();
  const pathParts = pathname.split("/"); // ['', 'interviewer', 'session', '123', 'results']
  const sessionId = pathParts[3];

  const fetchSessions = async () => {
    setError("");
    setIsLoading(true);

    try {
      const token = getCookie("access_token");

      const response = await fetch(`${API_BASE_URL}/api/find/${sessionId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setSession(data);
      } else {
        console.error("❌ Failed to fetch sessions:", data);
        setError(data?.error || "Failed to load interview sessions");
      }
    } catch (error) {
      console.error("🚨 Error fetching sessions:", error);
      setError("Something went wrong while fetching sessions.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (!sessionId) return;

    const fetchResults = async () => {
      setIsResultLoading(true);
      setResultError("");

      try {
        const token = getCookie("access_token");

        const response = await fetch(
          `${API_BASE_URL}/api/results/${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setResultsData(data);
        } else {
          console.error("❌ Failed to fetch results:", data);
          setResultError(data?.error || "Failed to load results");
        }
      } catch (error) {
        console.error("🚨 Error fetching results:", error);
        setResultError("Something went wrong while fetching results.");
      } finally {
        setIsResultLoading(false);
      }
    };

    fetchResults();
  }, [sessionId]);

  const updateDecision = async (candidateId: string, decision: string) => {
    // Update UI immediately (optimistic update)
    setResultsData((prev) =>
      prev.map((result) =>
        result.candidate_id === candidateId
          ? { ...result, decision: decision as any }
          : result
      )
    );

    try {
      const token = getCookie("access_token");

      const response = await fetch(`${API_BASE_URL}/api/decide/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          session_id: sessionId,
          candidate_id: candidateId,
          decision,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to update decision");
      }
    } catch (err) {
      console.error("Failed to update decision:", err);
    }
  };

  const highestScore = Math.max(...resultsData.map((r) => r.total_score));

  if (isLoading) return <p>Loading session...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (resultLoading) return <p>Loading results...</p>;
  if (resultError) return <p style={{ color: "red" }}>{resultError}</p>;

  return (
    <div className="min-h-screen bg-white pb-12">
      {session && (
        <PageHeader
          title={`${session.position} - Results`}
          description="Review candidate responses and make decisions"
          backLabel="Back to Session"
          backHref={`/interviewer/session/${sessionId}`}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No responses yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <StatCard
                icon={<Users className="w-6 h-6 text-primary" />}
                title={`${resultsData.length}`}
                description="Total Responses"
              />
              <StatCard
                icon={<Target className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "accept").length
                }`}
                description="Accepted"
              />
              <StatCard
                icon={<Target className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "interested").length
                }`}
                description="Interested"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "pending").length
                }`}
                description="Pending Review"
              />
            </div>

            {/* Session Info Card */}
            <Card>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Session Details
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      <LevelBadge level={session.level} /> • {session.stack}
                    </p>
                    {session.scheduled && (
                      <div className="flex items-center text-muted-foreground mt-2">
                        <Calendar className="w-4 h-4 mr-1 text-primary/70" />
                        Scheduled: {formatDate(session.scheduled)}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
                    {session.qa_pairs.length} questions •{" "}
                    {session.allowed_candidates.length} candidates invited
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Candidate Results
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {resultsData.map((result) => (
                  <CandidateResultCard
                    key={result.id}
                    result={result}
                    updateDecision={updateDecision}
                    highestScore={highestScore}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
