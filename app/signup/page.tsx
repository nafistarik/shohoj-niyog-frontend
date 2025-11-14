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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Video, Eye, EyeOff, Users, UserCheck, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import loginIllustrator from "@/assets/auth/login-illustrator.svg";
import { API_BASE_URL } from "@/lib/constants";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    company: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "candidate" as "candidate" | "interviewer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/accounts/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role: formData.role,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Signup successful!");
        router.push("/login");
      } else {
        console.error("❌ Signup failed:", data);
        setError(data?.error || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("🚨 Error during signup:", error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // try {
  //   const response = await fetch("/api/auth/signup", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       username: formData.username,
  //       email: formData.email,
  //       phone: formData.phone,
  //       password: formData.password,
  //       role: formData.role,
  //     }),
  //   })

  //   const data = await response.json()

  //   if (response.ok) {
  //     setSuccess("Account created successfully! Redirecting to login...")
  //     setTimeout(() => {
  //       router.push("/login")
  //     }, 2000)
  //   } else {
  //     setError(data.error || "Failed to create account")
  //   }
  // } catch (err) {
  //   setError("An error occurred. Please try again.")
  // } finally {
  //   setIsLoading(false)
  // }

  return (
    <div className="min-h-screen flex gradient-bg-subtle-reverse">
      <div className="w-full lg:w-1/2 flex items-center p-4 sm:p-8 relative z-20 overflow-y-auto animate-fade-in">
        <div className="w-full max-w-md space-y-8 mx-auto">
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
                Sign Up
              </CardTitle>
              <CardDescription className="text-muted-foreground font-body">
                Choose your role and create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[50vh] overflow-y-auto">
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

                {success && (
                  <Alert className="border-chart-1/50 bg-chart-1/15 text-chart-1 animate-slide-in delay-100">
                    <AlertDescription className="font-body">
                      {success}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-3 animate-slide-in delay-200">
                  <RadioGroup
                    value={formData.role}
                    onValueChange={(value) => handleInputChange("role", value)}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="candidate"
                        id="candidate"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="candidate"
                        className="flex items-center justify-start rounded-md border-2 border-border bg-background p-4 hover:bg-secondary/50 hover:text-primary-dark peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-colors"
                      >
                        <Users className="hidden sm:flex h-6 w-6 text-primary mr-2" />
                        <div className="text-center font-body">
                          <div className="font-medium">Candidate</div>
                        </div>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="interviewer"
                        id="interviewer"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="interviewer"
                        className="flex items-center justify-start rounded-md border-2 border-border bg-background p-4 hover:bg-secondary/50 hover:text-primary-dark peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-colors"
                      >
                        <UserCheck className="hidden sm:flex h-6 w-6 text-primary mr-2" />
                        <div className="text-center font-body">
                          <div className="font-medium">Interviewer</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2 animate-slide-in delay-300">
                  <Label
                    htmlFor="username"
                    className="text-foreground font-body"
                  >
                    Full Name
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    required
                    className="h-11 bg-input border-border"
                  />
                </div>

                {formData.role === "interviewer" && (
                  <div className="space-y-2 animate-slide-in delay-300">
                    <Label
                      htmlFor="company"
                      className="text-foreground font-body"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      required
                      className="h-11 bg-input border-border"
                    />
                  </div>
                )}

                <div className="space-y-2 animate-slide-in delay-400">
                  <Label htmlFor="email" className="text-foreground font-body">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11 bg-input border-border"
                  />
                </div>

                <div className="space-y-2 animate-slide-in delay-500">
                  <Label htmlFor="phone" className="text-foreground font-body">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-11 bg-input border-border"
                  />
                </div>

                <div className="space-y-2 animate-slide-in delay-600">
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
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
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

                <div className="space-y-2 animate-slide-in delay-700">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-foreground font-body"
                  >
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      required
                      className="h-11 bg-input border-border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 text-base bg-primary text-primary-foreground hover:bg-primary-light shadow-primary animate-scale-in delay-800"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div className="mt-6 text-center animate-slide-in delay-900">
                <p className="text-sm text-muted-foreground font-body">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="mx-auto w-full h-full flex items-center justify-start">
          <Image
            src={loginIllustrator}
            alt="Interview illustration"
            width={1000}
            height={1000}
            className="object-cover w-[80%] h-[80%] scale-x-[-1] animate-fade-in"
            priority
          />
        </div>
      </div>
    </div>
  );
}
