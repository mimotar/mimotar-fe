"use client";

import { useEffect, useState } from "react";

interface NegotiationCountdownProps {
  elapsesAt: string; // ISO date string
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex sm:h-[72px] h-[50px] sm:w-[72px] w-[50px] flex-col items-center justify-center rounded-xl border border-[#CBD5E1] bg-[#F8FAFC]">
      <span className="sm:text-2xl text-xl font-semibold leading-none text-[#0F172A]">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs font-semibold sm:uppercase tracking-wide text-neutral-500">
        {label}
      </span>
    </div>
  );
}

export default function NegotiationCountdown({
  elapsesAt,
}: NegotiationCountdownProps) {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = new Date(elapsesAt).getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [elapsesAt]);

  return (
    <section className="flex flex-wrap items-center gap-4">
      <p className="text-base  text-neutral-600">Negotiation ends in:</p>

      <div className="flex items-center gap-2.5">
        <CountdownUnit value={timeLeft.days} label="Days" />
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <CountdownUnit value={timeLeft.minutes} label="Mins" />
      </div>
    </section>
  );
}
