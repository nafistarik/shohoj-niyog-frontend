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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  BarChart3,
  Clock,
  Play,
  Star,
  Target,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { CandidateResponse, InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ErrorMessage } from "@/components/shared/error-message";
import { EmptyState } from "@/components/shared/empty-state";

const session = {
  id: "68935b9fc5f8140275f8b24a",
  position: "Backend Developer",
  stack: "Node, Django, MongoDB",
  level: "Intermediate",
  created_by: "recruiter_id",
  qa_pairs: [
    { question_id: "...", question: "...", answer: "..." },
    { question_id: "...", question: "...", answer: "..." },
    { question_id: "...", question: "...", answer: "..." },
  ],
  allowed_candidates: ["uuid", "can2@gmail.com"],
  scheduled: "2025-08-25T06:30:00Z",
};

const results = [
  {
    id: "68a3ca3a48ab2dff2b722a11",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "Sarah Johnson",
    candidate_mail: "sarah.johnson@example.com",
    responses: [
      {
        question_id: "q2fa82f31",
        given_answer: "I have 5 years of experience with Node.js...",
        score: 8.5,
      },
      {
        question_id: "q2fa82f31",
        given_answer: "I would implement caching and database optimization...",
        score: 7.8,
      },
      {
        question_id: "q2fa82f31",
        given_answer:
          "My approach would be to first understand the root cause...",
        score: 9.2,
      },
    ],
    total_score: 8.5,
    decision: "pending",
  },
  {
    id: "68a3ca3a48ab2dff2b722a12",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "Michael Chen",
    candidate_mail: "michael.chen@example.com",
    responses: [
      {
        question_id: "q2fa82f31",
        given_answer: "I've worked with both SQL and NoSQL databases...",
        score: 9.1,
      },
      {
        question_id: "q2fa82f31",
        given_answer: "I prefer using Docker for containerization...",
        score: 8.7,
      },
      {
        question_id: "q2fa82f31",
        given_answer: "I would implement a microservices architecture...",
        score: 9.5,
      },
    ],
    total_score: 9.1,
    decision: "interested",
  },
  {
    id: "68a3ca3a48ab2dff2b722a13",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "Emma Rodriguez",
    candidate_mail: "emma.rodriguez@example.com",
    responses: [
      {
        question_id: "q2fa82f31",
        given_answer:
          "I'm familiar with REST APIs but still learning GraphQL...",
        score: 6.2,
      },
      {
        question_id: "q2fa82f31",
        given_answer: "I would try to optimize the algorithm first...",
        score: 5.8,
      },
      {
        question_id: "q2fa82f31",
        given_answer:
          "I think the best approach would be to add more logging...",
        score: 7.1,
      },
    ],
    total_score: 6.4,
    decision: "pending",
  },
];

export default function SessionResultsPage() {
  // const [session, setSession] = useState<InterviewSession | null>(null);
  // const [results, setResults] = useState<CandidateResponse[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const params = useParams();

  // useEffect(() => {
  //   if (params.id) {
  //     fetchSessionAndResults(params.id as string)
  //   }
  // }, [params.id])

  // const fetchSessionAndResults = async (sessionId: string) => {
  //   try {
  //     // Fetch session details
  //     const sessionResponse = await fetch(`/api/find/${sessionId}`)
  //     if (sessionResponse.ok) {
  //       const sessionData = await sessionResponse.json()
  //       setSession(sessionData)
  //     }

  //     // Fetch results
  //     const resultsResponse = await fetch(`/api/results/${sessionId}`)
  //     if (resultsResponse.ok) {
  //       const resultsData = await resultsResponse.json()
  //       setResults(resultsData)
  //     }
  //   } catch (err) {
  //     setError("Failed to load session results")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const updateDecision = async (
    candidateId: string,
    decision: string
  ) => {
    console.log({ candidateId, decision, sessionId: session.id });
    // try {
    //   const response = await fetch("/api/decide", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       session_id: params.id,
    //       candidate_id: candidateId,
    //       decision,
    //     }),
    //   });

    //   if (response.ok) {
    //     // Update local state
    //     setResults(
    //       results.map((result) =>
    //         result.candidate_id === candidateId
    //           ? { ...result, decision }
    //           : result
    //       )
    //     );
    //   }
    // } catch (err) {
    //   console.error("Failed to update decision:", err);
    // }
  };

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "interested":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "not_interested":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "accept":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "reject":
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "bg-green-500/10";
    if (score >= 6) return "bg-yellow-500/10";
    return "bg-red-500/10";
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <ErrorMessage message={error} />
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-start flex-col">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {session?.position} - Results
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Review candidate responses and make decisions
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
                <Clock className="w-4 h-4 text-slate-500" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Scheduled: {new Date(session.scheduled).toLocaleDateString()}
                </span>
              </div>

              <Button variant="ghost" size="sm" asChild className="mr-4 group">
                <Link href={`/interviewer/session/${params.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Back to Session
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {results.length === 0 ? (
          <EmptyState
            title="No responses yet"
            description="Candidates haven't submitted their video responses yet. Share the interview links with them to get started."
            actionLabel="Back to Session"
            actionHref={`/interviewer/session/${params.id}`}
          />
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-blue-500/10 p-3 mr-4">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {results.length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Total Responses
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-green-500/10 p-3 mr-4">
                      <Target className="w-6 h-6 text-green-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {
                          results.filter(
                            (r) =>
                              r.decision === "interested" ||
                              r.decision === "accept"
                          ).length
                        }
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Positive Signals
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-yellow-500/10 p-3 mr-4">
                      <Clock className="w-6 h-6 text-yellow-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {results.filter((r) => r.decision === "pending").length}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Pending Review
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-purple-500/10 p-3 mr-4">
                      <BarChart3 className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {(
                          results.reduce((sum, r) => sum + r.total_score, 0) /
                          results.length
                        ).toFixed(1)}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        Avg Score
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Session Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800 border-blue-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Session Details
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">
                      {session.stack} • {session.level} Level
                    </p>
                  </div>
                  <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700">
                    <Play className="w-4 h-4 mr-2" />
                    View Session Questions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Results List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Candidate Results
              </h2>

              {results.map((result) => (
                <Card
                  key={result.id}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>

                  <CardHeader className="pb-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {result.candidate_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-slate-900 dark:text-white">
                            {result.candidate_name}
                          </CardTitle>
                          <CardDescription className="text-slate-600 dark:text-slate-400">
                            {result.candidate_mail}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        <div
                          className={`rounded-xl px-4 py-2 ${getScoreBgColor(
                            result.total_score
                          )}`}
                        >
                          <div className="flex items-baseline">
                            <div
                              className={`text-2xl font-bold ${getScoreColor(
                                result.total_score
                              )}`}
                            >
                              {result.total_score.toFixed(1)}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400 ml-1">
                              / 10
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-sm font-medium px-3 py-1 ${getDecisionColor(
                            result.decision
                          )}`}
                        >
                          {result.decision.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Individual Question Scores */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {result.responses.map((response, index) => (
                        <div
                          key={response.question_id}
                          className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium text-sm text-slate-900 dark:text-white">
                              Question {index + 1}
                            </div>
                            <div
                              className={`text-sm font-semibold ${getScoreColor(
                                response.score
                              )}`}
                            >
                              {response.score.toFixed(1)}
                            </div>
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">
                            {response.given_answer || "No response provided"}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decision Selector */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center space-x-2 mb-4 sm:mb-0">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                          Final Decision:
                        </span>
                      </div>
                      <Select
                        value={result.decision}
                        onValueChange={(value) =>
                          updateDecision(
                            result.candidate_id,
                            value as CandidateResponse["decision"]
                          )
                        }
                      >
                        <SelectTrigger className="w-full sm:w-48 bg-white dark:bg-slate-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                          <SelectItem value="pending">
                            Pending Review
                          </SelectItem>
                          <SelectItem value="interested">Interested</SelectItem>
                          <SelectItem value="not_interested">
                            Not Interested
                          </SelectItem>
                          <SelectItem value="accept">Accept</SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                        </SelectContent>
                      </Select>
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
