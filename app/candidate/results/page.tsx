"use client";

import { useState, useEffect } from "react";
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
import { PageHeader } from "@/components/shared/PageHeader";
import CandidateResultCard from "./_components/candidate-result-card";

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
    <div className="min-h-screen pb-12">
      <PageHeader
        title="My Results"
        description="Track your interview performance and feedback"
        backHref="/candidate/dashboard"
        backLabel="Back to Dashboard"
      />

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
                title={`${resultsData.filter(
                  (r) =>
                    r.decision === "interested" || r.decision === "accept"
                ).length
                  }`}
                description="Positive Responses"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-primary" />}
                title={`${resultsData.filter((r) => r.decision === "pending").length
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
                <CandidateResultCard result={result} updateDecision={updateDecision} key={result.id} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
