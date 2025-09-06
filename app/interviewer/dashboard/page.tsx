"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import InterviewerSessionCard from "@/components/shared/interviewer-session-card";
import { Plus, Users, Clock, FileText } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import type { InterviewSession } from "@/lib/types";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EmptyState } from "@/components/shared/empty-state";
import StatCard from "@/components/shared/stat-card";

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
    scheduled: "2025-09-25T06:30:00Z",
  },
];

const user = {
  _id: "ObjectId",
  username: "Beximco Group",
  email: "support@beximco.com",
  phone: "0171111111",
  password: "<hashed>",
  role: "interviewer",
  created: "ISODate",
};

export default function InterviewerDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  // const { user } = useAuth()

  // useEffect(() => {
  //   fetchSessions()
  // }, [])

  // const fetchSessions = async () => {
  //   try {
  //     const response = await fetch("/api/findall")
  //     if (response.ok) {
  //       const data = await response.json()
  //       setSessions(data)
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch sessions:", error)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#E1F1FF] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">
                Interview Sessions
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your interview sessions and review candidates
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.username}
              </span>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href="/interviewer/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Session
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard
              icon={<FileText className="w-6 h-6 text-primary" />}
              title={`${sessions.length}`}
              description="Total Sessions"
            />
            <StatCard
              icon={<Users className="w-6 h-6 text-primary" />}
              title={`${sessions.reduce(
                (acc, session) => acc + session.allowed_candidates.length,
                0
              )}`}
              description="Candidates"
            />
            <StatCard
              icon={<Clock className="w-6 h-6 text-primary" />}
              title={`${
                sessions.filter((s) => new Date(s.scheduled) > new Date())
                  .length
              }`}
              description="Upcoming"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {sessions.length === 0 ? (
          <EmptyState
            title="No interview sessions yet"
            description="Create your first interview session to start evaluating candidates."
            actionLabel="Create Session"
            actionHref="/interviewer/create"
          />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sessions.map((session) => (
              <InterviewerSessionCard key={session.id} session={session} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
