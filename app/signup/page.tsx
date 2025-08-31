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

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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

    // Validation
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

    console.log({
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    });

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
  };

  return (
    <div className="min-h-screen flex gradient-bg overflow-hidden">
      {/* Left side with login form */}
      <div className="w-full lg:w-1/2 flex items-center p-4 sm:p-8 relative z-20 overflow-y-auto">
        <div className="w-full max-w-md space-y-8 mx-auto">
          <Card className="border-border shadow-soft overflow-hidden">
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
              <CardTitle className="text-2xl font-heading">Sign Up</CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose your role and create your account
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[50vh] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-destructive/15 border-destructive/50 animate-fade-in"
                  >
                    <AlertDescription className="text-destructive-foreground">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {success && (
                  <Alert className="border-green-200 bg-green-50 text-green-800 animate-fade-in">
                    <AlertDescription>{success}</AlertDescription>
                  </Alert>
                )}

                {/* Role Selection */}
                <div
                  className="space-y-3 animate-fade-in"
                  style={{ animationDelay: "0.1s" }}
                >
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
                        className="flex items-center justify-start rounded-md border-2 border-border bg-background p-4 hover:bg-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-colors"
                      >
                        <Users className="hidden sm:flex h-6 w-6" />
                        <div className="text-center">
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
                        className="flex items-center justify-start rounded-md border-2 border-border bg-background p-4 hover:bg-primary hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/10 cursor-pointer transition-colors"
                      >
                        <UserCheck className="hidden sm:flex h-6 w-6" />
                        <div className="text-center">
                          <div className="font-medium">Interviewer</div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Label htmlFor="username" className="text-foreground">
                    {formData.role === "interviewer"
                      ? "Company Name"
                      : "Full Name"}
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder={
                      formData.role === "interviewer"
                        ? "Enter company name"
                        : "Enter your full name"
                    }
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    required
                    className="h-11"
                  />
                </div>

                <div
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Label htmlFor="email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Label htmlFor="phone" className="text-foreground">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Label htmlFor="password" className="text-foreground">
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
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div
                  className="space-y-2 animate-fade-in"
                  style={{ animationDelay: "0.6s" }}
                >
                  <Label htmlFor="confirmPassword" className="text-foreground">
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
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                  className="w-full h-11 text-base hover-lift animate-fade-in"
                  disabled={isLoading}
                  style={{ animationDelay: "0.7s" }}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              <div
                className="mt-6 text-center animate-fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:text-primary/90 font-medium transition-colors"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right side with image and branding (flipped) */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="mx-auto w-full h-full flex items-center justify-start">
          <Image
            src={loginIllustrator}
            alt="Interview illustration"
            width={1000}
            height={1000}
            className="object-cover w-[80%] h-[80%] scale-x-[-1]"
            priority
          />
        </div>
        {/* <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white items-end">
          <Link
            href="/"
            className="inline-flex justify-end items-center space-x-2 text-xl font-bold hover-lift"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>

        </div> */}
      </div>
    </div>
  );
}
