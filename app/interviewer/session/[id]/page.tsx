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
  Copy,
  CheckCircle,
  FileText,
  Code,
  Clock,
  Star,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorMessage } from "@/components/shared/error-message";

const session = {
  id: "68935b9fc5f8140275f8b24a",
  position: "Backend Developer",
  stack: "Node, Django, MongoDB",
  level: "Intermediate",
  created_by: "recruiter_id",
  qa_pairs: [
    {
      question_id: "1",
      question:
        "Explain the concept of middleware in Express.js and provide an example of how you would implement custom middleware for authentication.",
      answer:
        "Middleware in Express.js are functions that have access to the request and response objects, and the next middleware function in the application's request-response cycle. They can execute any code, make changes to request/response objects, end the request-response cycle, or call the next middleware. For authentication, I would create middleware that verifies JWT tokens from the Authorization header.",
    },
    {
      question_id: "2",
      question:
        "Describe how you would optimize MongoDB queries for better performance in a high-traffic application.",
      answer:
        "I would use indexing on frequently queried fields, implement pagination with skip() and limit(), use projection to return only necessary fields, leverage aggregation pipeline for complex operations, and implement caching with Redis for frequently accessed data.",
    },
    {
      question_id: "3",
      question:
        "How would you handle database migrations and schema changes in a production Django application without causing downtime?",
      answer:
        "I would use Django's migration system with careful planning: create migrations in development, test thoroughly in staging, deploy during low-traffic periods, use backward-compatible changes initially, and consider using tools like Django-migrations-graph for complex deployment scenarios.",
    },
  ],
  allowed_candidates: [
    "john.doe@example.com",
    "sarah.smith@techcorp.com",
    "mike.johnson@devteam.io",
  ],
  scheduled: "2025-08-25T06:30:00Z",
};

export default function SessionDetailsPage() {
  const [copiedEmails, setCopiedEmails] = useState<string[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200";
      case "intermediate":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return <Star className="w-4 h-4 fill-green-500 text-green-500" />;
      case "intermediate":
        return <Star className="w-4 h-4 fill-amber-500 text-amber-500" />;
      case "advanced":
        return <Star className="w-4 h-4 fill-red-500 text-red-500" />;
      default:
        return <Star className="w-4 h-4 fill-slate-500 text-slate-500" />;
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold text-slate-900">
                  {session.position}
                </h1>
                <p className="text-slate-600 text-sm">
                  Interview Session Details
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href={`/interviewer/session/${session.id}/results`}>
                  <Eye />
                  View Results
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/interviewer/dashboard">
                  <ArrowLeft />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

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
                    {session.position}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Technology Stack
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {session.stack.split(", ").map((tech) => (
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
                  <Badge
                    className={`${getLevelColor(
                      session.level
                    )} px-3 py-1 font-medium`}
                  >
                    {getLevelIcon(session.level)}
                    <span className="ml-1">{session.level}</span>
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600 mb-2 block">
                    Questions
                  </Label>
                  <div className="flex items-center text-slate-900">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    <span className="font-semibold">
                      {session.qa_pairs.length} questions
                    </span>
                  </div>
                </div>

                {session.scheduled && (
                  <div>
                    <Label className="text-sm font-medium text-slate-600 mb-2 block">
                      Scheduled Date
                    </Label>
                    <div className="flex items-center text-slate-900">
                      <Calendar className="w-4 h-4 mr-2 text-primary" />
                      <span className="font-medium">
                        {formatDate(session.scheduled)}
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
                  Invited Candidates ({session.allowed_candidates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {session.allowed_candidates.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 bg-slate-50/50 rounded-lg border border-slate-200/50"
                    >
                      <span className="text-sm font-medium text-slate-900 truncate">
                        {email}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          copyToClipboard(generateInviteLink(email), email)
                        }
                      >
                        {copiedEmails.includes(email) ? (
                          <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                        ) : (
                          <LinkIcon className="w-3 h-3 mr-1" />
                        )}
                        {copiedEmails.includes(email) ? "Copied!" : "Link"}
                      </Button>
                    </div>
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
                  AI-generated questions tailored for {session.position}{" "}
                  position
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {session.qa_pairs.map((qa, index) => (
                    <div
                      key={qa.question_id}
                      className="border-l-4 border-primary/20 pl-4 py-2 hover:border-primary/40 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-semibold text-primary">
                              {index + 1}
                            </span>
                          </div>
                          <h3 className="font-semibold text-slate-900">
                            Question {index + 1}
                          </h3>
                        </div>
                      </div>
                      <p className="text-slate-700 mb-4 leading-relaxed pl-11">
                        {qa.question}
                      </p>
                      <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-200/50">
                        <div className="flex items-center mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                          <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                            Expected Answer
                          </Label>
                        </div>
                        <p className="text-sm text-slate-700 mt-1 leading-relaxed">
                          {qa.answer}
                        </p>
                      </div>
                    </div>
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
