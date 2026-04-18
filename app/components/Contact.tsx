"use client";

import { useState, useEffect } from "react";

export default function Contact() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className="w-screen max-w-7xl mx-auto" style={{ overflow: "hidden", boxSizing: "border-box", padding: isMobile ? "16px" : "48px" }}>
            <div className="shadow-2xl" style={{ position: "relative", border: "12px solid white", borderRadius: 0 }}>
                <div style={{ 
                    position: "relative", 
                    zIndex: 1, 
                    padding: isMobile ? "32px 20px" : "64px 48px", 
                    display: "flex", 
                    flexDirection: isMobile ? "column" : "row", 
                    justifyContent: "space-between", 
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? 24 : 0
                }}>
                    <h2 style={{ fontFamily: "var(--font-righteous)", fontSize: isMobile ? 48 : "clamp(48px, 7vw, 96px)", lineHeight: 1.0, color: "#FFFFFF", textTransform: "uppercase", margin: 0 }}>Contact<br />Us</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? 12 : 24, alignItems: isMobile ? "flex-start" : "flex-end" }}>
                        <a href="mailto:hello@eurekahacks.ca" style={{ color: "white", textDecoration: "underline", fontSize: isMobile ? 20 : 24, fontFamily: "var(--font-righteous)" }}>hello@eurekahacks.ca</a>
                        <a href="https://instagram.com/eureka_hacks" style={{ color: "white", textDecoration: "underline", fontSize: isMobile ? 20 : 24, fontFamily: "var(--font-righteous)" }}>@eureka_hacks</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
