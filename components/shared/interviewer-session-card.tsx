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
import { Plus, Calendar, Users, Eye, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
      return "bg-muted text-muted-foreground border-border";
  }
};

const getLevelVariant = (level: string) => {
  switch (level.toLowerCase()) {
    case "beginner":
      return "success";
    case "intermediate":
      return "warning";
    case "advanced":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function InterviewerSessionCard({ session }: { session: any }) {
  return (
    <Card
      key={session.id}
      className="hover:shadow-soft transition-all duration-300 border-border/50 hover:border-primary/30"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-heading text-foreground line-clamp-1">
              {session.position}
            </CardTitle>
            <CardDescription className="mt-1 text-muted-foreground">
              {Array.isArray(session.stack)
                ? session.stack.join(", ")
                : session.stack}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/interviewer/session/${session.id}`}>
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/interviewer/session/${session.id}/edit`}>
                  <Eye className="w-4 h-4" />
                  Edit Session
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge
            variant={getLevelVariant(session.level) as any}
            className="capitalize"
          >
            {session.level}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {session.qa_pairs.length} question
            {session.qa_pairs.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {session.scheduled
              ? formatDate(session.scheduled)
              : "Not scheduled"}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            {session.allowed_candidates.length} candidate
            {session.allowed_candidates.length !== 1 ? "s" : ""} invited
          </div>
        </div>

        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 border-border text-foreground hover:bg-accent"
            asChild
          >
            <Link href={`/interviewer/session/${session.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href={`/interviewer/session/${session.id}/results`}>
              Results
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
