"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Users, Eye, FileText, Code } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import AllowedCandidatesItem from "../../../../features/interviewer/allowed-candidate-item";
import SessionQAPair from "../../../../features/interviewer/session-qa-pair";
import { formatDate } from "@/lib/utils";
import { LevelBadge } from "@/components/shared/level-badge";
import { CustomLabel } from "@/components/shared/custom-label";
import { useFetch } from "@/hooks/use-fetch";
import ErrorState from "@/components/shared/error-state";
import LoadingState from "@/components/shared/loading-state";
import type { InterviewSession } from "@/lib/types";

export default function SessionDetailsPage() {
  const pathname = usePathname();
  const sessionId = pathname.split("/")[3];

  const {
    data: session,
    loading,
    error,
  } = useFetch<InterviewSession>(`/api/find/${sessionId}`);
  if (error) return <ErrorState message={error} />;
  if (loading) return <LoadingState data="Interview Sessions" />;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title={session?.position}
        description="Interview Session Details"
        backLabel="Back to Dashboard"
        backHref="/interviewer/dashboard"
        backIcon={<ArrowLeft />}
      >
        <Button variant="outline" asChild size="sm">
          <Link href={`/interviewer/session/${session?.id}/results`}>
            <Eye />
            <span className="hidden md:flex">View Results</span>
          </Link>
        </Button>
      </PageHeader>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Session Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Session Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <CustomLabel>Position</CustomLabel>
                  <p className="text-foreground font-medium text-lg">
                    {session?.position}
                  </p>
                </div>

                <div>
                  <CustomLabel>Technology Stack</CustomLabel>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(session?.stack)
                      ? session.stack
                      : session?.stack.split(", ") ?? []
                    ).map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-secondary text-primary border-border px-3 py-1"
                      >
                        <Code className="w-3 h-3 mr-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {session?.level && (
                  <div>
                    <CustomLabel>Experience Level</CustomLabel>
                    <LevelBadge level={session.level} />
                  </div>
                )}

                <div>
                  <CustomLabel>Questions</CustomLabel>
                  <div className="flex items-center text-foreground">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-semibold">
                      {session?.qa_pairs?.length ?? 0} questions
                    </span>
                  </div>
                </div>

                {session?.scheduled && (
                  <div>
                    <CustomLabel>Scheduled Date</CustomLabel>
                    <div className="flex items-center text-foreground">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium">
                        {formatDate(session?.scheduled)}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invited Candidates */}
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-foreground flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Invited Candidates ({session?.allowed_candidates?.length ?? 0})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {session?.allowed_candidates?.map((email) => (
                    <AllowedCandidatesItem email={email} key={email} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions & Answers */}
          <div className="lg:col-span-2">
            <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Interview Questions
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  AI-generated questions tailored for {session?.position}{" "}
                  position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {session?.qa_pairs?.map((qa, index) => (
                    <SessionQAPair qa={qa} index={index} key={qa.question_id} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
