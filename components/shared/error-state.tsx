import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

type ErrorStateProps = {
  onRetry?: () => void;
  message?: string;
};

export default function ErrorState({
  onRetry,
  message = "Something went wrong",
}: ErrorStateProps) {
  return (
    <div className="bg-background flex items-center justify-center animate-fade-in py-8">
      <div className="max-w-xl w-full text-center">
        <div className="rounded-xl border border-border bg-card shadow-sm p-8">
          <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-16 w-16 text-destructive animate-pulse" />
          </div>

          <h2 className="text-2xl font-semibold text-foreground mb-2">
            {message}
          </h2>
          <p className="text-muted-foreground mb-6">
            We couldn’t load the data. Please try again.
          </p>

          {onRetry && (
            <Button onClick={onRetry}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
