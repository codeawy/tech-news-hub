"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    let completeTimer: NodeJS.Timeout;

    const startProgress = () => {
      setIsVisible(true);
      setProgress(0);

      // Simulate realistic progress
      progressTimer = setTimeout(() => setProgress(20), 50);
      setTimeout(() => setProgress(40), 150);
      setTimeout(() => setProgress(60), 250);
      setTimeout(() => setProgress(80), 350);
      setTimeout(() => setProgress(90), 450);

      // Complete after a realistic time
      completeTimer = setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsVisible(false);
          setProgress(0);
        }, 200);
      }, 600);
    };

    // Start progress on pathname change
    startProgress();

    return () => {
      clearTimeout(progressTimer);
      clearTimeout(completeTimer);
    };
  }, [pathname]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
