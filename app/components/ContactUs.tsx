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
    superpower?: string;
    supercolor?: string;
}

const TEAM: TeamMember[] = [
    { name: "Daniel Zhu", role: "Sponsorship", description: "When I was a kid, I used to stare at cars. Now, I sit in a car and stare at kids", image: "/team/DanielZhu.png", superpower: "Haha no G1", supercolor: "#FF5733" },
    { name: "Yohance Pawani", role: "President", description: "I like pink floyd", image: "/team/Yohance.png", superpower: "Quantum levitation", supercolor: "#33FF57" },
    { name: "Anvi Nambiar", role: "Marketing", description: "I hate spiders", image: "/team/Anvi.png", superpower: "Spider whispering", supercolor: "#3357FF" },
    { name: "Alan Liu", role: "Backend Guru", description: "Thou of much hair must bow before thy of little hair", image: "/team/Alan.png", superpower: "5 cups of coffee a day", supercolor: "#F333FF" },
    { name: "Eason Huang", role: "President", description: "The best product manager anyone could ask for, except maybe for himself.", image: "/team/Eason.png", superpower: "PR commenting", supercolor: "#E5A212" },
    { name: "Jenny Jin", role: "Marketing Girl", description: "Just do that, no do this, you're doing it wrong...", image: "/team/Jenny.png", superpower: "Always hitting red lights 🫰", supercolor: "#33FFF3" },
    { name: "Naman Sonawane", role: "Frontend Labourer", description: "I'm just here for the free food", image: "/team/Naman.png", superpower: "Can code in his sleep", supercolor: "#FF0000" },
    { name: "Victoria Yep", role: "Figma Warrior", description: "I think I was supposed to put a fun fact here", image: "/team/Victoria.png", superpower: "IDK :)", supercolor: "#938a10ff" },
    { name: "Peony Zuo", role: "Marketing Girl", description: "Yep! I'll talk to you face to face when I'm not faceplanting", image: "/team/Peony.png", superpower: "I can eat an entire bag of sour patch kids in 5 minutes", supercolor: "#2f00ffff" },
    { name: "Minsun Kim", role: "Everything", description: "I rlly want to play pokopia", image: "/team/Minsun.png", superpower: "Memory of a goldfish 🐠", supercolor: "#2f00ffff" },
    { name: "Neel Shah", role: "Backend Guru", description: "Testing and console logs are for cowards, just force push.", image: "/team/Neel.png", superpower: "Crashing prod", supercolor: "#067e2aff" },
];

/**
 * Slot properties based on Figma design.
 */
const SLOTS = [
    { w: 368, h: 422, x: 0, opacity: 1, roleSize: 40, nameSize: 32, avatarSize: 123, descSize: 22 },
    { w: 261, h: 299, x: 384, opacity: 0.81, roleSize: 24, nameSize: 24, avatarSize: 87, descSize: 14 },
    { w: 192, h: 220, x: 661, opacity: 0.58, roleSize: 20, nameSize: 20, avatarSize: 64, descSize: 11 },
    { w: 148, h: 170, x: 869, opacity: 0.35, roleSize: 15, nameSize: 14, avatarSize: 50, descSize: 8 },
    { w: 119, h: 136, x: 1033, opacity: 0.16, roleSize: 13, nameSize: 13, avatarSize: 40, descSize: 6 },
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
    const isMain = targetSpec.w > 200;
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
                    whiteSpace: "normal",
                    overflowWrap: "break-word",
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
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        transition: "font-size 0.8s ease, line-height 0.8s ease",
                    }}
                >
                    {member.name}
                </p>
            </div>
            {member.description && (
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
                    <p
                        style={{
                            fontFamily: "var(--font-righteous)",
                            fontSize: targetSpec.descSize || 22,
                            color: "#000000",
                            textTransform: "uppercase",
                            width: "100%",
                            margin: 0,
                            transition: "font-size 0.8s ease, opacity 0.8s ease",
                        }}
                    >
                        {member.description}
                    </p>
                    {member.superpower && (
                        <p
                            style={{
                                fontFamily: "var(--font-righteous)",
                                fontSize: targetSpec.descSize ? Math.max(targetSpec.descSize - 4, 6) : 18,
                                color: member.supercolor || "#000",
                                textTransform: "uppercase",
                                width: "100%",
                                margin: 0,
                                transition: "font-size 0.8s ease, opacity 0.8s ease, color 0.8s ease",
                            }}
                        >
                            <span style={{color: '#284062'}}>SUPERPOWER:</span> {member.superpower}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}

export default function ContactUs() {
    const [offset, setOffset] = useState(0);
    const [slots, setSlots] = useState(SLOTS);
    const [exitX, setExitX] = useState(EXIT_X);
    const [enterX, setEnterX] = useState(ENTER_X);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const w = window.innerWidth;
            setIsMobile(w < 768);
            setIsTablet(w >= 768 && w < 1100);

            if (w < 768) {
                // Mobile Slots
                const containerW = w - 40;
                const cardW = Math.min(containerW - 80, 240); 
                const cardH = 340; 
                const centerX = (containerW - cardW) / 2;
                const mobileSlots = [{ w: cardW, h: cardH, x: centerX, opacity: 1, roleSize: 22, nameSize: 18, avatarSize: 70, descSize: 15 }];
                for (let i = 1; i < TEAM.length; i++) {
                    mobileSlots.push({ w: cardW, h: cardH, x: w + 100 * i, opacity: 0, roleSize: 8, nameSize: 8, avatarSize: 20, descSize: 0 });
                }
                setSlots(mobileSlots);
                setExitX(-w);
                setEnterX(w * 2);
            } else if (w < 1100) {
                // Tablet Slots
                const baseTabletSlots = [
                    { w: 320, h: 400, x: 0, opacity: 1, roleSize: 36, nameSize: 30, avatarSize: 110, descSize: 18 },
                    { w: 220, h: 280, x: 340, opacity: 0.8, roleSize: 22, nameSize: 22, avatarSize: 80, descSize: 12 },
                    { w: 160, h: 200, x: 580, opacity: 0.5, roleSize: 18, nameSize: 18, avatarSize: 60, descSize: 10 },
                    { w: 120, h: 150, x: 760, opacity: 0.2, roleSize: 14, nameSize: 14, avatarSize: 45, descSize: 8 },
                    { w: 120, h: 150, x: 900, opacity: 0.1, roleSize: 14, nameSize: 14, avatarSize: 45, descSize: 6 },
                ];
                const tabletSlots = [...baseTabletSlots];
                for (let i = tabletSlots.length; i < TEAM.length; i++) {
                    const prev = tabletSlots[i - 1];
                    tabletSlots.push({
                        w: Math.max(prev.w * 0.75, 20),
                        h: Math.max(prev.h * 0.75, 20),
                        x: prev.x + prev.w + 16,
                        opacity: Math.max(prev.opacity * 0.7, 0.01),
                        roleSize: Math.max(prev.roleSize * 0.8, 6),
                        nameSize: Math.max(prev.nameSize * 0.8, 6),
                        avatarSize: Math.max(prev.avatarSize * 0.75, 10),
                        descSize: Math.max(prev.descSize * 0.8, 4),
                    });
                }
                setSlots(tabletSlots);
                setExitX(-400);
                setEnterX(1500);
            } else {
                // Desktop Slots
                const desktopSlots = [...SLOTS];
                for (let i = desktopSlots.length; i < TEAM.length; i++) {
                    const prev = desktopSlots[i - 1];
                    desktopSlots.push({
                        w: Math.max(prev.w * 0.75, 20),
                        h: Math.max(prev.h * 0.75, 20),
                        x: prev.x + prev.w + 16,
                        opacity: Math.max(prev.opacity * 0.7, 0.01),
                        roleSize: Math.max(prev.roleSize * 0.8, 6),
                        nameSize: Math.max(prev.nameSize * 0.8, 6),
                        avatarSize: Math.max(prev.avatarSize * 0.75, 10),
                        descSize: Math.max(prev.descSize * 0.8, 4),
                    });
                }
                setSlots(desktopSlots);
                setExitX(EXIT_X);
                setEnterX(desktopSlots[desktopSlots.length - 1].x + 300);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        const interval = setInterval(() => {
            setOffset(o => o + 1);
        }, 2000); 
        return () => {
            window.removeEventListener("resize", handleResize);
            clearInterval(interval);
        };
    }, []);


    return (
        <div style={{ width: "100%", maxWidth: 1440, margin: "0 auto", paddingLeft: isMobile ? 20 : 56, paddingRight: isMobile ? 20 : 56, overflow: "hidden", boxSizing: "border-box" }}>
            {/* TOP SECTION */}
            <div style={{ position: "relative", marginBottom: 40, width: "100%", border: "10px solid #FFFEF5", borderRadius: 16 }}>
                <div style={{ 
                    position: "relative", 
                    zIndex: 1, 
                    padding: isMobile ? "32px 0px" : "48px", 
                    width: "100%",
                }}>
                    <h2 style={{ fontFamily: "var(--font-righteous)", fontSize: isMobile ? 40 : 64, color: "#FFFFFF", textTransform: "uppercase", marginBottom: isMobile ? 24 : 40, paddingLeft: isMobile ? (slots[0]?.x || 20) : 0 }}>Meet the team</h2>
                    
                    <div style={{ position: "relative", height: isMobile ? 420 : 430, width: "100%", overflow: isMobile ? "hidden" : "visible" }}>
                        {/* Render TEAM.length + 1 cards: 1 exiting, TEAM.length visible, 1 entering */}
                        {[...Array(TEAM.length + 1)].map((_, i) => {
                            const cardIndex = offset + i - 1; 
                            const member = TEAM[((cardIndex % TEAM.length) + TEAM.length) % TEAM.length];
                            
                            const slotIdx = i - 1; 

                            let spec: CardSpec;
                            let x: number;

                            if (slotIdx === -1) {
                                spec = { ...slots[0], w: 0, opacity: 0 };
                                x = exitX;
                            } else if (slotIdx >= 0 && slotIdx < 5) {
                                spec = slots[slotIdx];
                                x = slots[slotIdx].x;
                            } else {
                                spec = { ...slots[4], w: 0, opacity: 0 };
                                x = enterX;
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

            {/* BOTTOM SECTION - Separated by marginBottom on top box */}
            <div style={{ position: "relative", border: "10px solid #FFFEF5", borderRadius: 16 }}>
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
