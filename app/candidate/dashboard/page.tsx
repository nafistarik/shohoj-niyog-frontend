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
import { Award, BookOpen, Calendar, Clock, Play, Target, User, Zap } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";

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
    scheduled: "2025-08-27T09:15:00Z",
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
    scheduled: "2025-08-30T14:00:00Z",
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

    const getLevelIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return <BookOpen className="w-4 h-4" />;
      case "intermediate":
        return <Target className="w-4 h-4" />;
      case "advanced":
        return <Zap className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
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

  // if (isLoading) {
  //   return (
  //     <div className="min-h-screen bg-slate-50 flex items-center justify-center">
  //       <LoadingSpinner />
  //     </div>
  //   )
  // }

return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pb-12">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                My Interviews
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Participate in video interviews and track your progress
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-full py-1.5 px-4">
                <User className="w-4 h-4 text-slate-500 mr-2" />
                <span className="text-sm text-slate-700 dark:text-slate-300">
                  {user?.username}
                </span>
              </div>
              <Button variant="outline" asChild className="border-slate-300 dark:border-slate-600">
                <Link href="/candidate/results">View Results</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-lg bg-blue-500/10 p-3 mr-4">
                  <Award className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Interviews</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-lg bg-green-500/10 p-3 mr-4">
                  <Clock className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.reduce((total, session) => total + session.qa_pairs.length, 0)}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Total Questions</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="rounded-lg bg-purple-500/10 p-3 mr-4">
                  <Target className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {sessions.filter(s => s.level.toLowerCase() === 'advanced').length}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Advanced Levels</div>
                </div>
              </div>
            </CardContent>
          </Card>
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
                className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 pr-2">
                      <CardTitle className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {session.position}
                      </CardTitle>
                      <CardDescription className="mt-1 line-clamp-1">
                        {Array.isArray(session.stack)
                          ? session.stack.join(", ")
                          : session.stack}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={getLevelColor(session.level)}>
                      <span className="flex items-center">
                        {getLevelIcon(session.level)}
                        <span className="ml-1">{session.level}</span>
                      </span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {session.scheduled && (
                      <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(session.scheduled)}
                      </div>
                    )}
                    <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                      <Clock className="w-4 h-4 mr-2" />
                      {session.qa_pairs.length} questions • ~{getTotalDuration(session.qa_pairs)}
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="font-medium text-sm text-slate-900 dark:text-white mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                      What to expect:
                    </h4>
                    <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                      <li className="flex">
                        <span className="text-blue-500 mr-1">•</span>
                        Record video responses to {session.qa_pairs.length} questions
                      </li>
                      <li className="flex">
                        <span className="text-blue-500 mr-1">•</span>
                        Take your time - no time limit per question
                      </li>
                      <li className="flex">
                        <span className="text-blue-500 mr-1">•</span>
                        Review and re-record if needed
                      </li>
                    </ul>
                  </div>

                  <Button className="w-full bg-primary transition-all duration-300" asChild>
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
