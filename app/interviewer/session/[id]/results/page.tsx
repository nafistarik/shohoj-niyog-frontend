"use client";

import { useState } from "react";
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
  Calendar,
  Star,
  Users,
  Target,
  Clock,
  BarChart3,
  ChevronDown,
  ChevronUp,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { CandidateResponse, InterviewSession } from "@/lib/types";

// Dummy data
const session = {
  id: "68935b9fc5f8140275f8b24a",
  position: "Backend Developer",
  stack: "Node, Django, MongoDB",
  level: "Intermediate",
  created_by: "recruiter_id",
  qa_pairs: [
    {
      question_id: "q1",
      question: "What is your experience with Node.js?",
      answer: "...",
    },
    {
      question_id: "q2",
      question: "How do you handle database optimization?",
      answer: "...",
    },
    {
      question_id: "q3",
      question: "Describe your approach to debugging?",
      answer: "...",
    },
  ],
  allowed_candidates: ["uuid", "can2@gmail.com"],
  scheduled: "2025-08-25T06:30:00Z",
};

const results = [
  {
    id: "68a3ca3a48ab2dff2b722a11",
    session_id: "689b58bc6606fbf9088d8105",
    candidate_id: "uuid1",
    candidate_name: "Sarah Johnson",
    candidate_mail: "sarah.johnson@example.com",
    responses: [
      {
        question_id: "q1",
        given_answer: "I have 5 years of experience with Node.js...",
        score: 8.5,
      },
      {
        question_id: "q2",
        given_answer: "I would implement caching and database optimization...",
        score: 7.8,
      },
      {
        question_id: "q3",
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
    candidate_id: "uuid2",
    candidate_name: "Michael Chen",
    candidate_mail: "michael.chen@example.com",
    responses: [
      {
        question_id: "q1",
        given_answer: "I've worked with both SQL and NoSQL databases...",
        score: 9.1,
      },
      {
        question_id: "q2",
        given_answer: "I prefer using Docker for containerization...",
        score: 8.7,
      },
      {
        question_id: "q3",
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
    candidate_id: "uuid3",
    candidate_name: "Emma Rodriguez",
    candidate_mail: "emma.rodriguez@example.com",
    responses: [
      {
        question_id: "q1",
        given_answer:
          "I'm familiar with REST APIs but still learning GraphQL...",
        score: 6.2,
      },
      {
        question_id: "q2",
        given_answer: "I would try to optimize the algorithm first...",
        score: 5.8,
      },
      {
        question_id: "q3",
        given_answer:
          "I think the best approach would be to add more logging...",
        score: 7.1,
      },
    ],
    total_score: 6.4,
    decision: "reject",
  },
];

// Candidate Result Card Component
function CandidateResultCard({
  result,
  updateDecision,
}: {
  result: any;
  updateDecision: (candidateId: string, decision: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDecisionColor = (decision: string) => {
    switch (decision) {
      case "interested":
        return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "not_interested":
        return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      case "accept":
        return "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800";
      case "reject":
        return "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
    }
  };

  const getDecisionText = (decision: string) => {
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
    if (score >= 8) return "text-green-600 dark:text-green-400";
    if (score >= 6) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-white">
              {result.candidate_name}
            </CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Mail className="w-3 h-3 mr-1" />
              {result.candidate_mail}
            </CardDescription>
          </div>
          <div className="gap-4 flex flex-col">
            <div className="flex items-center justify-start sm:justify-end gap-4">
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
              <Badge className={getDecisionColor(result.decision)}>
                {getDecisionText(result.decision)}
              </Badge>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-2" />
                    Hide Details
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Show Details
                  </>
                )}
              </Button>

              <Select
                value={result.decision}
                onValueChange={(value) =>
                  updateDecision(result.candidate_id, value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Update decision" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="not_interested">Not Interested</SelectItem>
                  <SelectItem value="accept">Accept</SelectItem>
                  <SelectItem value="reject">Reject</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <div className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
          <h4 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Question Responses
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.responses.map((response: any, index: number) => (
              <div
                key={response.question_id}
                className="bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 "
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="font-medium text-slate-900 dark:text-white">
                    Question {index + 1}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span
                      className={`font-semibold ${getScoreColor(
                        response.score
                      )}`}
                    >
                      {response.score.toFixed(1)}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 rounded-md p-3">
                  {response.given_answer || "No response provided"}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function SessionResultsPage() {
  const [resultsData, setResultsData] = useState(results);
  const params = useParams();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const updateDecision = async (candidateId: string, decision: string) => {
    console.log({ candidateId, decision, sessionId: session.id });

    // Update local state
    setResultsData((prev) =>
      prev.map((result) =>
        result.candidate_id === candidateId
          ? { ...result, decision: decision as any }
          : result
      )
    );

    // In a real app, you would make an API call here
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
    //
    //   if (!response.ok) {
    //     throw new Error("Failed to update decision");
    //   }
    // } catch (err) {
    //   console.error("Failed to update decision:", err);
    // }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col-reverse md:flex-row items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                {session.position} - Results
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Review candidate responses and make decisions
              </p>
            </div>
            <Button variant="ghost" size="sm" asChild className="group">
              <Link href={`/interviewer/session/${params.id}`}>
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Session
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400">
              No responses yet
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="rounded-lg bg-blue-500/10 p-3 mr-4">
                      <Users className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-white">
                        {resultsData.length}
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
                          resultsData.filter(
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
                        {
                          resultsData.filter((r) => r.decision === "pending")
                            .length
                        }
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
                          resultsData.reduce(
                            (sum, r) => sum + r.total_score,
                            0
                          ) / resultsData.length
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
                    {session.scheduled && (
                      <div className="flex items-center text-slate-600 dark:text-slate-400 mt-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        Scheduled: {formatDate(session.scheduled)}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 text-sm text-slate-600 dark:text-slate-400">
                    {session.qa_pairs.length} questions •{" "}
                    {session.allowed_candidates.length} candidates invited
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Candidate Results
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {resultsData.map((result) => (
                  <CandidateResultCard
                    key={result.id}
                    result={result}
                    updateDecision={updateDecision}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
