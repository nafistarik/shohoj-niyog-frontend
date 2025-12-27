"use client";
import { Button } from "@/components/ui/button";
import { Award, Clock, CalendarDays, Eye } from "lucide-react";
import Link from "next/link";
import EmptyState from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import CandidateDashboardCard from "./_components/candidate-dashboard-card";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/constants";
import { formatDate, getCookie } from "@/lib/utils";

export default function CandidateDashboard() {
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

  if (isLoading) return <p>Loading sessions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // Calculate upcoming interviews (scheduled in the future)
  const now = new Date();
  const upcomingInterviews = sessions?.filter(
    (session) => new Date(session.scheduled) > now
  );

  // Find the next interview (closest upcoming)
  const nextInterview =
    upcomingInterviews.length > 0
      ? upcomingInterviews.reduce((closest, current) => {
          const closestTime = new Date(closest.scheduled).getTime();
          const currentTime = new Date(current.scheduled).getTime();
          const nowTime = now.getTime();

          return currentTime - nowTime < closestTime - nowTime
            ? current
            : closest;
        })
      : null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <PageHeader
        title="My Interviews"
        description="Participate in video interviews and track your progress"
      >
        <Button variant="outline" asChild size="sm">
          <Link href="/candidate/results">
            <Eye />
            <span className="hidden md:flex">View Results</span>
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            icon={<Award className="w-6 h-6 text-primary" />}
            title={`${sessions?.length}`}
            description="Total Interviews"
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-primary" />}
            title={`${upcomingInterviews.length}`}
            description="Upcoming Interviews"
          />
          <StatCard
            icon={<CalendarDays className="w-6 h-6 text-primary" />}
            title={`${nextInterview ? nextInterview.created_by : "🚫"}`}
            description={`${
              nextInterview
                ? formatDate(nextInterview.scheduled)
                : "No upcoming interviews"
            }`}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sessions.length === 0 ? (
          <EmptyState
            title="No interviews available"
            description="You haven't been invited to any interviews yet. Check back later or contact the interviewer."
            actionLabel="Refresh"
            actionHref="/candidate/dashboard"
          />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sessions?.map((session, index) => (
              <CandidateDashboardCard session={session} key={session.id} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
