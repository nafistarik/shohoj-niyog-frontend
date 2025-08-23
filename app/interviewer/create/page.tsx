"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { X, Plus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type { CreateSessionPayload } from "@/lib/types"

export default function CreateSessionPage() {
  const [formData, setFormData] = useState<CreateSessionPayload>({
    position: "",
    stacks: [],
    level: "",
    allowed_candidates: [],
    num_questions: 3,
    scheduled: "",
  })
  const [newStack, setNewStack] = useState("")
  const [newCandidate, setNewCandidate] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const addStack = () => {
    if (newStack.trim() && !formData.stacks.includes(newStack.trim())) {
      setFormData((prev) => ({
        ...prev,
        stacks: [...prev.stacks, newStack.trim()],
      }))
      setNewStack("")
    }
  }

  const removeStack = (stack: string) => {
    setFormData((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((s) => s !== stack),
    }))
  }

  const addCandidate = () => {
    const email = newCandidate.trim()
    if (email && !formData.allowed_candidates.includes(email)) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (emailRegex.test(email)) {
        setFormData((prev) => ({
          ...prev,
          allowed_candidates: [...prev.allowed_candidates, email],
        }))
        setNewCandidate("")
      } else {
        setError("Please enter a valid email address")
      }
    }
  }

  const removeCandidate = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      allowed_candidates: prev.allowed_candidates.filter((c) => c !== email),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    console.log(formData);

    // // Validation
    // if (!formData.position.trim()) {
    //   setError("Position title is required")
    //   return
    // }
    // if (formData.stacks.length === 0) {
    //   setError("At least one technology stack is required")
    //   return
    // }
    // if (!formData.level) {
    //   setError("Experience level is required")
    //   return
    // }
    // if (formData.allowed_candidates.length === 0) {
    //   setError("At least one candidate email is required")
    //   return
    // }

    // setIsLoading(true)

    // try {
    //   const response = await fetch("/api/gen", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   })

    //   const data = await response.json()

    //   if (response.ok) {
    //     setSuccess("Interview session created successfully!")
    //     setTimeout(() => {
    //       router.push(`/interviewer/session/${data.Session_ID}`)
    //     }, 2000)
    //   } else {
    //     setError(data.error || "Failed to create session")
    //   }
    // } catch (err) {
    //   setError("An error occurred. Please try again.")
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6">
            <Button variant="ghost" size="sm" asChild className="mr-4">
              <Link href="/interviewer/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-heading font-bold text-slate-900">Create Interview Session</h1>
              <p className="text-slate-600 mt-1">Set up a new interview session with custom questions</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-heading">Session Details</CardTitle>
            <CardDescription>Configure your interview session parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Position */}
              <div className="space-y-2">
                <Label htmlFor="position">Position Title</Label>
                <Input
                  id="position"
                  placeholder="e.g., Frontend Developer, Data Scientist"
                  value={formData.position}
                  onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                  className="h-11"
                />
              </div>

              {/* Technology Stacks */}
              <div className="space-y-2">
                <Label>Technology Stacks</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="e.g., React, Node.js, Python"
                    value={newStack}
                    onChange={(e) => setNewStack(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addStack())}
                    className="h-11"
                  />
                  <Button type="button" onClick={addStack} size="sm" className="h-11">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.stacks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.stacks.map((stack) => (
                      <Badge key={stack} variant="secondary" className="flex items-center gap-1">
                        {stack}
                        <button type="button" onClick={() => removeStack(stack)} className="ml-1 hover:text-red-600">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <Label>Experience Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, level: value }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner (0-2 years)</SelectItem>
                    <SelectItem value="Intermediate">Intermediate (2-5 years)</SelectItem>
                    <SelectItem value="Advanced">Advanced (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions */}
              <div className="space-y-2">
                <Label htmlFor="num_questions">Number of Questions</Label>
                <Select
                  value={formData.num_questions.toString()}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, num_questions: Number.parseInt(value) }))}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 Questions</SelectItem>
                    <SelectItem value="3">3 Questions</SelectItem>
                    <SelectItem value="4">4 Questions</SelectItem>
                    <SelectItem value="5">5 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Allowed Candidates */}
              <div className="space-y-2">
                <Label>Candidate Emails</Label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="candidate@example.com"
                    value={newCandidate}
                    onChange={(e) => setNewCandidate(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCandidate())}
                    className="h-11"
                  />
                  <Button type="button" onClick={addCandidate} size="sm" className="h-11">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.allowed_candidates.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {formData.allowed_candidates.map((email) => (
                      <div key={email} className="flex items-center justify-between bg-slate-50 p-2 rounded">
                        <span className="text-sm">{email}</span>
                        <button
                          type="button"
                          onClick={() => removeCandidate(email)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scheduled Date */}
              <div className="space-y-2">
                <Label htmlFor="scheduled">Scheduled Date & Time (Optional)</Label>
                <Input
                  id="scheduled"
                  type="datetime-local"
                  value={formData.scheduled}
                  onChange={(e) => setFormData((prev) => ({ ...prev, scheduled: e.target.value }))}
                  className="h-11"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <Button type="button" variant="outline" asChild>
                  <Link href="/interviewer/dashboard">Cancel</Link>
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Session..." : "Create Session"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
