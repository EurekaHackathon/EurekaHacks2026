"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const starsRef = useRef<HTMLImageElement | null>(null);
  const backRef = useRef<HTMLImageElement | null>(null);
  const midRef = useRef<HTMLImageElement | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) return;

    setIsLoading(true);
    setIsError(false);
    setMessage("");

    const params = new URLSearchParams(window.location.search);

    const source = params.has("source")
      ? params.get("source")
      : params.has("fbclid") || params.has("brid")
      ? "instagram"
      : "unknown";

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Thank you for signing up! We'll keep you updated.");
        setEmail("");
      } else {
        setIsError(true);
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setIsError(true);
      setMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let latestScrollY = window.scrollY || window.pageYOffset;
    let latestPointerNorm = 0;

    let currentStarsX = 0;
    let currentBackX = 0;
    let currentMidX = 0;

    const scrollFactors = { stars: 0.02, back: 0.06, mid: 0.14 };
    const pointerFactors = { stars: 70, back: 140, mid: 300 };
    const smooth = 0.28;
    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const limits = { stars: 10, back: 20, mid: 40 };

    const onScroll = () => {
      latestScrollY = window.scrollY || window.pageYOffset;
    };

    const onPointer = (ev: PointerEvent) => {
      const x = ev.clientX || (ev as any).pageX || 0;
      latestPointerNorm = x / window.innerWidth - 0.5;
    };

    let rafId = 0;
    const frame = () => {
      const sStars = latestScrollY * scrollFactors.stars;
      const sBack = latestScrollY * scrollFactors.back;
      const sMid = latestScrollY * scrollFactors.mid;

      const pStars = latestPointerNorm * pointerFactors.stars;
      const pBack = latestPointerNorm * pointerFactors.back;
      const pMid = latestPointerNorm * pointerFactors.mid;

      const targetStars = clamp(sStars + pStars, -limits.stars, limits.stars);
      const targetBack = clamp(sBack + pBack, -limits.back, limits.back);
      const targetMid = clamp(sMid + pMid, -limits.mid, limits.mid);

      currentStarsX += (targetStars - currentStarsX) * smooth;
      currentBackX += (targetBack - currentBackX) * smooth;
      currentMidX += (targetMid - currentMidX) * smooth;

      if (starsRef.current)
        starsRef.current.style.transform = `translateX(calc(-50% + ${currentStarsX}px))`;
      if (backRef.current)
        backRef.current.style.transform = `translateX(calc(-50% + ${currentBackX}px))`;
      if (midRef.current)
        midRef.current.style.transform = `translateX(calc(-50% + ${currentMidX}px))`;

      rafId = requestAnimationFrame(frame);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer);
    rafId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="LandingPage">
      <div className="CitySkyline" aria-hidden>
          <img
            ref={starsRef}
            src="/landing/stars.png"
            className="skyline skyline-stars"
          />
          <img
            ref={backRef}
            src="/landing/back.png"
            className="skyline skyline-back"
          />
          <img
            ref={midRef}
            src="/landing/mid.png"
            className="skyline skyline-mid"
          />
      </div>

      <div className="content">
        {/* Stats Section */}
        <section className="stats-section">
          <div className="stats-bg-container">
            <img src="/stats/bg1.png" alt="" className="stats-bg" />
            <img src="/stats/side-eye.png" alt="" className="stats-char stats-side-eye w-100" />
            <img src="/stats/smol-boi.png" alt="" className="stats-char stats-smol-boi" />
          </div>
          <div className="stats-bg-container">
            <img src="/stats/bg2.png" alt="" className="stats-bg" />
            <img src="/stats/flying-boi.png" alt="" className="stats-char stats-flying-boi" />
          </div>
          <div className="stats-bg-container">
            <img src="/stats/bg3.png" alt="" className="stats-bg" />
          </div>
          {/* High z-index characters */}
          <img src="/stats/punch.png" alt="" className="stats-char stats-punch" />
          <img src="/stats/mad-boi.png" alt="" className="stats-char stats-mad-boi" />
        </section>
      </div>
    </div>
  );
}
