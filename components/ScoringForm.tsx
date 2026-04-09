"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Icon } from "@iconify/react";

const SCORE_LABELS: Record<number, string> = {
    1: "Strong No",
    2: "No",
    3: "Lean No",
    4: "Neutral",
    5: "Lean Yes",
    6: "Yes",
    7: "Strong Yes",
};

const SCORE_COLORS: Record<number, string> = {
    1: "border-red-600 text-red-500",
    2: "border-red-500 text-red-400",
    3: "border-orange-500 text-orange-400",
    4: "border-yellow-500 text-yellow-400",
    5: "border-lime-500 text-lime-400",
    6: "border-green-500 text-green-400",
    7: "border-emerald-500 text-emerald-400",
};

const SCORE_ACTIVE_COLORS: Record<number, string> = {
    1: "bg-red-600 border-red-600 text-white",
    2: "bg-red-500 border-red-500 text-white",
    3: "bg-orange-500 border-orange-500 text-white",
    4: "bg-yellow-500 border-yellow-500 text-white",
    5: "bg-lime-500 border-lime-500 text-white",
    6: "bg-green-500 border-green-500 text-white",
    7: "bg-emerald-500 border-emerald-500 text-white",
};

export default function ScoringForm({ applicationId, initialScore }: {
    applicationId: number;
    initialScore: number | null;
}) {
    const [selected, setSelected] = useState<number | null>(initialScore);
    useEffect(() => { setSelected(initialScore); }, [initialScore]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submitScore = async (score: number) => {
        const prevScore = selected;
        setSelected(score);
        setLoading(true);

        const formData = new FormData();
        formData.append("applicationId", applicationId.toString());
        formData.append("score", score.toString());

        const response = await fetch("/api/application/score", {
            method: "POST",
            body: formData,
        });

        setLoading(false);

        if (response.ok) {
            router.refresh();
            toast({ variant: "success", title: "Score saved", description: `Scored ${score}/7 — ${SCORE_LABELS[score]}` });
        } else {
            setSelected(prevScore);
            toast({ variant: "error", title: "Error", description: "Failed to save score" });
        }
    };

    return (
        <div className="mt-8">
            <div className="flex items-center gap-3 mb-4">
                <h1 className="text-xl font-semibold">Your Score</h1>
                {loading && <Icon icon="eos-icons:loading" className="text-xl animate-spin text-gray-400"/>}
                {selected !== null && !loading && (
                    <span className="text-gray-400 font-normal text-base">
                        {selected}/7 — {SCORE_LABELS[selected]}
                    </span>
                )}
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((score) => (
                    <button
                        key={score}
                        onClick={() => submitScore(score)}
                        disabled={loading}
                        title={SCORE_LABELS[score]}
                        className={`border rounded-lg py-3 sm:py-4 font-bold text-lg transition-all duration-150 active:scale-95 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed
                            ${selected === score
                                ? SCORE_ACTIVE_COLORS[score]
                                : `bg-transparent ${SCORE_COLORS[score]} hover:bg-white/5`
                            }`}
                    >
                        {score}
                    </button>
                ))}
            </div>
        </div>
    );
}
