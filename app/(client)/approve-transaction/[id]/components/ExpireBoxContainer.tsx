"use client";

import React from "react";
import ExpiryBox from "./ExpiryBox";
import useCountdownTimer from "@/app/hooks/useCountDownTimer";

export default function ExpireBoxContainer({ expireAt }: { expireAt: string }) {
  const { days, hours, minutes, seconds } = useCountdownTimer(
    new Date(expireAt)
  );
  return (
    <div className="flex items-center gap-2">
      <ExpiryBox amount={Number(days)} duration={"DAYS"} />
      <ExpiryBox amount={Number(hours)} duration={"HOURS"} />
      <ExpiryBox amount={Number(minutes)} duration={"MINS"} />
    </div>
  );
}
