"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Video, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import signupIllustrator from "@/assets/auth/login-illustrator.svg";
import { API_BASE_URL } from "@/lib/constants";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {

        // Example: store token if backend returns it
        localStorage.setItem("token", data.access);
        localStorage.setItem("refresh", data.refresh);

        // Example: redirect after success
        router.push(`${data.role}/dashboard`);
      } else {
        console.error("❌ Login failed:", data);
        setError(data?.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("🚨 Error during login:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }

    // try {
    //   const success = await login(email, password)
    //   if (!success) {
    //     setError("Invalid email or password. Please try again.")
    //   }
    // } catch (err) {
    //   setError("An error occurred. Please try again.")
    // } finally {
    //   setIsLoading(false)
    // }
  };

  return (
    <div className="min-h-screen flex gradient-bg-subtle">
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="mx-auto w-full h-full flex items-center justify-end">
          <Image
            src={signupIllustrator}
            alt="Interview illustration"
            width={1000}
            height={1000}
            className="object-cover w-[80%] h-[80%] animate-fade-in"
            priority
          />
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-20 animate-fade-in">
        <div className="w-full max-w-md space-y-8">
          <Card className="border-sidebar-border shadow-soft glass-effect overflow-hidden">
            <div className="text-center">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 text-2xl font-bold text-foreground"
              >
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Video className="w-6 h-6 text-primary-foreground" />
                </div>
                <span>Shohoj Niyog</span>
              </Link>
            </div>
            <div className="h-1 bg-primary w-full"></div>
            <CardHeader className="text-center space-y-2">
              <CardTitle className="text-2xl font-heading text-foreground">
                Sign In
              </CardTitle>
              <CardDescription className="text-muted-foreground font-body">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-destructive/15 border-destructive/50 animate-slide-in delay-100"
                  >
                    <AlertDescription className="text-destructive-foreground font-body">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 animate-slide-in delay-200">
                  <Label htmlFor="email" className="text-foreground font-body">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 bg-input border-border"
                  />
                </div>

                <div className="space-y-2 animate-slide-in delay-300">
                  <Label
                    htmlFor="password"
                    className="text-foreground font-body"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 bg-input border-border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary-light shadow-primary animate-scale-in delay-400"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center animate-slide-in delay-500">
                <p className="text-sm text-muted-foreground font-body">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
