"use client";

import { useState, useEffect } from "react";

const calculateTimeLeft = (eventDate: number) => {
    const now = new Date().getTime();
    const difference = eventDate - now;

    if (difference <= 0) {
        return {days: 0, hours: 0, minutes: 0, seconds: 0};
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {days, hours, minutes, seconds};
};

export function CountdownTimer() {
    const eventDate = new Date("2026-05-01T16:00:00-05:00").getTime();
    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

    useEffect(() => {
        setTimeLeft(calculateTimeLeft(eventDate));
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(eventDate));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!timeLeft) return null;

    const { days, hours, minutes, seconds } = timeLeft;

    return (
        <div className="flex gap-2 text-[var(--neon-yellow)] font-bold text-3xl md:text-5xl pt-6 flex-wrap">
            {days > 0 && <h1>{days}d</h1>}
            {(days > 0 || hours > 0) && <h1>{hours}h</h1>}
            {(days > 0 || hours > 0 || minutes > 0) && <h1>{minutes}m</h1>}
            <h1>{seconds}s</h1>
        </div>
    );
}