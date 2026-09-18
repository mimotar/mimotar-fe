"use client";

import { useEffect, useState } from "react";

export const AutoReleaseTimer: React.FC<{ deliveredAt?: string | null }> = ({
  deliveredAt,
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("48:00:00");

  useEffect(() => {
    if (!deliveredAt) {
      setTimeLeft("48:00:00");
      return;
    }

    const calculateTimeLeft = () => {
      const deliveryTime = new Date(deliveredAt).getTime();
      const targetTime = deliveryTime + 48 * 60 * 60 * 1000; // 48 hours from delivery
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        return "00:00:00";
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const pad = (num: number) => String(num).padStart(2, "0");
      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    };

    // Calculate immediately
    setTimeLeft(calculateTimeLeft());

    // Tick every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [deliveredAt]);

  return (
    <div className="text-base font-black text-amber-950 bg-white px-4.5 py-1.5 rounded-xl border border-amber-200 shrink-0 font-mono animate-pulse">
      {timeLeft}
    </div>
  );
};
