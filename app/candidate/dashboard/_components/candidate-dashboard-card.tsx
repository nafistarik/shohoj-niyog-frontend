import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Play, Zap } from "lucide-react";
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
  const estimatedMinutes = qaPairs?.length * 3;
  const hours = Math.floor(estimatedMinutes / 60);
  const minutes = estimatedMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
};

export default function CandidateDashboardCard({ session }: { session: any }) {
  return (
    <Card
      key={session?.id}
      className="border-border/50 shadow-soft hover:shadow-primary transition-all duration-300 overflow-hidden group animate-fade-in"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-primary to-accent"></div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-2">
            <CardTitle className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
              {session?.position}
            </CardTitle>
            <CardDescription className="mt-1 line-clamp-1 text-muted-foreground">
              {Array.isArray(session?.stack)
                ? session?.stack.join(", ")
                : session?.stack}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {session?.scheduled && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2" />
              {formatDate(session?.scheduled)}
            </div>
          )}
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            {session?.qa_pairs?.length} questions • ~
            {getTotalDuration(session?.qa_pairs)}
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
              Record video responses to {session?.qa_pairs?.length} questions
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
          <Link href={`/candidate/interview/${session?.id}`}>
            <Play className="w-4 h-4 mr-2" />
            Start Interview
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
