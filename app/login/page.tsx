"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Video, Eye, EyeOff, ArrowLeft, Sparkles } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import Image from "next/image"
import loginIllustrator from "@/assets/auth/login-illustrator.svg"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    console.log({email, password})

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
  }

  return (
    <div className="min-h-screen flex gradient-bg">
      {/* Overlay only on the left side */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-black/20 z-10"></div>
        <Image
          src={loginIllustrator}
          alt="Interview illustration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-12 text-white">
          <Link href="/" className="inline-flex items-center space-x-2 text-xl font-bold hover-lift">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to home</span>
          </Link>
          
          <div className="max-w-md">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center glass-effect">
                <Video className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-bold">Shohoj Niyog</h1>
            </div>
            <h2 className="text-4xl font-bold mb-4">Welcome back to your account</h2>
          </div>
        </div>
      </div>

      {/* Right side with login form - no overlay here */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 relative z-20">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2 text-2xl font-bold text-foreground">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-primary-foreground" />
              </div>
              <span>Shohoj Niyog</span>
            </Link>
            <p className="text-muted-foreground mt-2">Welcome back to your account</p>
          </div>

          <Card className="border-border shadow-soft overflow-hidden">
            <div className="h-2 bg-primary w-full"></div>
            <CardHeader className="text-center space-y-2 pb-4">
              <CardTitle className="text-2xl font-heading">Sign In</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive" className="bg-destructive/15 border-destructive/50 animate-fade-in">
                    <AlertDescription className="text-destructive-foreground">{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11"
                  />
                </div>

                <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <Label htmlFor="password" className="text-foreground">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-11 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-11 text-base hover-lift animate-fade-in" 
                  disabled={isLoading}
                  style={{ animationDelay: "0.3s" }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link 
                    href="/signup" 
                    className="text-primary hover:text-primary/90 font-medium transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted rounded-lg border border-border animate-fade-in" style={{ animationDelay: "0.5s" }}>
                <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>
                    <strong>Interviewer:</strong> support@beximco.com / demo123
                  </div>
                  <div>
                    <strong>Candidate:</strong> john@example.com / demo456
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center lg:hidden">
            <Link 
              href="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}