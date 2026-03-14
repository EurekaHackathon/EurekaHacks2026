"use client";

// Seeded LCG random — deterministic on both server and client, no hydration mismatch.
function makeStars(count: number, seed: number, spread: number): string {
    let s = seed >>> 0;
    const rand = () => {
        s = (Math.imul(1664525, s) + 1013904223) >>> 0;
        return s / 0xffffffff;
    };
    const out: string[] = [];
    for (let i = 0; i < count; i++) {
        const x = Math.floor(rand() * spread);
        const y = Math.floor(rand() * spread);
        const alpha = 0.4 + rand() * 0.6;
        out.push(`${x}px ${y}px rgba(255,255,255,${alpha.toFixed(2)})`);
    }
    return out.join(",");
}

// Computed once at module level — never recalculated.
const SPREAD = 3000;
const smallStars  = makeStars(800, 0xdeadbeef, SPREAD);
const mediumStars = makeStars(250, 0xcafebabe, SPREAD);
const largeStars  = makeStars(80,  0xfeedface, SPREAD);

export function StarField() {
    return (
        <div
            aria-hidden
            className="fixed inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        >
            {/* Small stars — fast twinkle */}
            <div style={{
                position: "absolute", top: 0, left: 0,
                width: 1, height: 1, borderRadius: "50%",
                boxShadow: smallStars,
                animation: "starTwinkle 3s ease-in-out infinite alternate",
                willChange: "opacity",
                transform: "translateZ(0)",
            }} />
            {/* Medium stars — medium twinkle */}
            <div style={{
                position: "absolute", top: 0, left: 0,
                width: 2, height: 2, borderRadius: "50%",
                boxShadow: mediumStars,
                animation: "starTwinkle 5s ease-in-out infinite alternate-reverse",
                willChange: "opacity",
                transform: "translateZ(0)",
            }} />
            {/* Large stars — slow twinkle */}
            <div style={{
                position: "absolute", top: 0, left: 0,
                width: 3, height: 3, borderRadius: "50%",
                boxShadow: largeStars,
                animation: "starTwinkle 7s ease-in-out infinite alternate",
                willChange: "opacity",
                transform: "translateZ(0)",
            }} />
        </div>
    );
}
