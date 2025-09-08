// components/PageHeader.tsx

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title?: string;
  description?: string;
  welcomeText?: string;

  actionLabel?: string;
  actionHref?: string;
  actionIcon?: ReactNode;

  backLabel?: string;
  backHref?: string;
  backIcon?: ReactNode;
  
  children?: ReactNode;
}

export function PageHeader({
  title,
  description,
  welcomeText,
  actionLabel,
  actionHref,
  actionIcon,
  backLabel,
  backHref,
  backIcon,
  children,
}: PageHeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left Side */}
          <div>
            {title && (
              <h1 className="text-3xl font-heading font-bold text-foreground">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-8">
            {welcomeText && (
              <span className="text-sm text-muted-foreground">
                {welcomeText}
              </span>
            )}

            {/* Action Button */}
            {actionLabel && actionHref && (
              <Button asChild>
                <Link href={actionHref}>
                  {actionIcon ?? <Plus className="w-4 h-4 mr-2" />}
                  {actionLabel}
                </Link>
              </Button>
            )}

            {/* Back Button */}
            {backLabel && backHref && (
              <Button variant="ghost" size="sm" asChild className="group">
                <Link href={backHref}>
                  {backIcon ?? (
                    <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  )}
                  {backLabel}
                </Link>
              </Button>
            )}

            {/* Fallback for custom stuff */}
            {children}
          </div>
        </div>
      </div>
    </header>
  );
}
