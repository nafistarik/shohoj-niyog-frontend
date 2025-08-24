"use client";

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
import { ArrowLeft, Calendar, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { CandidateResponse, InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

interface CandidateResultWithSession extends CandidateResponse {
  session?: InterviewSession;
}

// Dummy results data

// [
//   {
//     id: "68a3ca3a48ab2dff2b722a11",
//     session_id: "689b58bc6606fbf9088d8105",
//     candidate_id: "uuid",
//     candidate_name: "user1",
//     candidate_mail: "user1@gmail.com",
//     responses: [{ question_id: "q2fa82f31", given_answer: "...", score: 3.22 }],
//     total_score: 6.16,
//     decision: "pending",
//   },
//   {
//     id: "68a3ca3a48ab2dff2b722a11",
//     session_id: "689b58bc6606fbf9088d8105",
//     candidate_id: "uuid",
//     candidate_name: "user1",
//     candidate_mail: "user1@gmail.com",
//     responses: [{ question_id: "q2fa82f31", given_answer: "...", score: 3.22 }],
//     total_score: 6.16,
//     decision: "pending",
//   },
// ];

const results = [
  {
    id: "res_1",
    decision: "interested",
    session: {
      id: "sess_1",
      position: "Frontend Developer",
      stack: ["React", "TypeScript", "Tailwind"],
      scheduled: "2025-08-01T10:00:00.000Z",
    },
  },
  {
    id: "res_2",
    decision: "pending",
    session: {
      id: "sess_2",
      position: "Backend Developer",
      stack: ["Node.js", "Express", "MongoDB"],
      scheduled: "2025-08-10T14:00:00.000Z",
    },
  },
  {
    id: "res_3",
    decision: "reject",
    session: {
      id: "sess_3",
      position: "Full Stack Engineer",
      stack: ["Next.js", "GraphQL", "PostgreSQL"],
      scheduled: "2025-07-20T09:30:00.000Z",
    },
  },
];

export default function CandidateResultsPage() {
  // const [results, setResults] = useState<CandidateResultWithSession[]>([])
  // const [isLoading, setIsLoading] = useState(true)

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDecisionColor = (decision: CandidateResponse["decision"]) => {
    switch (decision) {
      case "interested":
        return "bg-green-100 text-green-700 border-green-200";
      case "not_interested":
        return "bg-red-100 text-red-700 border-red-200";
      case "accept":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "reject":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
    }
  };

  const getDecisionText = (decision: CandidateResponse["decision"]) => {
    switch (decision) {
      case "interested":
        return "Interested";
      case "not_interested":
        return "Not Interested";
      case "accept":
        return "Accepted";
      case "reject":
        return "Rejected";
      default:
        return "Under Review";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreGrade = (score: number) => {
    if (score >= 9) return "Excellent";
    if (score >= 8) return "Very Good";
    if (score >= 7) return "Good";
    if (score >= 6) return "Fair";
    return "Needs Improvement";
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href="/candidate/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">
                  My Results
                </h1>
                <p className="text-slate-600 mt-1">
                  Track your interview performance and feedback
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-slate-600">Overall Performance</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {results.length === 0 ? (
          <EmptyState
            title="No interview results yet"
            description="Complete some interviews to see your results and feedback here."
            actionLabel="Find Interviews"
            actionHref="/candidate/dashboard"
          />
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-slate-600" />
                    <div>
                      <div className="text-2xl font-bold text-slate-900">
                        {results.length}
                      </div>
                      <div className="text-sm text-slate-600">
                        Interviews Completed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {
                      results.filter(
                        (r) =>
                          r.decision === "interested" || r.decision === "accept"
                      ).length
                    }
                  </div>
                  <div className="text-sm text-slate-600">
                    Positive Responses
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {results.filter((r) => r.decision === "pending").length}
                  </div>
                  <div className="text-sm text-slate-600">Pending Review</div>
                </CardContent>
              </Card>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {results.map((result) => (
                <Card
                  key={result.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg font-heading">
                          {result.session?.position || "Interview Session"}
                        </CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-1">
                          <span>
                            {result.session?.stack
                              ? Array.isArray(result.session.stack)
                                ? result.session.stack.join(", ")
                                : result.session.stack
                              : "Technology Stack"}
                          </span>
                          {result.session?.scheduled && (
                            <>
                              <span>•</span>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {formatDate(result.session.scheduled)}
                              </div>
                            </>
                          )}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getDecisionColor(result.decision)}>
                          {getDecisionText(result.decision)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      

                      {result.decision === "pending" && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <p className="text-sm text-yellow-800">
                            Your interview is currently under review. You'll be
                            notified once a decision is made.
                          </p>
                        </div>
                      )}

                      {(result.decision === "interested" ||
                        result.decision === "accept") && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                          <p className="text-sm text-green-800">
                            Great news! The interviewer is interested in moving
                            forward with your application.
                          </p>
                        </div>
                      )}

                      {(result.decision === "not_interested" ||
                        result.decision === "reject") && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                          <p className="text-sm text-slate-700">
                            Thank you for your time. While this opportunity
                            didn't work out, keep applying and improving!
                          </p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
