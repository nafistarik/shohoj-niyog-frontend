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
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import signupIllustrator from "@/assets/auth/login-illustrator.svg";
import logo from "@/assets/auth/logo.png";
import { useMutation } from "@/hooks/use-mutation";
import { loginApi } from "@/lib/api/auth";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { setCookie } from "@/lib/utils";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: login, loading, error } = useMutation(loginApi);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(
      { email, password },
      {
        successMessage: "Login successful",
        onSuccess: (data) => {
          if (!data) return;
          setCookie("access_token", data.access);
          setCookie("refresh_token", data.refresh);
          setCookie("user_role", data.role);
          setCookie("user_name", data.username);
          router.push(`/${data.role}/dashboard`);
        },
      }
    );
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
              <Link href="/" className="inline-flex items-center">
                <Image
                  src={logo}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="object-cover w-auto m-auto h-14 animate-fade-in"
                  priority
                />
              </Link>
              <div className="h-1 bg-primary w-full"></div>
            </div>
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
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <LoadingSpinner />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
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
