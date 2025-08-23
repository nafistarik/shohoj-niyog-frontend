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
import { Calendar, Clock, Play } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

// const sessions = [
//   {
//     session_id: "68979cdc847300769be03518",
//     position: "Full Stack Developer",
//     scheduled: "2025-08-19T06:30:00Z",
//   },
// ];

const sessions = [
  {
    id: "68935b9fc5f8140275f8b24a",
    position: "Backend Developer",
    stack: "Node, Django, MongoDB",
    level: "Intermediate",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe898",
        question: "What is the difference between a hash table and a hash map?",
        answer: "...",
      },
    ],

    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-08-25T06:30:00Z",
  },
  {
    id: "68935b9fc5f8140275f8b24a",
    position: "Backend Developer",
    stack: "Node, Django, MongoDB",
    level: "Intermediate",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe898",
        question: "What is the difference between a hash table and a hash map?",
        answer: "...",
      },
    ],
    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-08-25T06:30:00Z",
  },
  {
    id: "68935b9fc5f8140275f8b24a",
    position: "Backend Developer",
    stack: "Node, Django, MongoDB",
    level: "Intermediate",
    created_by: "recruiter_id",
    qa_pairs: [
      {
        question_id: "q5b6fe898",
        question: "What is the difference between a hash table and a hash map?",
        answer: "...",
      },
    ],
    allowed_candidates: ["uuid", "can2@gmail.com"],
    scheduled: "2025-08-25T06:30:00Z",
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
  // const [sessions, setSessions] = useState<InterviewSession[]>([])
  // const [isLoading, setIsLoading] = useState(true)
  // const { user } = useAuth()

  // useEffect(() => {
  //   fetchAvailableSessions()
  // }, [user])

  // const fetchAvailableSessions = async () => {
  //   try {
  //     if (user?.user_id) {
  //       // In a real app, this would filter by candidate email
  //       const response = await fetch(`/api/candidate/sessions?email=${encodeURIComponent(user.username)}`)
  //       if (response.ok) {
  //         const data = await response.json()
  //         setSessions(data)
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch sessions:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">
                My Interviews
              </h1>
              <p className="text-slate-600 mt-1">
                Participate in video interviews and track your progress
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">
                Welcome, {user?.username}
              </span>
              <Button variant="outline" asChild>
                <Link href="/candidate/results">View Results</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg font-heading line-clamp-1">
                        {session.position}
                      </CardTitle>
                      <CardDescription className="mt-1">
                        {Array.isArray(session.stack)
                          ? session.stack.join(", ")
                          : session.stack}
                      </CardDescription>
                    </div>
                    <Badge className={getLevelColor(session.level)}>
                      {session.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {session.scheduled && (
                      <div className="flex items-center text-sm text-slate-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(session.scheduled)}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {session.qa_pairs.length} questions • ~
                      {session.qa_pairs.length * 3} minutes
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-lg">
                    <h4 className="font-medium text-sm text-slate-900 mb-2">
                      What to expect:
                    </h4>
                    <ul className="text-xs text-slate-600 space-y-1">
                      <li>
                        • Record video responses to {session.qa_pairs.length}{" "}
                        questions
                      </li>
                      <li>• Take your time - no time limit per question</li>
                      <li>• Review and re-record if needed</li>
                    </ul>
                  </div>

                  <Button className="w-full" asChild>
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
