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
  Calendar,
  CheckCircle,
  Clock,
  FileText,
  Star,
  TrendingUp,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { CandidateResponse, InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";

interface CandidateResultWithSession extends CandidateResponse {
  session?: InterviewSession;
}

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
  const [resultsData, setResultsData] = useState(results);
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

  const getDecisionIcon = (decision: string) => {
    switch (decision) {
      case "interested":
      case "accept":
        return <CheckCircle className="w-4 h-4" />;
      case "not_interested":
      case "reject":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
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

  const getStatusMessage = (decision: string) => {
    switch (decision) {
      case "pending":
        return "Your interview is currently under review. You'll be notified once a decision is made.";
      case "interested":
      case "accept":
        return "Great news! The interviewer is interested in moving forward with your application.";
      case "not_interested":
      case "reject":
        return "Thank you for your time. While this opportunity didn't work out, keep applying and improving!";
      default:
        return "Your interview results are being processed.";
    }
  };

  const getStatusBgColor = (decision: string) => {
    switch (decision) {
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/30";
      case "interested":
      case "accept":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/30";
      case "not_interested":
      case "reject":
        return "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700";
      default:
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/30";
    }
  };

  const getStatusTextColor = (decision: string) => {
    switch (decision) {
      case "pending":
        return "text-yellow-800 dark:text-yellow-300";
      case "interested":
      case "accept":
        return "text-green-800 dark:text-green-300";
      case "not_interested":
      case "reject":
        return "text-slate-700 dark:text-slate-300";
      default:
        return "text-blue-800 dark:text-blue-300";
    }
  };

  const updateDecision = async (resultId: string, newDecision: string) => {
    console.log(`Updating decision for result ${resultId} to ${newDecision}`);

    // Update local state
    setResultsData((prev) =>
      prev.map((result) =>
        result.id === resultId ? { ...result, decision: newDecision } : result
      )
    );

    // In a real app, you would make an API call here
    // try {
    //   const response = await fetch("/api/candidate/update-decision", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       result_id: resultId,
    //       decision: newDecision,
    //     }),
    //   });
    //
    //   if (!response.ok) {
    //     throw new Error("Failed to update decision");
    //   }
    // } catch (err) {
    //   console.error("Failed to update decision:", err);
    //   // Revert the change if the API call fails
    //   setResultsData(prev =>
    //     prev.map(result =>
    //       result.id === resultId
    //         ? { ...result, decision: originalDecision }
    //         : result
    //     )
    //   );
    // }
  };

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6">
            <div className="flex items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                  My Results
                </h1>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Track your interview performance and feedback
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" asChild className="group">
              <Link href="/candidate/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsData.length === 0 ? (
          <EmptyState
            title="No interview results yet"
            description="Complete some interviews to see your results and feedback here."
            actionLabel="Find Interviews"
            actionHref="/candidate/dashboard"
          />
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <StatCard
                icon={<FileText className="w-6 h-6 text-primary" />}
                title={`${resultsData.length}`}
                description="Interviews Completed"
              />
              <StatCard
                icon={<CheckCircle className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter(
                    (r) =>
                      r.decision === "interested" || r.decision === "accept"
                  ).length
                }`}
                description="Positive Responses"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "pending").length
                }`}
                description="Pending Review"
              />
            </div>

            {/* Results List */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Interview Results
              </h2>

              {resultsData.map((result) => (
                <Card
                  key={result.id}
                  className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {result.session?.position || "Interview Session"}
                        </CardTitle>
                        <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="bg-slate-100 dark:bg-slate-800 rounded-md px-2 py-1 text-xs">
                            {result.session?.stack
                              ? Array.isArray(result.session.stack)
                                ? result.session.stack.join(", ")
                                : result.session.stack
                              : "Technology Stack"}
                          </span>
                          {result.session?.scheduled && (
                            <div className="flex items-center text-slate-600 dark:text-slate-400">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(result.session.scheduled)}
                            </div>
                          )}
                        </CardDescription>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <Badge
                          variant="outline"
                          className={`text-sm font-medium px-3 py-1 flex items-center ${getDecisionColor(
                            result.decision
                          )}`}
                        >
                          {getDecisionIcon(result.decision)}
                          <span className="ml-1">
                            {getDecisionText(result.decision)}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div
                      className={`rounded-xl p-4 border ${getStatusBgColor(
                        result.decision
                      )} ${getStatusTextColor(result.decision)}`}
                    >
                      <p className="text-sm">
                        {getStatusMessage(result.decision)}
                      </p>
                    </div>

                    {/* Decision Selector */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Update your decision:
                      </div>
                      <Select
                        value={result.decision}
                        onValueChange={(value) =>
                          updateDecision(result.id, value)
                        }
                      >
                        <SelectTrigger className="w-40 border border-slate-300">
                          <SelectValue placeholder="Select decision" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Under Review</SelectItem>
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
