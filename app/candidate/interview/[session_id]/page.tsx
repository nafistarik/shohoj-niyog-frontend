"use client"

import Link from "next/link"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Play,
  Square,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Upload,
  CheckCircle,
} from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import type { InterviewSession } from "@/lib/types"
import { LoadingSpinner } from "@/components/shared/loading-spinner"
import { ErrorMessage } from "@/components/shared/error-message"

interface RecordedResponse {
  question_id: string
  blob: Blob
  duration: number
}

export default function VideoInterviewPage() {
  const [session, setSession] = useState<InterviewSession | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedResponses, setRecordedResponses] = useState<RecordedResponse[]>([])
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [cameraEnabled, setCameraEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)

  const videoRef = useRef<HTMLVideoElement>(null)
  const recordingTimerRef = useRef<NodeJS.Timeout>()
  const params = useParams()
  const router = useRouter()

  useEffect(() => {
    if (params.session_id) {
      fetchSession(params.session_id as string)
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [params.session_id])

  useEffect(() => {
    if (session && session.qa_pairs.length > 0) {
      initializeCamera()
    }
  }, [session])

  const fetchSession = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/find/${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setSession(data)
      } else {
        setError("Session not found or you don't have access")
      }
    } catch (err) {
      setError("Failed to load interview session")
    } finally {
      setIsLoading(false)
    }
  }

  const initializeCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setMediaStream(stream)
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      setError("Camera and microphone access is required for video interviews")
    }
  }

  const toggleCamera = () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled
        setCameraEnabled(videoTrack.enabled)
      }
    }
  }

  const toggleMicrophone = () => {
    if (mediaStream) {
      const audioTrack = mediaStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        setMicEnabled(audioTrack.enabled)
      }
    }
  }

  const startRecording = () => {
    if (!mediaStream) return

    const recorder = new MediaRecorder(mediaStream)
    const chunks: Blob[] = []

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunks.push(event.data)
      }
    }

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" })
      const currentQuestion = session?.qa_pairs[currentQuestionIndex]
      if (currentQuestion) {
        const response: RecordedResponse = {
          question_id: currentQuestion.question_id,
          blob,
          duration: recordingTime,
        }
        setRecordedResponses((prev) => {
          const filtered = prev.filter((r) => r.question_id !== currentQuestion.question_id)
          return [...filtered, response]
        })
      }
    }

    recorder.start()
    setMediaRecorder(recorder)
    setIsRecording(true)
    setRecordingTime(0)

    recordingTimerRef.current = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setMediaRecorder(null)
      setIsRecording(false)
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current)
      }
    }
  }

  const retakeRecording = () => {
    const currentQuestion = session?.qa_pairs[currentQuestionIndex]
    if (currentQuestion) {
      setRecordedResponses((prev) => prev.filter((r) => r.question_id !== currentQuestion.question_id))
    }
    setRecordingTime(0)
  }

  const goToNextQuestion = () => {
    if (session && currentQuestionIndex < session.qa_pairs.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setRecordingTime(0)
    }
  }

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      setRecordingTime(0)
    }
  }

  const submitAllResponses = async () => {
    if (!session || recordedResponses.length !== session.qa_pairs.length) {
      setError("Please record responses to all questions before submitting")
      return
    }

    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("session_id", session.id)

      recordedResponses.forEach((response, index) => {
        formData.append(`video_${index}`, response.blob, `question_${response.question_id}.webm`)
        formData.append(`question_id_${index}`, response.question_id)
        formData.append(`duration_${index}`, response.duration.toString())
      })

      const response = await fetch("/api/response", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        setIsComplete(true)
        setTimeout(() => {
          router.push("/candidate/dashboard")
        }, 3000)
      } else {
        setError("Failed to submit responses. Please try again.")
      }
    } catch (err) {
      setError("An error occurred while submitting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const currentQuestion = session?.qa_pairs[currentQuestionIndex]
  const hasRecordedCurrent = currentQuestion
    ? recordedResponses.some((r) => r.question_id === currentQuestion.question_id)
    : false
  const progress = session ? ((currentQuestionIndex + 1) / session.qa_pairs.length) * 100 : 0
  const allQuestionsRecorded = session ? recordedResponses.length === session.qa_pairs.length : false

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    )
  }

  if (error || !session || !currentQuestion) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <ErrorMessage message={error || "Session not found"} />
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="p-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-2">Interview Complete!</h2>
            <p className="text-slate-600 mb-4">
              Your responses have been submitted successfully. You'll be redirected to your dashboard shortly.
            </p>
            <Button asChild>
              <Link href="/candidate/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-slate-900">{session.position}</h1>
                <p className="text-slate-600">Video Interview</p>
              </div>
              <Badge variant="outline">
                Question {currentQuestionIndex + 1} of {session.qa_pairs.length}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Video Preview */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Video Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-slate-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                  />
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-white text-sm font-medium">REC {formatTime(recordingTime)}</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleCamera}
                    className={!cameraEnabled ? "bg-red-50 border-red-200" : ""}
                  >
                    {cameraEnabled ? <Camera className="w-4 h-4" /> : <CameraOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleMicrophone}
                    className={!micEnabled ? "bg-red-50 border-red-200" : ""}
                  >
                    {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recording Controls */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center space-x-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} size="lg" className="bg-red-600 hover:bg-red-700">
                      <Play className="w-5 h-5 mr-2" />
                      Start Recording
                    </Button>
                  ) : (
                    <Button onClick={stopRecording} size="lg" variant="outline">
                      <Square className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  )}

                  {hasRecordedCurrent && !isRecording && (
                    <Button onClick={retakeRecording} variant="outline" size="lg">
                      <RotateCcw className="w-5 h-5 mr-2" />
                      Retake
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Question */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Question {currentQuestionIndex + 1}</CardTitle>
                <CardDescription>Take your time and answer thoughtfully</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-slate-900 leading-relaxed">{currentQuestion.question}</p>
                {hasRecordedCurrent && (
                  <Alert className="mt-4 border-green-200 bg-green-50">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <AlertDescription className="text-green-800">Response recorded successfully!</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-transparent"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              {currentQuestionIndex < session.qa_pairs.length - 1 ? (
                <Button onClick={goToNextQuestion} disabled={!hasRecordedCurrent}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={submitAllResponses} disabled={!allQuestionsRecorded || isSubmitting}>
                  {isSubmitting ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Submit Interview
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Progress Summary */}
            <Card>
              <CardContent className="p-4">
                <div className="text-sm text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Progress:</span>
                    <span>
                      {recordedResponses.length} of {session.qa_pairs.length} questions completed
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
