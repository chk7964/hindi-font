"use client";
import React, { useState, useEffect } from "react";

export default function TimerDownload({ url }: { url: string }) {
  const [timeLeft, setTimeLeft] = useState(10); // countdown in seconds
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowButton(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer); // cleanup
  }, [timeLeft]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      {!showButton ? (
        <div className="text-xl font-semibold">
          Please wait {timeLeft} seconds...
        </div>
      ) : (
        <a
          href={url}
          download
          className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Download File
        </a>
      )}
    </div>
  );
}
