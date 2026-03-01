"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const starsRef = useRef<HTMLImageElement | null>(null);
  const backRef = useRef<HTMLImageElement | null>(null);
  const backRef2 = useRef<HTMLImageElement | null>(null);
  const midRef = useRef<HTMLImageElement | null>(null);
  const midRef2 = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (starsRef.current) {
        starsRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      if (backRef.current && backRef2.current) {
        const offset = scrollY * 0.3;
        backRef.current.style.transform = `translateX(-${offset}px)`;
        backRef2.current.style.transform = `translateX(-${offset}px)`;
      }

      if (midRef.current && midRef2.current) {
        const offset = scrollY * 0.5;
        midRef.current.style.transform = `translateX(-${offset}px)`;
        midRef2.current.style.transform = `translateX(-${offset}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  return (
    <>
      <nav className="top-bar">
        <div className="top-bar-content">
          <Link href="/" className="logo">
            <img src="/logo/small.webp" alt="Logo" className="logo-icon" />
          </Link>
          <div className="nav-links">
            <Link href="#about" className="nav-link">
              ABOUT
            </Link>
            <Link href="#faq" className="nav-link">
              FAQ
            </Link>
            {/* <Link href="#sponsors" className="nav-link">
              SPONSORS
            </Link> */}
            <a href="https://2025.eurekahacks.ca/" className="nav-link">
              LAST YEAR
            </a>
            <Link href="mailto:hello@eurekahacks.ca" className="nav-link">
              CONTACT
            </Link>
            <Link href="#signup" className="nav-link nav-link-signup">
              SIGN UP
            </Link>
          </div>
        </div>
      </nav>

      <div className="absolute z-[60] top-[42%] left-12 -translate-y-1/2 max-w-[1400px] pointer-events-auto">
        <h1 className="font-righteous text-[6rem] font-normal text-[#fff081] m-0 leading-none [text-shadow:3px_3px_0px_rgba(0,0,0,0.8),6px_6px_0px_rgba(0,0,0,0.5),0_0_20px_rgba(228,255,26,0.3)] tracking-[0.02em] relative z-[100]">
          EUREKAHACKS
        </h1>
        <p className="font-freeman text-2xl font-normal text-white mt-4 tracking-[0.1em]">
          MARCH 28 2026, APHS
        </p>

        <form
          onSubmit={handleEmailSubmit}
          className="email-signup relative z-[100] pointer-events-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for updates..."
            className="email-input"
            disabled={isLoading}
          />
          <button type="submit" className="email-submit" disabled={isLoading}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </form>

        {message && (
          <p className={`email-message ${isError ? "error" : "success"}`}>
            {message}
          </p>
        )}
      </div>

      <div className="absolute bottom-0 right-[10%] z-[50] w-[60%] h-[85vh] pointer-events-none flex justify-end items-end">
        <img
          src="/landing/beam.webp"
          alt="Light Beam"
          className="w-full h-[95vh] max-w-[1068px] object-contain [object-position:bottom_right]"
        />
      </div>

      <div className="CitySkyline" aria-hidden>
        <img
          ref={starsRef}
          src="/landing/stars.webp"
          className="skyline skyline-stars"
        />
        <div className="skyline-layer" style={{ zIndex: 2 }}>
          <img
            ref={backRef}
            src="/landing/back.webp"
            className="skyline skyline-back"
          />
          <img
            ref={backRef2}
            src="/landing/back.webp"
            className="skyline skyline-back skyline-duplicate"
          />
        </div>
        <div className="skyline-layer" style={{ zIndex: 3 }}>
          <img
            ref={midRef}
            src="/landing/mid.webp"
            className="skyline skyline-mid"
          />
          <img
            ref={midRef2}
            src="/landing/mid.webp"
            className="skyline skyline-mid skyline-duplicate"
          />
        </div>
      </div>
    </>
  );
}
