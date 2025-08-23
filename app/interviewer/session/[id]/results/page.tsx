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
import { ArrowLeft, Play, Star, User } from "lucide-react";
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
  qa_pairs: [{ question_id: "...", question: "...", answer: "..." },{ question_id: "...", question: "...", answer: "..." },{ question_id: "...", question: "...", answer: "..." },],
  allowed_candidates: ["uuid", "can2@gmail.com"],
  scheduled: "2025-08-25T06:30:00Z",
};

const results = [
  {
    id: "68a3ca3a48ab2dff2b722a11",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "user1",
    candidate_mail: "user1@gmail.com",
    responses: [
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
    ],
    total_score: 6.16,
    decision: "pending",
  },
  {
    id: "68a3ca3a48ab2dff2b722a11",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "user1",
    candidate_mail: "user1@gmail.com",
    responses: [
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
    ],
    total_score: 6.16,
    decision: "pending",
  },
  {
    id: "68a3ca3a48ab2dff2b722a11",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid",
    candidate_name: "user1",
    candidate_mail: "user1@gmail.com",
    responses: [
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
      { question_id: "q2fa82f31", given_answer: "...", score: 3.22 },
    ],
    total_score: 3.16,
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
    decision: CandidateResponse["decision"]
  ) => {
    console.log({candidateId, decision, sessionId: session.id});
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

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <div className="flex items-center">
              <Button variant="ghost" size="sm" asChild className="mr-4">
                <Link href={`/interviewer/session/${params.id}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Session
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">
                  {session?.position} - Results
                </h1>
                <p className="text-slate-600 mt-1">
                  Review candidate responses and make decisions
                </p>
              </div>
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
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {results.length}
                  </div>
                  <div className="text-sm text-slate-600">Total Responses</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {results.filter((r) => r.decision === "interested").length}
                  </div>
                  <div className="text-sm text-slate-600">Interested</div>
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
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-slate-900">
                    {(
                      results.reduce((sum, r) => sum + r.total_score, 0) /
                      results.length
                    ).toFixed(1)}
                  </div>
                  <div className="text-sm text-slate-600">Avg Score</div>
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
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-heading">
                            {result.candidate_name}
                          </CardTitle>
                          <CardDescription>
                            {result.candidate_mail}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex text-right">
                          <div
                            className={`text-2xl font-bold ${getScoreColor(
                              result.total_score
                            )}`}
                          >
                            {result.total_score.toFixed(1)}
                          </div>
                          <div className="text-sm text-slate-500">/ 10.0</div>
                        </div>
                        <Badge className={getDecisionColor(result.decision)}>
                          {result.decision.replace("_", " ")}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Individual Question Scores */}
                    <div className="grid gap-3">
                      {result.responses.map((response, index) => (
                        <div
                          key={response.question_id}
                          className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="font-medium text-sm text-slate-900">
                              Question {index + 1}
                            </div>
                            <div className="text-xs text-slate-600 mt-1 line-clamp-2">
                              {response.given_answer || "No response provided"}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <div
                              className={`font-bold ${getScoreColor(
                                response.score
                              )}`}
                            >
                              {response.score.toFixed(1)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decision Selector */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-medium">Decision:</span>
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
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
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
