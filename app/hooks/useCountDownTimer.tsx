import { useState, useEffect } from "react";

function useCountdownTimer(targetDate: Date) {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const timeRemaining = targetDate.getTime() - now;

    if (timeRemaining <= 0)
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");

    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    )
      .toString()
      .padStart(2, "0");

    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");

    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");

    return { days, hours, minutes, seconds };
  };

  const [countdown, setCountdown] = useState(calculateTimeRemaining);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateTimeRemaining);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [targetDate]);

  return countdown;
}

export default useCountdownTimer;
