"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

type Question = {
  question: string;
};

const questions: Question[] = [
  { question: "Tell me about yourself." },
  { question: "Why do you want to work here?" },
  { question: "Describe a challenge you solved." },
];

const MAX_TIME = 120; // 2 minutes in seconds

const VideoInterview: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});
  const router = useRouter();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const isSubmittingRef = useRef(false);

  // Setup camera + mic
  useEffect(() => {
    const initMedia = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startRecording();
    };
    initMedia();

    return () => {
      stopRecording();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  // Start recording for a question
  const startRecording = () => {
    chunksRef.current = [];
    const mediaRecorder = new MediaRecorder(streamRef.current!);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        chunksRef.current.push(e.data);
      }
    };

    mediaRecorder.onstop = () => {
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

      // append each question’s video
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
    } catch (err) {
      console.error("❌ Upload failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-bold">Question {currentQIndex + 1}</h2>
      <p className="mb-4">{questions[currentQIndex].question}</p>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-96 h-72 rounded-lg border"
      />

      <div className="mt-2 text-red-600 font-semibold">
        Time left: {timeLeft}s
      </div>

      <button
        onClick={handleNext}
        className="mt-4 px-4 py-2 rounded bg-blue-600 text-white"
      >
        {currentQIndex === questions.length - 1 ? "Submit" : "Next Question"}
      </button>
    </div>
  );
};

export default VideoInterview;
