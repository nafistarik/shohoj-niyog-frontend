"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, LogOut } from "lucide-react";
import Image from "next/image";
import logo from "@/assets/auth/logo_icon.png";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    document.cookie = "user_role=; Max-Age=0; path=/;";
    router.push("/login");
  };
  return (
    <header className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Left Side */}
          <div className="flex gap-2">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={logo}
                alt="logo"
                width={1000}
                height={1000}
                className="object-cover w-auto m-auto h-16 animate-fade-in"
                priority
              />
            </Link>
            <div>
              {title && (
                <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
                  {title}
                </h1>
              )}
              {description && (
                <p className="hidden md:flex text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-row md:flex-col items-center space-x-4">
            {welcomeText && (
              <span className="text-sm text-muted-foreground hidden md:flex">
                {welcomeText}
              </span>
            )}

            {/* Action Button */}
            {actionLabel && actionHref && (
              <Button asChild>
                <Link href={actionHref}>
                  {actionIcon ?? <Plus className="w-4 h-4 mr-2" />}
                  <span className="hidden md:flex">{actionLabel}</span>
                </Link>
              </Button>
            )}

            {/* Fallback for custom stuff */}
            {children}

            {/* Back Button */}
            {backLabel && backHref && (
              <Button variant="secondary" size="sm" asChild className="group">
                <Link href={backHref}>
                  {backIcon ?? (
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                  )}
                  <span className="hidden md:flex">{backLabel}</span>
                </Link>
              </Button>
            )}

            <Button variant="outline" onClick={handleLogout}>
              <LogOut /> <span className="hidden md:flex">Logout</span>{" "}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
