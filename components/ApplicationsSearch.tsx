"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/Input";
import { Checkbox } from "@/components/Checkbox";

const HACKATHON_OPTIONS = [
    { label: "All", value: "" },
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4+", value: "4plus" },
];

export default function ApplicationsSearch({
    query,
    sort,
    hackathons,
}: {
    query: string;
    page: number;
    sort: string;
    hackathons: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(query);
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
    const [rsvpParam, setRsvpParam] = useState(searchParams.get("rsvp") === "true");
    const [sortParam, setSortParam] = useState(sort);
    const [hackathonsParam, setHackathonsParam] = useState(hackathons);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 250);
        return () => clearTimeout(handler);
    }, [searchQuery]);

    const buildQueryString = (overrides: Record<string, string> = {}) => {
        const base: Record<string, string> = {
            q: debouncedQuery,
            rsvp: rsvpParam.toString(),
            sort: sortParam,
            hackathons: hackathonsParam,
        };
        return new URLSearchParams({ ...base, ...overrides }).toString();
    };

    // Navigate on debounced search query change
    useEffect(() => {
        if (changed) {
            router.push(`?page=1&${buildQueryString()}`, { scroll: false });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedQuery]);

    const handleRsvpChange = (checked: boolean) => {
        setRsvpParam(checked);
        router.push(`?page=1&${buildQueryString({ rsvp: checked.toString() })}`, { scroll: false });
    };

    const handleSortChange = (value: string) => {
        // Toggle: if already selected, deselect
        const newSort = sortParam === value ? "" : value;
        setSortParam(newSort);
        router.push(`?page=1&${buildQueryString({ sort: newSort })}`, { scroll: false });
    };

    const handleHackathonsChange = (value: string) => {
        setHackathonsParam(value);
        router.push(`?page=1&${buildQueryString({ hackathons: value })}`, { scroll: false });
    };

    return (
        <div className="space-y-6">
            {/* Search input */}
            <Input
                label="Search"
                placeholder="Search for an applicant"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setSearchQuery(e.target.value);
                    setChanged(true);
                }}
            />

            {/* Filter row */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 items-start">

                {/* Show RSVPed only */}
                <div className="flex items-center gap-2">
                    <label htmlFor="rsvp" className="text-gray-700 font-medium text-sm">Show RSVPed only:</label>
                    <Checkbox
                        id="rsvp"
                        name="rsvp"
                        defaultChecked={searchParams.get("rsvp") === "true"}
                        onCheckedChange={handleRsvpChange}
                    />
                </div>

                {/* Sort toggles */}
                <div className="flex items-center gap-3">
                    <span className="text-gray-700 font-medium text-sm">Sort:</span>
                    <button
                        onClick={() => handleSortChange("submitted_first")}
                        className={`text-sm px-3 py-1.5 rounded-lg border font-medium transition-all duration-150 ${
                            sortParam === "submitted_first"
                                ? "bg-[var(--neon-yellow)] border-[var(--neon-yellow)] text-[#030712]"
                                : "border-gray-600 text-gray-400 bg-white/5 hover:bg-white/10"
                        }`}
                    >
                        Submitted first
                    </button>
                    <button
                        onClick={() => handleSortChange("unrated_first")}
                        className={`text-sm px-3 py-1.5 rounded-lg border font-medium transition-all duration-150 ${
                            sortParam === "unrated_first"
                                ? "bg-[var(--neon-yellow)] border-[var(--neon-yellow)] text-[#030712]"
                                : "border-gray-600 text-gray-400 bg-white/5 hover:bg-white/10"
                        }`}
                    >
                        Unrated first
                    </button>
                </div>

                {/* Hackathons attended filter */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-700 font-medium text-sm">Hackathons attended:</span>
                    <div className="flex gap-1">
                        {HACKATHON_OPTIONS.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleHackathonsChange(opt.value)}
                                className={`text-sm px-2.5 py-1.5 rounded-lg border font-medium transition-all duration-150 ${
                                    hackathonsParam === opt.value
                                        ? "bg-[var(--neon-yellow)] border-[var(--neon-yellow)] text-[#030712]"
                                        : "border-gray-600 text-gray-400 bg-white/5 hover:bg-white/10"
                                }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}