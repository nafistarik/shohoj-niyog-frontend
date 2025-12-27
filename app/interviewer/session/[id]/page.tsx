"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Users,
  Eye,
  FileText,
  Code,
  Star,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import AllowedCandidatesItem from "./_components/allowed-candidate-item";
import SessionQAPair from "./_components/session-qa-pair";
import { API_BASE_URL } from "@/lib/constants";
import { formatDate, getCookie } from "@/lib/utils";
import { LevelBadge } from "@/components/shared/level-badge";

function Label({
  className,
  children,
  ...props
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`text-sm font-medium text-slate-600 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default function SessionDetailsPage() {
  const [copiedEmails, setCopiedEmails] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const sessionId = pathname.split("/")[3];

  const copyToClipboard = async (text: string, identifier: string) => {
    try {
      await navigator.clipboard.writeText(text);
      if (identifier.includes("@")) {
        setCopiedEmails([...copiedEmails, identifier]);
        setTimeout(() => {
          setCopiedEmails(copiedEmails.filter((e) => e !== identifier));
        }, 2000);
      } else {
        setCopiedLink(identifier);
        setTimeout(() => setCopiedLink(null), 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const generateInviteLink = (candidateEmail: string) => {
    return `${window.location.origin}/candidate/interview/${
      session.id
    }?email=${encodeURIComponent(candidateEmail)}`;
  };

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

  if (isLoading) return <p>Loading sessions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100">
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
            <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-primary" />
                  Session Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Position
                  </Label>
                  <p className="text-slate-900 font-medium text-lg">
                    {session?.position}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Technology Stack
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {session?.stack.split(", ").map((tech: string) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200 px-3 py-1"
                      >
                        <Code className="w-3 h-3 mr-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Experience Level
                  </Label>
                  <LevelBadge level={session.level} />
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Questions
                  </Label>
                  <div className="flex items-center text-slate-900">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-semibold">
                      {session?.qa_pairs.length} questions
                    </span>
                  </div>
                </div>

                {session?.scheduled && (
                  <div>
                    <Label className="text-sm font-medium text-slate-600 mb-2 block">
                      Scheduled Date
                    </Label>
                    <div className="flex items-center text-slate-900">
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
            <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Invited Candidates ({session?.allowed_candidates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {session?.allowed_candidates.map((email: string) => (
                    <AllowedCandidatesItem
                      email={email}
                      key={email}
                      copiedEmails={copiedEmails}
                      copyToClipboard={copyToClipboard}
                      generateInviteLink={generateInviteLink}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions & Answers */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-slate-900">
                  Interview Questions
                </CardTitle>
                <CardDescription className="text-slate-600">
                  AI-generated questions tailored for {session?.position}{" "}
                  position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {session?.qa_pairs.map(
                    (
                      qa: {
                        question_id: string;
                        question: string;
                        answer: string;
                      },
                      index: number
                    ) => (
                      <SessionQAPair
                        qa={qa}
                        index={index}
                        key={qa.question_id}
                      />
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
