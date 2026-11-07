"use client";

import InterviewerSessionCard from "@/features/interviewer/interviewer-session-card";
import { Users, Clock, FileText } from "lucide-react";
import EmptyState from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/page-header";
import { useCookie } from "@/hooks/use-cookie";
import type { InterviewSession } from "@/lib/types";
import { useFetch } from "@/hooks/use-fetch";
import LoadingState from "@/components/shared/loading-state";
import ErrorState from "@/components/shared/error-state";

export default function InterviewerDashboard() {
  const userName = useCookie("user_name");
  const { data: sessions, loading, error } = useFetch<InterviewSession[]>("/api/findall/");
  if (error) return <ErrorState message={error} />;
  if (loading) return <LoadingState data="Interview Sessions" />;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Interview Sessions"
        description="Manage your interview sessions and review candidates"
        welcomeText={userName ? `Welcome, ${userName}` : undefined}
        actionLabel="Create Session"
        actionHref="/interviewer/create"
      />

      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title={`${sessions?.length ?? 0}`}
              description="Total Sessions"
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title={`${
                sessions?.reduce(
                  (acc, session) =>
                    acc + (session.allowed_candidates?.length ?? 0),
                  0
                ) ?? 0
              }`}
              description="Candidates"
            />
            <StatCard
              icon={<Clock className="w-6 h-6 text-primary" />}
              title={`${
                sessions?.filter(
                  (s) => !!s.scheduled && new Date(s.scheduled) > new Date()
                ).length ?? 0
              }`}
              description="Upcoming"
            />
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {!sessions?.length ? (
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
