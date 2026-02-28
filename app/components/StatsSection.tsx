"use client";
import './stats-box-styles.css';
import { useEffect, useRef, useState } from 'react';

export default function StatsSection() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    if (window.innerWidth > 600) {
      // Looks weird on mobile
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`stats-section ${isVisible && isScrolling ? 'animate' : ''}`}>
      <div className="stats-bg-container">
        <img src="/stats/bg1.png" alt="" className="stats-bg" />
        <img src="/stats/side-eye.png" alt="" className="stats-char stats-side-eye w-100" />
        <img src="/stats/smol-boi.png" alt="" className="stats-char stats-smol-boi" />
      </div>
      <div className="stats-bg-container">
        <img src="/stats/bg2.png" alt="" className="stats-bg" />
        <img src="/stats/flying-boi.png" alt="" className="stats-char stats-flying-boi" />
        <img src="/stats/punch.png" alt="" className="stats-char stats-punch" />
      </div>
      <div className="stats-bg-container">
        <img src="/stats/bg3.png" alt="" className="stats-bg" />
        <img src="/stats/mad-boi.png" alt="" className="stats-char stats-mad-boi" />
      </div>
      {/* Text boxes on top layer */}
      <div className="stats-box-wrapper stats-box-1">
        <img src="/stats/text-box.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>500+</h3>
          <p>HACKERS</p>
        </div>
      </div>
      <div className="stats-box-wrapper stats-box-2">
        <img src="/stats/text-box2.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>$10k+</h3>
          <p>IN PRIZES</p>
        </div>
      </div>
      <div className="stats-box-wrapper stats-box-3">
        <img src="/stats/text-box3.png" alt="" className="stats-box-bg" />
        <div className="stats-text">
          <h3>24H</h3>
          <p>OF HACKING</p>
        </div>
      </div>
      
    </section>
  );
}
