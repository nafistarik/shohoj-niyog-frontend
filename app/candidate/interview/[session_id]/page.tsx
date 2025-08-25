"use client";

import React, { useEffect, useRef, useState } from "react";

type Question = {
  id: number;
  text: string;
};

const questions: Question[] = [
  { id: 1, text: "Tell me about yourself." },
  { id: 2, text: "Why do you want to work here?" },
  { id: 3, text: "Describe a challenge you solved." },
];

const MAX_TIME = 120; // 2 minutes in seconds

const VideoInterview: React.FC = () => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(MAX_TIME);
  const [recordings, setRecordings] = useState<Record<number, Blob>>({});

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

  // Stop recording for current question
  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  // Handle Next Question or Submit
  const handleNext = () => {
    stopRecording();
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      // last question → defer submit until onstop finishes
      isSubmittingRef.current = true;
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleNext();
      return;
    }
    const timer = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Restart recording when question changes
  useEffect(() => {
    if (streamRef.current) {
      startRecording();
    }
  }, [currentQIndex]);

  const handleSubmit = (finalRecordings: Record<number, Blob>) => {
    console.log("Submitting recordings:", finalRecordings);
    stopRecording();
    streamRef.current?.getTracks().forEach((t) => t.stop());
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl font-bold">Question {currentQIndex + 1}</h2>
      <p className="mb-4">{questions[currentQIndex].text}</p>

      <video ref={videoRef} autoPlay muted className="w-96 h-72 rounded-lg border" />

      <div className="mt-2 text-red-600 font-semibold">Time left: {timeLeft}s</div>

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
