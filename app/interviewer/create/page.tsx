"use client";

import type React from "react";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Plus, ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { CreateSessionPayload } from "@/lib/types";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function CreateSessionPage() {
  const [formData, setFormData] = useState<CreateSessionPayload>({
    position: "",
    stacks: [],
    level: "",
    allowed_candidates: [],
    num_questions: 3,
    scheduled: "",
  });
  const [newStack, setNewStack] = useState("");
  const [newCandidate, setNewCandidate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");

  const router = useRouter();

  // Generate time options in 30-minute intervals
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      // Only add the :30 time for each hour
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const amPm = hour >= 12 ? 'PM' : 'AM';
      options.push({
        value: `${hour.toString().padStart(2, '0')}:30`,
        label: `${displayHour}:30 ${amPm}`
      });
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const addStack = () => {
    if (newStack.trim() && !formData.stacks.includes(newStack.trim())) {
      setFormData((prev) => ({
        ...prev,
        stacks: [...prev.stacks, newStack.trim()],
      }));
      setNewStack("");
    }
  };

  const removeStack = (stack: string) => {
    setFormData((prev) => ({
      ...prev,
      stacks: prev.stacks.filter((s) => s !== stack),
    }));
  };

  const addCandidate = () => {
    const email = newCandidate.trim();
    if (email && !formData.allowed_candidates.includes(email)) {
      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(email)) {
        setFormData((prev) => ({
          ...prev,
          allowed_candidates: [...prev.allowed_candidates, email],
        }));
        setNewCandidate("");
        setError("");
      } else {
        setError("Please enter a valid email address");
      }
    }
  };

  const removeCandidate = (email: string) => {
    setFormData((prev) => ({
      ...prev,
      allowed_candidates: prev.allowed_candidates.filter((c) => c !== email),
    }));
  };

  // Update the scheduled value when date or time changes
  useEffect(() => {
    if (date && time) {
      const [hours, minutes] = time.split(':');
      const newDate = new Date(date);
      newDate.setHours(parseInt(hours), parseInt(minutes));
      
      setFormData((prev) => ({
        ...prev,
        scheduled: newDate.toISOString(),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        scheduled: "",
      }));
    }
  }, [date, time]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.position.trim()) {
      setError("Position title is required");
      return;
    }
    if (formData.stacks.length === 0) {
      setError("At least one technology stack is required");
      return;
    }
    if (!formData.level) {
      setError("Experience level is required");
      return;
    }
    if (formData.allowed_candidates.length === 0) {
      setError("At least one candidate email is required");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setSuccess("Interview session created successfully!");
        setIsLoading(false);
        // In a real app, you would redirect to the session page
        // router.push(`/interviewer/session/${data.Session_ID}`);
      }, 1500);
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-6 justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create Interview Session
              </h1>
              <p className="text-muted-foreground mt-1">
                Set up a new interview session with custom questions
              </p>
            </div>

            <Button variant="outline" size="sm" asChild>
              <Link href="/interviewer/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Session Details</CardTitle>
            <CardDescription>
              Configure your interview session parameters
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
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
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  className="h-11"
                />
              </div>

              {/* Technology Stacks */}
              <div className="space-y-2">
                <Label>Technology Stacks</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., React, Node.js, Python"
                    value={newStack}
                    onChange={(e) => setNewStack(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addStack())
                    }
                    className="h-11 flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addStack}
                    className="h-11 px-3"
                    disabled={!newStack.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.stacks.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.stacks.map((stack) => (
                      <Badge
                        key={stack}
                        variant="secondary"
                        className="flex items-center gap-1 py-1 px-3"
                      >
                        {stack}
                        <button
                          type="button"
                          onClick={() => removeStack(stack)}
                          className="ml-1 rounded-full hover:bg-muted"
                        >
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
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, level: value }))
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">
                      Beginner (0-2 years)
                    </SelectItem>
                    <SelectItem value="Intermediate">
                      Intermediate (2-5 years)
                    </SelectItem>
                    <SelectItem value="Advanced">
                      Advanced (5+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions */}
              <div className="space-y-2">
                <Label htmlFor="num_questions">Number of Questions</Label>
                <Select
                  value={formData.num_questions.toString()}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      num_questions: Number.parseInt(value),
                    }))
                  }
                >
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select number of questions" />
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
                <div className="flex gap-2">
                  <Input
                    placeholder="candidate@example.com"
                    value={newCandidate}
                    onChange={(e) => setNewCandidate(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addCandidate())
                    }
                    className="h-11 flex-1"
                  />
                  <Button
                    type="button"
                    onClick={addCandidate}
                    className="h-11 px-3"
                    disabled={!newCandidate.trim()}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {formData.allowed_candidates.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {formData.allowed_candidates.map((email) => (
                      <div
                        key={email}
                        className="flex items-center justify-between bg-muted/30 p-3 rounded-md"
                      >
                        <span className="text-sm">{email}</span>
                        <button
                          type="button"
                          onClick={() => removeCandidate(email)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Scheduled Date & Time */}
              <div className="space-y-4">
                <Label>Scheduled Date & Time (Optional)</Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <Label htmlFor="date-picker">Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left h-11 px-3"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Time Selector */}
                  <div className="space-y-2">
                    <Label htmlFor="time-select">Select Time</Label>
                    <Select value={time} onValueChange={setTime}>
                      <SelectTrigger className="!h-11 border border-gray-200">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4" />
                          <SelectValue placeholder="Select time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {timeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Selected DateTime Preview */}
                {date && time && (
                  <div className="p-3 bg-muted/30 rounded-md">
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <strong>Selected:</strong> 
                      <span className="ml-1">
                        {format(date, "PPP")} at {timeOptions.find(opt => opt.value === time)?.label}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-6">
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
  );
}