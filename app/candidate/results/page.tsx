"use client";

import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Star,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { CandidateResponse, InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import CandidateResultCard from "./_components/candidate-result-card";
import { API_BASE_URL } from "@/lib/constants";

interface CandidateResultWithSession extends CandidateResponse {
  session?: InterviewSession;
}

export default function CandidateResultsPage() {
  const [resultsData, setResultsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_BASE_URL}/api/results/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setResultsData(data);
          console.log(data, "cand res");
        } else {
          console.error("❌ Failed to fetch results:", data);
          setError(data?.error || "Failed to load results");
        }
      } catch (error) {
        console.error("🚨 Error fetching results:", error);
        setError("Something went wrong while fetching results.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  // const fetchResults = async () => {
  //   try {
  //     if (user?.user_id) {
  //       // In a real app, this would fetch results for the authenticated candidate
  //       const response = await fetch(`/api/candidate/results?candidate_id=${user.user_id}`)
  //       if (response.ok) {
  //         const data = await response.json()
  //         setResults(data)
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch results:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const updateDecision = async (resultId: string, newDecision: string) => {
    console.log(`Updating decision for result ${resultId} to ${newDecision}`);

    // Update local state
    setResultsData((prev) =>
      prev.map((result) =>
        result.id === resultId ? { ...result, decision: newDecision } : result
      )
    );

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/api/decide/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          session_id: resultId,
          // candidate_id: candidateId,
          decision: newDecision,
        }),
      });

      console.log({
        session_id: resultId,
        // candidate_id: candidateId,
        decision: newDecision,
      });
      const data = await response.json();

      console.log(data, "this is update response data");

      if (!response.ok) {
        throw new Error(data?.error || "Failed to update decision");
      }
    } catch (err) {
      console.error("Failed to update decision:", err);
    }

    // In a real app, you would make an API call here
    // try {
    //   const response = await fetch("/api/candidate/update-decision", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       result_id: resultId,
    //       decision: newDecision,
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error("Failed to update decision");
    //   }
    // } catch (err) {
    //   console.error("Failed to update decision:", err);
    //   // Revert the change if the API call fails
    //   setResultsData(prev =>
    //     prev.map(result =>
    //       result.id === resultId
    //         ? { ...result, decision: originalDecision }
    //         : result
    //     )
    //   );
    // }
  };
  // const updateDecision = async (candidateId: string, decision: string) => {

  //   setResultsData((prev) =>
  //     prev.map((result) =>
  //       result.candidate_id === candidateId
  //         ? { ...result, decision: decision as any }
  //         : result
  //     )
  //   );

  //   try {
  //     const token = localStorage.getItem("token");

  //     const response = await fetch("http://13.60.253.43/api/decide/", {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: token ? `Bearer ${token}` : "",
  //       },
  //       body: JSON.stringify({
  //         session_id: sessionId,
  //         candidate_id: candidateId,
  //         decision,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data?.error || "Failed to update decision");
  //     }
  //   } catch (err) {
  //     console.error("Failed to update decision:", err);
  //   }
  // };

  if (isLoading) return <p>Loading session...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen pb-12">
      <PageHeader
        title="My Results"
        description="Track your interview performance and feedback"
        backHref="/candidate/dashboard"
        backLabel="Back to Dashboard"
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsData.length === 0 ? (
          <EmptyState
            title="No interview results yet"
            description="Complete some interviews to see your results and feedback here."
            actionLabel="Find Interviews"
            actionHref="/candidate/dashboard"
          />
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <StatCard
                icon={<FileText className="w-6 h-6 text-primary" />}
                title={`${resultsData.length}`}
                description="Interviews Completed"
              />
              <StatCard
                icon={<CheckCircle className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter(
                    (r) =>
                      r.decision === "interested" || r.decision === "accept"
                  ).length
                }`}
                description="Positive Responses"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "pending").length
                }`}
                description="Pending Review"
              />
            </div>

            {/* Results List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Interview Results
              </h2>

              {resultsData.map((result) => (
                <CandidateResultCard
                  result={result}
                  updateDecision={updateDecision}
                  key={result.session_id}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
