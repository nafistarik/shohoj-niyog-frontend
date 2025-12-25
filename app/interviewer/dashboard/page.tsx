"use client";

import { useState, useEffect } from "react";
import InterviewerSessionCard from "@/app/interviewer/dashboard/_components/interviewer-session-card";
import { Users, Clock, FileText } from "lucide-react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import EmptyState from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { API_BASE_URL } from "@/lib/constants";
import { getCookie } from "@/lib/utils";

const user = {
  _id: "ObjectId",
  username: "Beximco Group",
  email: "support@beximco.com",
  phone: "0171111111",
  password: "<hashed>",
  role: "interviewer",
  created: "ISODate",
};

export default function InterviewerDashboard() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchSessions = async () => {
    setError("");
    setIsLoading(true);

    try {
      const token = getCookie("access_token");

      const response = await fetch(`${API_BASE_URL}/api/findall/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      const data = await response.json();
      if (response.ok) {
        setSessions(data);
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

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E1F1FF] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Interview Sessions"
        description="Manage your interview sessions and review candidates"
        welcomeText={`Welcome, ${user?.username}`}
        actionLabel="Create Session"
        actionHref="/interviewer/create"
      />

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title={`${sessions.length}`}
              description="Total Sessions"
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title={`${sessions.reduce(
                (acc, session) => acc + session.allowed_candidates.length,
                0
              )}`}
              description="Candidates"
            />
            <StatCard
              icon={<Clock className="w-6 h-6 text-primary" />}
              title={`${
                sessions.filter((s) => new Date(s.scheduled) > new Date())
                  .length
              }`}
              description="Upcoming"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {sessions.length === 0 ? (
          <EmptyState
            title="No interview sessions yet"
            description="Create your first interview session to start evaluating candidates."
            actionLabel="Create Session"
            actionHref="/interviewer/create"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <InterviewerSessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
