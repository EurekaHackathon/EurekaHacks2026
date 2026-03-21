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
    { name: "Anvi Nambiar", role: "Marketing", description: "I hate spiders", image: "/team/Anvi.png", superpower: "Magic", supercolor: "#3357FF" },
    { name: "Alan Liu", role: "Backend Guru", description: "Thou of much hair must bow before thy of little hair", image: "/team/Alan.png", superpower: "5 cups of coffee a day", supercolor: "#F333FF" },
    { name: "Eason Huang", role: "President", description: "The best product manager anyone could ask for, except maybe for himself.", image: "/team/Eason.png", superpower: "PR commenting", supercolor: "#E5A212" },
    { name: "Jenny Jin", role: "Marketing Girl", description: "Just do that, no do this, you're doing it wrong...", image: "/team/Jenny.png", superpower: "Always hitting red lights 🫰", supercolor: "#33FFF3" },
    { name: "Naman Sonawane", role: "Frontend Labourer", description: "I'm just here for the free food", image: "/team/Naman.png", superpower: "Can code in his sleep", supercolor: "#FF0000" },
    { name: "Victoria Yep", role: "Figma Warrior", description: "I think I was supposed to put a fun fact here", image: "/team/Victoria.png", superpower: "IDK :)", supercolor: "#938a10ff" },
    { name: "Peony Zuo", role: "Marketing Girl", description: "Yep! I'll talk to you face to face when I'm not faceplanting", image: "/team/Peony.png", superpower: "I can eat an entire bag of sour patch kids in 5 minutes", supercolor: "#2f00ffff" },
    { name: "Minsun Kim", role: "Everything", description: "I rlly want to play pokopia", image: "/team/Minsun.png", superpower: "Memory of a goldfish 🐠", supercolor: "#2f00ffff" },
    { name: "Neel Shah", role: "Backend Guru", description: "Slightly red-green colourblind", image: "/team/Neel.png", superpower: "Can center a div without chatgpt", supercolor: "#067e2aff" },
    { name: "Margret Liu", role: "Sketchbook Goat", description: "🕷️ 🔫 🧍‍♀️", image: "/team/Margret.png", superpower: "Forcing people to kill spiders for me", supercolor: "#30dcffff" },
    { name: "Deming Chen", role: "Senior Trend Chaser", description: "Testing and console logs are for cowards, just force push.", image: "/team/Deming.png", superpower: "Can sell water to a fish", supercolor: "#ef720cff" },
    { name: "Daniel Xu", role: "I Got It Guy", description: "Testing and console logs are for cowards, just force push.", image: "/team/DanielXu.png", superpower: "Crashing prod", supercolor: "#61008eff" },
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
                setSlots([
                    { w: cardW, h: cardH, x: centerX, opacity: 1, roleSize: 22, nameSize: 18, avatarSize: 70, descSize: 15 },
                    { w: cardW, h: cardH, x: w + 100, opacity: 0, roleSize: 8, nameSize: 8, avatarSize: 20, descSize: 0 },
                    { w: cardW, h: cardH, x: w + 200, opacity: 0, roleSize: 8, nameSize: 8, avatarSize: 20, descSize: 0 },
                    { w: cardW, h: cardH, x: w + 300, opacity: 0, roleSize: 8, nameSize: 8, avatarSize: 20, descSize: 0 },
                    { w: cardW, h: cardH, x: w + 400, opacity: 0, roleSize: 8, nameSize: 8, avatarSize: 20, descSize: 0 },
                ]);
                setExitX(-w);
                setEnterX(w * 2);
            } else if (w < 1100) {
                // Tablet Slots
                setSlots([
                    { w: 320, h: 400, x: 0, opacity: 1, roleSize: 36, nameSize: 30, avatarSize: 110, descSize: 18 },
                    { w: 220, h: 280, x: 340, opacity: 0.8, roleSize: 22, nameSize: 22, avatarSize: 80, descSize: 12 },
                    { w: 160, h: 200, x: 580, opacity: 0.5, roleSize: 18, nameSize: 18, avatarSize: 60, descSize: 10 },
                    { w: 120, h: 150, x: 760, opacity: 0.2, roleSize: 14, nameSize: 14, avatarSize: 45, descSize: 8 },
                    { w: 120, h: 150, x: 900, opacity: 0.1, roleSize: 14, nameSize: 14, avatarSize: 45, descSize: 6 },
                ]);
                setExitX(-400);
                setEnterX(1500);
            } else {
                // Desktop Slots - Scale up proportionally based on available width!
                const scale = Math.max(1, w / 1440);
                
                const desktopSlots = SLOTS.map(slot => ({
                    ...slot,
                    w: slot.w * scale,
                    h: slot.h * scale,
                    x: slot.x * scale,
                    roleSize: slot.roleSize * scale,
                    nameSize: slot.nameSize * scale,
                    avatarSize: slot.avatarSize * scale,
                    descSize: slot.descSize * scale,
                }));
                
                setSlots(desktopSlots);
                setExitX(EXIT_X * scale);
                setEnterX(desktopSlots[4].x + desktopSlots[4].w + 100 * scale);
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
        <div className="w-screen p-12 max-sm:p-4" style={{ overflow: "hidden", boxSizing: "border-box" }}>
            {/* TOP SECTION */}
            <div className="shadow-2xl" style={{ position: "relative", marginBottom: 40, width: "100%", border: "12px solid white", borderRadius: 0 }}>
                <div style={{ 
                    position: "relative", 
                    zIndex: 1, 
                    padding: isMobile ? "32px 0px" : "48px", 
                    width: "100%",
                }}>
                    <h2 style={{ fontFamily: "var(--font-righteous)", fontSize: isMobile ? 40 : 64, color: "#FFFFFF", textTransform: "uppercase", marginBottom: isMobile ? 24 : 40, paddingLeft: isMobile ? (slots[0]?.x || 20) : 0 }}>Meet the team</h2>
                    
                    <div style={{ position: "relative", height: isMobile ? 420 : (slots[0]?.h ? slots[0].h + 10 : 430), width: "100%", overflow: isMobile ? "hidden" : "visible" }}>
                        {/* Render 7 cards: 1 exiting, 5 visible, 1 entering */}
                        {[...Array(7)].map((_, i) => {
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
