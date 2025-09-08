"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  Clock,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { CandidateResponse, InterviewSession } from "@/lib/types";
import CandidateResultCard from "./_components/candidate-result-card";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/PageHeader";

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

  const highestScore = Math.max(...resultsData.map((r) => r.total_score));

  return (
    <div className="min-h-screen bg-white pb-12">
      <PageHeader
        title={`${session.position} - Results`}
        description="Review candidate responses and make decisions"
        backLabel="Back to Session"
        backHref={`/interviewer/session/${params.id}`}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {resultsData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No responses yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <StatCard
                icon={<Users className="w-6 h-6 text-primary" />}
                title={`${resultsData.length}`}
                description="Total Responses"
              />
              <StatCard
                icon={<Target className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "accept").length
                }`}
                description="Accepted"
              />
              <StatCard
                icon={<Target className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "interested").length
                }`}
                description="Interested"
              />
              <StatCard
                icon={<Clock className="w-6 h-6 text-primary" />}
                title={`${
                  resultsData.filter((r) => r.decision === "pending").length
                }`}
                description="Pending Review"
              />
            </div>

            {/* Session Info Card */}
            <Card>
              <CardContent>
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      Session Details
                    </h3>
                    <p className="mt-1 text-muted-foreground">
                      {session.stack} • {session.level} Level
                    </p>
                    {session.scheduled && (
                      <div className="flex items-center text-muted-foreground mt-2">
                        <Calendar className="w-4 h-4 mr-1 text-primary/70" />
                        Scheduled: {formatDate(session.scheduled)}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 md:mt-0 text-sm text-muted-foreground">
                    {session.qa_pairs.length} questions •{" "}
                    {session.allowed_candidates.length} candidates invited
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Grid */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Candidate Results
              </h2>

              <div className="grid grid-cols-1 gap-6">
                {resultsData.map((result) => (
                  <CandidateResultCard
                    key={result.id}
                    result={result}
                    updateDecision={updateDecision}
                    highestScore={highestScore}
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
