"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  Play,
  Square,
  SkipForward,
  Clock,
  Video,
  Mic,
  Send,
} from "lucide-react";

type Question = {
  question: string;
};

const questions: Question[] = [
  { question: "Tell me about yourself and your background." },
  { question: "Why are you interested in this position and our company?" },
  // { question: "Describe a challenging project you worked on and how you overcame obstacles." },
  // { question: "Tell me about yourself and your background." },
  // { question: "Why are you interested in this position and our company?" },
  // { question: "Describe a challenging project you worked on and how you overcame obstacles." },
];

const MAX_TIME = 120; // 2 minutes in seconds

const VideoInterview: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});
  const [isRecording, setIsRecording] = useState(false);
  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSubmittingRef = useRef(false);

  // Setup camera + mic
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
        startRecording();
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };
    initMedia();

    return () => {
      stopRecording();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Start recording for a question
  const startRecording = () => {
    if (!streamRef.current) return;

    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    setIsRecording(true);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
      setIsRecording(false);
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordings((prev) => {
        const updated = { ...prev, [currentQIndex]: blob };
        // If we were submitting, now actually submit after saving blob
        if (isSubmittingRef.current) {
          handleSubmit(updated);
        }
        return updated;
      });
      chunksRef.current = [];
    };

    mediaRecorder.start();
    setTimeLeft(MAX_TIME);
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleNext = () => {
    stopRecording();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      isSubmittingRef.current = true;
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (streamRef.current) {
      startRecording();
    }
  }, [currentQIndex]);

  const handleSubmit = async (finalRecordings: Record<number, Blob>) => {
    try {
      const formData = new FormData();
      formData.append("session_id", "12345"); // hardcoded session id

      // append each question's video
      Object.entries(finalRecordings).forEach(([index, blob]) => {
        formData.append("video", blob, `ques${Number(index) + 1}.mp4`);
      });

      for (const [key, val] of formData.entries()) {
        console.log(key, val);
      }

      // send to API
      // await axios.post("/api/response/", formData, {
      //   headers: { "Content-Type": "multipart/form-data" },
      // });

      console.log("✅ Recordings uploaded successfully!");

      // cleanup: stop camera + mic
      stopRecording();
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      router.push("/candidate/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progress = ((MAX_TIME - timeLeft) / MAX_TIME) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Video Interview</h1>
          <p className="text-blue-100 mt-1">
            Answer each question to the best of your ability
          </p>
        </div>

        <div className="p-6 md:p-8">
          {/* Progress indicator */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {currentQIndex + 1}
                </span>
              </div>
              <span className="text-slate-600 dark:text-slate-400">
                of {questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Video className="w-4 h-4 mr-1" />
                <span>Camera On</span>
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Mic className="w-4 h-4 mr-1" />
                <span>Mic On</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Question section */}
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-100 dark:border-blue-800/30">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 flex items-center">
                  <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm mr-2">
                    {currentQIndex + 1}
                  </span>
                  Question {currentQIndex + 1}
                </h2>
                <p className="text-slate-700 dark:text-slate-300 text-lg">
                  {questions[currentQIndex].question}
                </p>
              </div>

              {/* Timer */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-slate-700 dark:text-slate-300">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-medium">Time remaining</span>
                  </div>
                  <div
                    className={`text-lg font-bold ${
                      timeLeft <= 10
                        ? "text-red-600"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {formatTime(timeLeft)}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-linear"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Controls */}
              <button
                onClick={handleNext}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg"
              >
                {currentQIndex === questions.length - 1 ? (
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
              <div className="relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-black aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />

                {/* Recording indicator */}
                {isRecording && (
                  <div className="absolute top-4 right-4 flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    <span className="text-white text-sm font-medium">
                      Recording
                    </span>
                  </div>
                )}
              </div>

              {/* Recording status */}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 dark:text-slate-300">
                    Question status:
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      recordings[currentQIndex]
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                    }`}
                  >
                    {recordings[currentQIndex] ? "Recorded" : "Recording..."}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Question navigation */}
          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div className="flex justify-center space-x-2">
              {questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentQIndex) {
                      stopRecording();
                      setCurrentQIndex(index);
                    }
                  }}
                  className={`w-3 h-3 rounded-full ${
                    index === currentQIndex
                      ? "bg-blue-600"
                      : recordings[index]
                      ? "bg-green-500"
                      : "bg-slate-300 dark:bg-slate-600"
                  }`}
                  aria-label={`Go to question ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInterview;
