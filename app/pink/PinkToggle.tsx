"use client";

import { useState } from "react";

export default function PinkToggle({ initialActive }: { initialActive: boolean }) {
    const [active, setActive] = useState(initialActive);
    const [loading, setLoading] = useState(false);

    const toggle = async () => {
        setLoading(true);
        const res = await fetch("/pink/toggle-api", { method: "POST" });
        const data = await res.json();
        setActive(data.active);
        if (data.active) {
            document.documentElement.classList.add("pink-theme");
        } else {
            document.documentElement.classList.remove("pink-theme");
        }
        setLoading(false);
    };

    return (
        <>
            <p
                className="text-2xl font-bold transition-colors duration-300"
                style={{ color: active ? "#ff9ecd" : "#9ca3af" }}
            >
                {active ? "Pink mode activated!" : "Pink mode deactivated :("}
            </p>
            <button
                onClick={toggle}
                disabled={loading}
                aria-label="Toggle pink mode"
                className="relative inline-flex items-center cursor-pointer disabled:opacity-50"
            >
                <div
                    className={`w-16 h-8 rounded-full transition-colors duration-300 ${active ? "bg-[#ff9ecd]" : "bg-gray-600"}`}
                >
                    <div
                        className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? "translate-x-9" : "translate-x-1"}`}
                    />
                </div>
            </button>
        </>
    );
}
