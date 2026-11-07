"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { SkipForward, Clock, Video, Mic, Send } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { API_BASE_URL } from "@/lib/constants";
import { getCookie } from "@/lib/utils";
import { useFetch } from "@/hooks/use-fetch";

type Question = {
  question: string;
};

const MAX_TIME = 120;

const VideoInterview: React.FC = () => {
  const [error, setError] = useState("");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const pathname = usePathname();
  const pathParts = pathname.split("/");
  const sessionId = pathParts[3];

  const {
    data: questions = [],
    loading: loadingQuestions,
    error: fetchError,
  } = useFetch<Question[]>(sessionId ? `/api/find/${sessionId}` : null);

  const submitRecordings = useCallback(
    async (finalRecordings: Record<number, Blob>) => {
      if (isSubmitting) return;

      setIsSubmitting(true);
      setError("");

      try {
        const formData = new FormData();
        formData.append("session_id", sessionId);

        // The backend matches videos to questions by order only, so they go in question order.
        Object.entries(finalRecordings).forEach(([index, blob]) => {
          formData.append("video", blob, `ques${Number(index) + 1}.webm`);
        });

        const token = getCookie("access_token");
        await axios.post(
          `${API_BASE_URL}/api/response/`,
          formData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
              "Content-Type": "multipart/form-data",
            },
          }
        );

        streamRef.current?.getTracks().forEach((t) => t.stop());

        router.push("/candidate/dashboard");
      } catch {
        setError("Failed to submit recordings. Please try again.");
        setIsSubmitting(false);
      }
    },
    [isSubmitting, sessionId, router]
  );

  const stopRecordingAsync = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const recorder = mediaRecorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        resolve(null);
        return;
      }

      // The only stop listener: a second one would empty chunksRef before this one reads it.
      recorder.addEventListener(
        "stop",
        () => {
          const blob = new Blob(chunksRef.current, { type: "video/webm" });
          chunksRef.current = [];
          resolve(blob);
        },
        { once: true }
      );
      recorder.stop();
      setIsRecording(false);
    });
  }, []);

  useEffect(() => {
    const initMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraReady(true);
      } catch {
        setError(
          "Failed to access camera/microphone. Allow access and reload the page to start the interview."
        );
      }
    };

    initMedia();

    return () => {
      if (mediaRecorderRef.current?.state === "recording") {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const startRecording = useCallback(() => {
    if (!streamRef.current || mediaRecorderRef.current?.state === "recording")
      return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };
    mediaRecorder.start();
    setTimeLeft(MAX_TIME);
    setIsRecording(true);
  }, []);

  const handleNext = useCallback(async () => {
    const isLast =
      !!questions?.length && currentQIndex === questions.length - 1;
    let allRecordings = recordings;

    if (mediaRecorderRef.current?.state === "recording") {
      const blob = await stopRecordingAsync();
      if (blob) {
        allRecordings = { ...recordings, [currentQIndex]: blob };
        setRecordings(allRecordings);
      }
    } else if (!recordings[currentQIndex]) {
      // Nothing recorded for this question yet, or a timer tick and a click both fired.
      return;
    }

    if (isLast) {
      await submitRecordings(allRecordings);
    } else {
      setCurrentQIndex((prev) => prev + 1);
    }
  }, [
    currentQIndex,
    questions?.length,
    recordings,
    stopRecordingAsync,
    submitRecordings,
  ]);

  // The clock runs only while a recording is running, so it never starts before the camera and questions are ready.
  useEffect(() => {
    if (!isRecording) return;
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [isRecording, timeLeft, handleNext]);

  useEffect(() => {
    if (!cameraReady || !questions?.length) return;
    startRecording();
  }, [cameraReady, currentQIndex, questions?.length, startRecording]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = ((MAX_TIME - timeLeft) / MAX_TIME) * 100;

  if (loadingQuestions) return <p>Loading session...</p>;
  if (fetchError) return <p style={{ color: "red" }}>{error}</p>;
  if (questions?.length === 0) return <p>No questions available</p>;

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Video Interview"
        description="Answer each question to the best of your ability"
      />
      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-card rounded-xl shadow-xl overflow-hidden border border-border">
          <div className="p-6 md:p-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center mr-2">
                  <span className="text-sm font-bold text-primary">
                    {currentQIndex + 1}
                  </span>
                </div>
                <span className="text-muted-foreground">
                  of {questions?.length}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Video className="w-4 h-4 mr-1" />
                  <span>Camera On</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mic className="w-4 h-4 mr-1" />
                  <span>Mic On</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Question section */}
              <div className="space-y-6">
                <div className="bg-secondary rounded-xl p-5 border border-border">
                  <h2 className="text-lg font-semibold text-foreground mb-2 flex items-center">
                    <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm mr-2">
                      {currentQIndex + 1}
                    </span>
                    Question {currentQIndex + 1}
                  </h2>
                  <p className="text-foreground text-lg">
                    {(questions && questions[currentQIndex]?.question) ||
                      "Loading question..."}
                  </p>
                </div>

                {/* Timer */}
                <div className="bg-muted rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-foreground">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">Time remaining</span>
                    </div>
                    <div
                      className={`text-lg font-bold ${
                        timeLeft <= 10 ? "text-destructive" : "text-foreground"
                      }`}
                    >
                      {formatTime(timeLeft)}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-border rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-primary transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}

                {/* Controls */}
                <button
                  onClick={handleNext}
                  disabled={
                    isSubmitting ||
                    (!isRecording && !recordings[currentQIndex])
                  }
                  className="w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    "Submitting..."
                  ) : questions?.length && currentQIndex === questions?.length - 1 ? (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit All Responses
                    </>
                  ) : (
                    <>
                      <SkipForward className="w-5 h-5 mr-2" />
                      Next Question
                    </>
                  )}
                </button>
              </div>

              {/* Video section */}
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden border border-border bg-black aspect-video">
                  <video
                    ref={(el) => {
                      videoRef.current = el;
                      // The stream can arrive while the loading screen is up, before this element exists.
                      if (
                        el &&
                        streamRef.current &&
                        el.srcObject !== streamRef.current
                      ) {
                        el.srcObject = streamRef.current;
                      }
                    }}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                  />

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 right-4 flex items-center">
                      <div className="w-3 h-3 rounded-full bg-destructive mr-2 animate-pulse"></div>
                      <span className="text-white text-sm font-medium">
                        Recording
                      </span>
                    </div>
                  )}
                </div>

                {/* Recording status */}
                <div className="bg-muted rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-foreground">Question status:</span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        recordings[currentQIndex]
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {isRecording
                        ? "Recording..."
                        : recordings[currentQIndex]
                        ? "Recorded"
                        : "Waiting for camera..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Question progress: display only, since skipping a question would shift every later video onto the wrong question */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex justify-center space-x-2">
                {questions?.map((_, index) => (
                  <span
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentQIndex
                        ? "bg-primary"
                        : recordings[index]
                        ? "bg-green-500"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`Question ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;
