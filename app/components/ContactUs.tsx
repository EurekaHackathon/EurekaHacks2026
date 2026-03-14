"use client";

import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// Team data
// ─────────────────────────────────────────────────────────────
interface TeamMember {
    name: string;
    role: string;
    description?: string;
    image?: string;
}

const TEAM: TeamMember[] = [
    { name: "John Doe", role: "Co-Founder", description: "Passionate about building the next generation of hackers.", image: undefined },
    { name: "Jane Smith", role: "Tech Lead", description: "Architecture and performance wizard.", image: undefined },
    { name: "Alice Wang", role: "Product Designer", description: "Making things pretty and functional.", image: undefined },
    { name: "Bob Lee", role: "Backend Guru", description: "Scalability and reliability expert.", image: undefined },
    { name: "Charlie Chen", role: "Frontend Dev", description: "React and CSS magic.", image: undefined },
    { name: "Diana Prince", role: "Operations", description: "Keeping everyone on track.", image: undefined },
];

/**
 * Slot properties based on Figma design.
 */
const SLOTS = [
    { w: 368, h: 422, x: 0, opacity: 1, roleSize: 40, nameSize: 32, avatarSize: 123, descSize: 16 },
    { w: 261, h: 299, x: 384, opacity: 0.81, roleSize: 24, nameSize: 24, avatarSize: 87, descSize: 0 },
    { w: 192, h: 220, x: 661, opacity: 0.58, roleSize: 20, nameSize: 20, avatarSize: 64, descSize: 0 },
    { w: 148, h: 170, x: 869, opacity: 0.35, roleSize: 15, nameSize: 14, avatarSize: 50, descSize: 0 },
    { w: 119, h: 136, x: 1033, opacity: 0.16, roleSize: 13, nameSize: 13, avatarSize: 40, descSize: 0 },
];

const EXIT_X = -400; 
const ENTER_X = 1200;

// ── Avatar Component ──
function Avatar({ src, size, name }: { src?: string; size: number; name: string }) {
    return (
        <div
            style={{ 
                width: size, 
                height: size, 
                borderRadius: 8, 
                flexShrink: 0, 
                transition: "width 0.8s ease, height 0.8s ease",
                background: src ? "none" : "#d9d9d9",
                overflow: "hidden"
            }}
        >
            {src && <img src={src} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        </div>
    );
}

// ── Team Card ──
interface CardSpec {
    w: number;
    h: number;
    opacity: number;
    roleSize: number;
    nameSize: number;
    avatarSize: number;
    descSize: number;
}

function TeamCard({
    member,
    targetSpec,
    currentX,
}: {
    member: TeamMember;
    targetSpec: CardSpec;
    currentX: number;
}) {
    const isMain = targetSpec.w > 300;
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                const parentRect = ref.current.parentElement?.getBoundingClientRect();
                const x = parentRect ? rect.left - parentRect.left : 0;
                const opacity = window.getComputedStyle(ref.current).opacity;
            }
        }, 100);
        return () => clearInterval(interval);
    }, [member.name]);

    return (
        <div
            ref={ref}
            style={{
                position: "absolute",
                left: currentX,
                width: targetSpec.w,
                height: targetSpec.h,
                opacity: targetSpec.opacity,
                background: "#FFFEF5",
                borderRadius: 14,
                filter: `drop-shadow(0px 4px 45.1px rgba(0,0,0,${isMain ? 0.4 : 0.25}))`,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: isMain ? "18px 20px" : "12px 14px",
                gap: 8,
                overflow: "hidden",
                // SIMULTANEOUS TRANSITION: Everything moves together
                transition: "width 0.8s ease, height 0.8s ease, opacity 0.8s ease, left 0.8s ease, padding 0.8s ease, filter 0.8s ease",
            }}
        >
            <p
                style={{
                    fontFamily: "var(--font-righteous)",
                    fontSize: targetSpec.roleSize,
                    lineHeight: `${Math.round(targetSpec.roleSize * 1.25)}px`,
                    color: "#284062",
                    textTransform: "uppercase",
                    width: "100%",
                    margin: 0,
                    whiteSpace: "nowrap",
                    transition: "font-size 0.8s ease, line-height 0.8s ease",
                }}
            >
                {member.role}
            </p>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, width: "100%" }}>
                <Avatar src={member.image} size={targetSpec.avatarSize} name={member.name} />
                <p
                    style={{
                        fontFamily: "var(--font-righteous)",
                        fontSize: targetSpec.nameSize,
                        lineHeight: `${Math.round(targetSpec.nameSize * 1.25)}px`,
                        color: "#284062",
                        textTransform: "uppercase",
                        margin: 0,
                        flex: 1,
                        whiteSpace: "nowrap",
                        transition: "font-size 0.8s ease, line-height 0.8s ease",
                    }}
                >
                    {member.name}
                </p>
            </div>
            {isMain && member.description && (
                <p
                    style={{
                        fontFamily: "var(--font-righteous)",
                        fontSize: targetSpec.descSize || 16,
                        color: "#000000",
                        textTransform: "uppercase",
                        width: "100%",
                        marginTop: "auto",
                        transition: "font-size 0.8s ease, opacity 0.8s ease",
                    }}
                >
                    {member.description}
                </p>
            )}
        </div>
    );
}

export default function ContactUs() {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset(o => o + 1);
        }, 2000); 
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", paddingLeft: 56, paddingRight: 56 }}>
            {/* TOP SECTION */}
            <div style={{ position: "relative", minHeight: 650 }}>
                {/* SVG logic */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1000 600" preserveAspectRatio="none">
                    <polygon points="0,0 1000,0 1000,500 1600,440 0,600" stroke="#FFFEF5" strokeWidth="10" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>

                <div style={{ position: "relative", zIndex: 1, padding: "48px 48px 180px 48px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 160px), 70% calc(100% - 160px), 0 100%)" }}>
                    <h2 style={{ fontFamily: "var(--font-righteous)", fontSize: 64, color: "#FFFFFF", textTransform: "uppercase", marginBottom: 40 }}>Meet the team</h2>
                    
                    <div style={{ position: "relative", height: 430, width: "100%" }}>
                        {/* Render 7 cards: 1 exiting, 5 visible, 1 entering */}
                        {[...Array(7)].map((_, i) => {
                            const cardIndex = offset + i - 1; 
                            const member = TEAM[((cardIndex % TEAM.length) + TEAM.length) % TEAM.length];
                            
                            const slotIdx = i - 1; // -1: exit, 0-4: visible, 5: enter

                            let spec: CardSpec;
                            let x: number;

                            if (slotIdx === -1) {
                                // Exiting Left
                                spec = { ...SLOTS[0], w: 0, opacity: 0 };
                                x = EXIT_X;
                            } else if (slotIdx >= 0 && slotIdx < 5) {
                                // Visible Slots
                                spec = SLOTS[slotIdx];
                                x = SLOTS[slotIdx].x;
                            } else {
                                // Entering Right
                                spec = { ...SLOTS[4], w: 0, opacity: 0 };
                                x = ENTER_X;
                            }

                            return (
                                <TeamCard 
                                    key={cardIndex}
                                    member={member}
                                    targetSpec={spec}
                                    currentX={x}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* BOTTOM SECTION */}
            <div style={{ position: "relative", marginTop: 40 }}>
                {/* SVG Border logic */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1000 600" preserveAspectRatio="none">
                    <polygon points="0,160 1043,0 1000,0 1000,600 0,600" stroke="#FFFEF5" strokeWidth="10" fill="none" vectorEffect="non-scaling-stroke" />
                </svg>
                <div style={{ position: "relative", zIndex: 1, padding: "180px 48px 48px 48px", clipPath: "polygon(0 160px, 70% 0, 100% 0, 100% 100%, 0 100%)", display: "flex", justifyContent: "space-between", alignItems: "flex-end", minHeight: 320 }}>
                    <h2 style={{ fontFamily: "var(--font-righteous)", fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.0, color: "#FFFFFF", textTransform: "uppercase", margin: 0 }}>Contact<br />Us</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24, alignItems: "flex-end" }}>
                        <a href="mailto:hello@eurekahacks.ca" style={{ color: "white", textDecoration: "none", fontSize: 24, fontFamily: "var(--font-righteous)" }}>hello@eurekahacks.ca</a>
                        <a href="https://instagram.com/eureka_hacks" style={{ color: "white", textDecoration: "none", fontSize: 24, fontFamily: "var(--font-righteous)" }}>@eureka_hacks</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
