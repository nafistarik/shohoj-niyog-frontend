import { Button } from "@/components/ui/button";
import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
  icon?: React.ReactNode;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
}

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  secondaryActionLabel,
  secondaryActionHref
}: EmptyStateProps) {
  const defaultIcon = (
    <div className="relative">
      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center">
        <svg 
          className="w-8 h-8 text-blue-500 dark:text-blue-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
      </div>
      <div className="absolute -top-1 -right-1">
        <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/40 rounded-full flex items-center justify-center">
          <svg 
            className="w-3 h-3 text-amber-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="mb-6">
        {icon || defaultIcon}
      </div>
      
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
        {description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button 
          asChild
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <Link href={actionHref}>
            {actionLabel}
          </Link>
        </Button>
        
        {secondaryActionLabel && secondaryActionHref && (
          <Button 
            variant="outline" 
            asChild
            className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          >
            <Link href={secondaryActionHref}>
              {secondaryActionLabel}
            </Link>
          </Button>
        )}
      </div>
      
      <div className="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700 w-full max-w-xs">
        <p className="text-sm text-slate-500 dark:text-slate-500">
          Need help?{" "}
          <a 
            href="#" 
            className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            Contact support
          </a>
        </p>
      </div>
    </div>
  );
}