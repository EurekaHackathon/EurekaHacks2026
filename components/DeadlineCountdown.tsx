"use client";

import { useState, useEffect } from "react";

export function DeadlineCountdown() {
    const deadline = new Date("2026-04-30T23:59:59-05:00").getTime();
    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

    function calculateTimeLeft() {
        const now = new Date().getTime();
        const difference = deadline - now;

        if (difference <= 0) {
            return { unit: "Deadline has passed", value: "" as string | number };
        }

        const days = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
        const hours = Math.max(Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 0);
        const minutes = Math.max(Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)), 0);
        const seconds = Math.max(Math.floor((difference % (1000 * 60)) / 1000), 0);

        if (days > 0) {
            return { unit: "day", value: days };
        } else if (hours > 0) {
            return { unit: "hour", value: hours };
        } else if (minutes > 0) {
            return { unit: "minute", value: minutes };
        } else {
            return { unit: "second", value: seconds };
        }
    }

    useEffect(() => {
        setTimeLeft(calculateTimeLeft());
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    return (
        <h1 className="text-[var(--neon-yellow)] font-bold text-5xl pt-6">
            {timeLeft.value} {timeLeft.unit}{timeLeft.value !== 1 && timeLeft.value !== "" ? "s" : ""}
        </h1>
    );
}