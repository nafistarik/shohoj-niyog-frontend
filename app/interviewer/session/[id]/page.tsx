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
  qa_pairs: [{ question_id: "...", question: "...", answer: "..." },{ question_id: "...", question: "...", answer: "..." },{ question_id: "...", question: "...", answer: "..." },],
  allowed_candidates: ["uuid", "can2@gmail.com"],
  scheduled: "2025-08-25T06:30:00Z",
};

export default function SessionDetailsPage() {
  // const [session, setSession] = useState<InterviewSession | null>(null)
  // const [isLoading, setIsLoading] = useState(true)
  // const [error, setError] = useState("")
  const [copiedEmails, setCopiedEmails] = useState<string[]>([]);
  // const params = useParams()

  // useEffect(() => {
  //   if (params.id) {
  //     fetchSession(params.id as string)
  //   }
  // }, [params.id])

  // const fetchSession = async (sessionId: string) => {
  //   try {
  //     const response = await fetch(`/api/find/${sessionId}`)
  //     if (response.ok) {
  //       const data = await response.json()
  //       setSession(data)
  //     } else {
  //       setError("Session not found")
  //     }
  //   } catch (err) {
  //     setError("Failed to load session details")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  // const copyToClipboard = async (text: string, email: string) => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setCopiedEmails([...copiedEmails, email]);
  //     setTimeout(() => {
  //       setCopiedEmails(copiedEmails.filter((e) => e !== email));
  //     }, 2000);
  //   } catch (err) {
  //     console.error("Failed to copy:", err);
  //   }
  // };

  // const generateInviteLink = (candidateEmail: string) => {
  //   return `${window.location.origin}/candidate/interview/${
  //     params.id
  //   }?email=${encodeURIComponent(candidateEmail)}`;
  // };

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
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

  // if (error || !session) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <ErrorMessage message={error || "Session not found"} />
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/interviewer/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">
                  {session.position}
                </h1>
                <p className="text-slate-600 mt-1">Interview Session Details</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link href={`/interviewer/session/${session.id}/results`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Results
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Session Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">
                  Session Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Position
                  </Label>
                  <p className="text-slate-900 font-medium">
                    {session.position}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Technology Stack
                  </Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(Array.isArray(session.stack)
                      ? session.stack
                      : [session.stack]
                    ).map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Experience Level
                  </Label>
                  <Badge className={`${getLevelColor(session.level)} mt-1`}>
                    {session.level}
                  </Badge>
                </div>

                <div>
                  <Label className="text-sm font-medium text-slate-600">
                    Questions
                  </Label>
                  <p className="text-slate-900">
                    {session.qa_pairs.length} questions
                  </p>
                </div>

                {session.scheduled && (
                  <div>
                    <Label className="text-sm font-medium text-slate-600">
                      Scheduled
                    </Label>
                    <div className="flex items-center text-slate-900 mt-1">
                      <Calendar className="w-4 h-4 mr-2" />
                      {formatDate(session.scheduled)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invited Candidates */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Invited Candidates ({session.allowed_candidates.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {session.allowed_candidates.map((email) => (
                    <div
                      key={email}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                    >
                      <span className="text-sm font-medium text-slate-900">
                        {email}
                      </span>
                      {/* <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(generateInviteLink(email), email)
                        }
                        className="text-xs"
                      >
                        {copiedEmails.includes(email) ? (
                          <CheckCircle className="w-3 h-3 mr-1" />
                        ) : (
                          <Copy className="w-3 h-3 mr-1" />
                        )}
                        {copiedEmails.includes(email) ? "Copied!" : "Copy Link"}
                      </Button> */}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions & Answers */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">
                  Interview Questions
                </CardTitle>
                <CardDescription>
                  AI-generated questions based on the position and technology
                  stack
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {session.qa_pairs.map((qa, index) => (
                    <div
                      key={qa.question_id}
                      className="border-l-4 border-sky-200 pl-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-slate-900">
                          Question {index + 1}
                        </h3>
                        {/* <Badge variant="outline" className="text-xs">
                          ID: {qa.question_id}
                        </Badge> */}
                      </div>
                      <p className="text-slate-700 mb-3 leading-relaxed">
                        {qa.question}
                      </p>
                      <div className="bg-slate-50 p-3 rounded-lg">
                        <Label className="text-xs font-medium text-slate-600 uppercase tracking-wide">
                          Expected Answer
                        </Label>
                        <p className="text-sm text-slate-600 mt-1">
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
    <label className={className} {...props}>
      {children}
    </label>
  );
}
