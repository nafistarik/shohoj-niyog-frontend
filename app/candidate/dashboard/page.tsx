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
  Award,
  Calendar,
  Clock,
  Play,
  Target,
  User,
  Zap,
  CalendarDays,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";
import { PageHeader } from "@/components/shared/PageHeader";

const sessions = [
  {
    id: "68935b9fc5f8140275f8b24a",
    position: "Backend Developer",
    stack: "Node.js, Express, MongoDB",
    level: "Intermediate",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe898",
        question: "What is the difference between a hash table and a hash map?",
        answer: "...",
      },
      {
        question_id: "q5b6fe899",
        question: "Explain the concept of middleware in Express.js",
        answer: "...",
      },
      {
        question_id: "q5b6fe900",
        question: "How would you optimize database queries in MongoDB?",
        answer: "...",
      },
    ],
    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-08-25T06:30:00Z",
  },
  {
    id: "68935b9fc5f8140275f8b24b",
    position: "Frontend Developer",
    stack: "React, TypeScript, Next.js",
    level: "Advanced",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe901",
        question: "Explain the Virtual DOM concept in React",
        answer: "...",
      },
      {
        question_id: "q5b6fe902",
        question: "What are React hooks and when would you use them?",
        answer: "...",
      },
    ],
    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-09-27T09:15:00Z",
  },
  {
    id: "68935b9fc5f8140275f8b24c",
    position: "Full Stack Engineer",
    stack: "React, Node.js, PostgreSQL",
    level: "Beginner",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe903",
        question: "What is the difference between SQL and NoSQL databases?",
        answer: "...",
      },
      {
        question_id: "q5b6fe904",
        question: "Explain REST API principles",
        answer: "...",
      },
      {
        question_id: "q5b6fe905",
        question: "What is JWT and how does it work?",
        answer: "...",
      },
    ],
    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-09-30T14:00:00Z",
  },
];

const user = {
  _id: "ObjectId",
  username: "Beximco Group",
  email: "support@beximco.com",
  phone: "0171111111",
  password: "<hashed>",
  role: "candidate",
  created: "ISODate",
};

export default function CandidateDashboard() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
    }
  };

  const getTotalDuration = (qaPairs: any[]) => {
    const estimatedMinutes = qaPairs.length * 3;
    const hours = Math.floor(estimatedMinutes / 60);
    const minutes = estimatedMinutes % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Calculate upcoming interviews (scheduled in the future)
  const now = new Date();
  const upcomingInterviews = sessions.filter(
    (session) => new Date(session.scheduled) > now
  );

  // Find the next interview (closest upcoming)
  const nextInterview =
    upcomingInterviews.length > 0
      ? upcomingInterviews.reduce((closest, current) => {
          const closestTime = new Date(closest.scheduled).getTime();
          const currentTime = new Date(current.scheduled).getTime();
          const nowTime = now.getTime();

          return currentTime - nowTime < closestTime - nowTime
            ? current
            : closest;
        })
      : null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <PageHeader
        title="My Interviews"
        description="Participate in video interviews and track your progress"
      >
        <Button variant="outline" asChild>
          <Link href="/candidate/results">
            <Eye />
            View Results
          </Link>
        </Button>
      </PageHeader>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCard
            icon={<Award className="w-6 h-6 text-primary" />}
            title={`${sessions.length}`}
            description="Total Interviews"
          />
          <StatCard
            icon={<Clock className="w-6 h-6 text-primary" />}
            title={`${upcomingInterviews.length}`}
            description="Upcoming Interviews"
          />
          <StatCard
            icon={<CalendarDays className="w-6 h-6 text-primary" />}
            title={`${nextInterview ? nextInterview.created_by : "🚫"}`}
            description={`${
              nextInterview
                ? formatDate(nextInterview.scheduled)
                : "No upcoming interviews"
            }`}
          />
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {sessions.length === 0 ? (
          <EmptyState
            title="No interviews available"
            description="You haven't been invited to any interviews yet. Check back later or contact the interviewer."
            actionLabel="Refresh"
            actionHref="/candidate/dashboard"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className="border-border/50 shadow-soft hover:shadow-primary transition-all duration-300 overflow-hidden group animate-fade-in"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent"></div>

                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <CardTitle className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                        {session.position}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-1 text-muted-foreground">
                        {Array.isArray(session.stack)
                          ? session.stack.join(", ")
                          : session.stack}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {session.scheduled && (
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(session.scheduled)}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      {session.qa_pairs.length} questions • ~
                      {getTotalDuration(session.qa_pairs)}
                    </div>
                  </div>

                  <div className="bg-secondary/30 p-3 rounded-lg border border-border">
                    <h4 className="font-medium text-sm text-foreground mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                      What to expect:
                    </h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li className="flex">
                        <span className="text-primary mr-1">•</span>
                        Record video responses to {session.qa_pairs.length}{" "}
                        questions
                      </li>
                      <li className="flex">
                        <span className="text-primary mr-1">•</span>
                        Take your time - no time limit per question
                      </li>
                      <li className="flex">
                        <span className="text-primary mr-1">•</span>
                        Review and re-record if needed
                      </li>
                    </ul>
                  </div>
                  <Button asChild className="w-full gradient-bg">
                    <Link href={`/candidate/interview/${session.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Start Interview
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
