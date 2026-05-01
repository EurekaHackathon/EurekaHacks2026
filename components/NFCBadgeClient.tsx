"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { toast } from "@/hooks/use-toast";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SearchResult { userId: number; firstName: string; lastName: string; status: string; }

interface LookupResult {
    userId: number;
    firstName: string;
    lastName: string;
    "dinner-day-1": boolean;
    "breakfast-day-2": boolean;
    "lunch-day-2": boolean;
    "dinner-day-2": boolean;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const ASSIGNMENTS_KEY = "nfc-assignments";

function saveAssignment(chipNumber: number, userId: number, name: string) {
    try {
        const data = JSON.parse(localStorage.getItem(ASSIGNMENTS_KEY) ?? "{}");
        data[chipNumber] = { userId, name };
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(data));
    } catch { /* ignore */ }
}

async function writeNFC(value: string): Promise<void> {
    if (!("NDEFReader" in window)) throw new Error("Use Android Chrome for NFC.");
    // @ts-expect-error NDEFReader not in TS lib
    const ndef = new NDEFReader();
    await ndef.write({ records: [{ recordType: "text", data: value, lang: "en" }] });
}

function useNFCScanner(onRead: (val: string) => void) {
    const abortRef = useRef<AbortController | null>(null);
    const [scanning, setScanning] = useState(false);
    const [supported, setSupported] = useState<boolean | null>(null);

    useEffect(() => { setSupported("NDEFReader" in window); }, []);

    const start = useCallback(async () => {
        if (!supported) { toast({ variant: "error", title: "NFC unavailable", description: "Use Android Chrome." }); return; }
        abortRef.current?.abort();
        const ac = new AbortController();
        abortRef.current = ac;
        try {
            // @ts-expect-error NDEFReader not in TS lib
            const ndef = new NDEFReader();
            await ndef.scan({ signal: ac.signal });
            setScanning(true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ndef.onreading = (e: any) => {
                for (const r of e.message.records) {
                    if (r.recordType === "text") {
                        onRead(new TextDecoder(r.encoding ?? "utf-8").decode(r.data));
                        break;
                    }
                }
            };
            ac.signal.addEventListener("abort", () => setScanning(false));
        } catch (err: unknown) {
            toast({ variant: "error", title: "Scan failed", description: err instanceof Error ? err.message : "Unknown error" });
            setScanning(false);
        }
    }, [supported, onRead]);

    const stop = useCallback(() => { abortRef.current?.abort(); setScanning(false); }, []);

    return { scanning, supported, start, stop };
}

const STATUS_COLORS: Record<string, string> = {
    accepted: "bg-green-100 text-green-700",
    submitted: "bg-blue-100 text-blue-700",
    rejected: "bg-red-100 text-red-700",
    waitlisted: "bg-yellow-100 text-yellow-700",
    unsubmitted: "bg-gray-100 text-gray-500",
};

// ── Read Tab ──────────────────────────────────────────────────────────────────

const MEALS: { key: keyof LookupResult; label: string }[] = [
    { key: "dinner-day-1", label: "Dinner Day 1" },
    { key: "breakfast-day-2", label: "Breakfast Day 2" },
    { key: "lunch-day-2", label: "Lunch Day 2" },
    { key: "dinner-day-2", label: "Dinner Day 2" },
];

function ReadTab() {
    const [result, setResult] = useState<LookupResult | null>(null);
    const [loading, setLoading] = useState(false);

    const onChip = useCallback(async (idStr: string) => {
        setLoading(true);
        setResult(null);
        try {
            const res = await fetch(`/api/nfc/lookup?chip=${encodeURIComponent(idStr)}`);
            if (!res.ok) { toast({ variant: "error", title: "Not found", description: `Chip ${idStr}` }); return; }
            setResult(await res.json());
        } catch {
            toast({ variant: "error", title: "Lookup failed" });
        } finally { setLoading(false); }
    }, []);

    const { scanning, supported, start, stop } = useNFCScanner(onChip);

    return (
        <div className="flex flex-col gap-4 w-full">
            {supported === false && (
                <div className="p-3 bg-red-950 border border-red-700 rounded-lg text-red-400 text-xs flex gap-2">
                    <Icon icon="fluent:warning-24-filled" className="shrink-0 mt-0.5" /> Web NFC not supported. Use Android Chrome.
                </div>
            )}

            <div className="flex flex-col items-center gap-3 py-2">
                <div className={`flex items-center justify-center w-32 h-32 rounded-full border-4 transition-colors ${scanning ? "border-blue-400 bg-blue-950" : "border-gray-700 bg-[#0d1120]"}`}>
                    <Icon icon="fluent:nfc-28-filled" className={`text-6xl transition-colors ${scanning ? "text-blue-400 animate-pulse" : "text-gray-600"}`} />
                </div>
                <div className="flex gap-3">
                    <button onClick={start} disabled={scanning || supported === false}
                        className="flex items-center gap-1.5 bg-secondary-600 hover:bg-secondary-700 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
                        <Icon icon="fluent:play-circle-24-filled" /> Start
                    </button>
                    <button onClick={stop} disabled={!scanning}
                        className="flex items-center gap-1.5 bg-red-700 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-xl transition-colors text-sm">
                        <Icon icon="fluent:stop-24-filled" /> Stop
                    </button>
                </div>
            </div>

            {loading && (
                <div className="flex justify-center py-4">
                    <Icon icon="fluent:spinner-ios-20-filled" className="text-3xl text-gray-400 animate-spin" />
                </div>
            )}

            {result && !loading && (
                <div className="bg-[#0d1120] border border-gray-700 rounded-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-white font-bold">{result.firstName} {result.lastName}</p>
                        <p className="text-gray-500 text-xs">ID {result.userId}</p>
                    </div>
                    <div className="flex flex-col divide-y divide-gray-800">
                        {MEALS.map(m => {
                            const checked = result[m.key] as boolean;
                            return (
                                <label key={String(m.key)} className="flex items-center gap-3 px-4 py-3 cursor-default">
                                    <input type="checkbox" readOnly checked={checked}
                                        className="w-4 h-4 accent-secondary-500 cursor-default"
                                    />
                                    <span className="text-gray-300 text-sm">{m.label}</span>
                                </label>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Create Tab ────────────────────────────────────────────────────────────────

function CreateTab() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);
    const [searching, setSearching] = useState(false);
    const [selected, setSelected] = useState<SearchResult | null>(null);
    const [chipNumber, setChipNumber] = useState("");
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const debounce = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounce.current) clearTimeout(debounce.current);
        if (!query.trim()) { setResults([]); return; }
        debounce.current = setTimeout(async () => {
            setSearching(true);
            try {
                const res = await fetch(`/api/nfc/search?q=${encodeURIComponent(query)}`);
                if (res.ok) setResults(await res.json());
            } finally { setSearching(false); }
        }, 200);
    }, [query]);

    const select = (r: SearchResult) => {
        setSelected(r); setChipNumber(r.userId.toString());
        setResults([]); setQuery(""); setSaved(false);
    };
    const clear = () => { setSelected(null); setSaved(false); };

    const handleCreate = async () => {
        const num = parseInt(chipNumber);
        if (!selected || isNaN(num)) return;
        setSaving(true); setSaved(false);
        try {
            await writeNFC(num.toString());
            window.dispatchEvent(new CustomEvent("nfc-mock-written", { detail: num.toString() }));
            const res = await fetch("/api/nfc/assign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ chipNumber: num, userId: selected.userId, name: `${selected.firstName} ${selected.lastName}` }),
            });
            if (!res.ok) throw new Error(await res.text());
            saveAssignment(num, selected.userId, `${selected.firstName} ${selected.lastName}`);
            setSaved(true);
            toast({ variant: "success", title: "Done", description: `Chip #${num} → ${selected.firstName} ${selected.lastName}` });
        } catch (err: unknown) {
            toast({ variant: "error", title: "Failed", description: err instanceof Error ? err.message : "Unknown" });
        } finally { setSaving(false); }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="relative">
                <Icon icon="fluent:search-16-filled" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                <input
                    value={query}
                    onChange={e => { setQuery(e.target.value); setSelected(null); setSaved(false); }}
                    placeholder="Search name…"
                    className="w-full bg-[#0d1120] border border-gray-600 rounded-lg pl-9 pr-8 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-secondary-400 text-sm"
                />
                {searching && <Icon icon="fluent:spinner-ios-20-filled" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin" />}
            </div>

            {results.length > 0 && (
                <div className="-mt-3 bg-[#0d1120] border border-gray-700 rounded-lg overflow-hidden shadow-xl">
                    {results.map(r => (
                        <button key={r.userId} onClick={() => select(r)}
                            className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-[#1a2235] transition-colors text-left">
                            <span className="text-white text-sm">{r.firstName} {r.lastName}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[r.status] ?? "bg-gray-100 text-gray-600"}`}>{r.status}</span>
                        </button>
                    ))}
                </div>
            )}

            {query && !searching && results.length === 0 && <p className="text-sm text-gray-500">No results.</p>}

            {selected ? (
                <>
                    <div className="flex items-center gap-3 bg-[#0d1120] border border-secondary-700 rounded-xl px-4 py-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-semibold text-sm">{selected.firstName} {selected.lastName}</p>
                            <p className="text-gray-500 text-xs">ID {selected.userId}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLORS[selected.status] ?? "bg-gray-100 text-gray-600"}`}>{selected.status}</span>
                        <button onClick={clear} className="text-gray-500 hover:text-white"><Icon icon="fluent:dismiss-12-regular" /></button>
                    </div>

                    <input
                        type="number"
                        value={chipNumber}
                        onChange={e => { setChipNumber(e.target.value); setSaved(false); }}
                        placeholder="Chip number"
                        className="w-full bg-[#0d1120] border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-secondary-400 text-sm"
                    />

                    <button onClick={handleCreate} disabled={saving || !chipNumber}
                        className="flex items-center justify-center gap-2 bg-secondary-600 hover:bg-secondary-700 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors">
                        <Icon icon={saving ? "fluent:spinner-ios-20-filled" : saved ? "fluent:checkmark-circle-24-filled" : "fluent:nfc-28-filled"} className={`text-xl ${saving ? "animate-spin" : ""}`} />
                        {saving ? "Hold chip to phone…" : saved ? "Done — write again" : "Write & save"}
                    </button>
                </>
            ) : (
                <div className="flex flex-col items-center gap-2 py-8 text-gray-600">
                    <Icon icon="fluent:person-search-24-filled" className="text-5xl" />
                    <p className="text-sm">Search for a person above</p>
                </div>
            )}
        </div>
    );
}

// ── Root component ────────────────────────────────────────────────────────────

const TABS = [
    { id: "read", label: "Read", icon: "fluent:nfc-28-filled" },
    { id: "create", label: "Create", icon: "fluent:save-24-filled" },
] as const;

type TabId = typeof TABS[number]["id"];

export function NFCBadgeClient() {
    const [tab, setTab] = useState<TabId>("read");

    return (
        <div className="flex flex-col w-full mt-4">
            <div className="flex rounded-xl overflow-hidden border border-gray-700 mb-5">
                {TABS.map(t => (
                    <button key={t.id} onClick={() => setTab(t.id)}
                        className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors ${tab === t.id ? "bg-secondary-600 text-white" : "bg-[#0d1120] text-gray-500 hover:text-gray-300"}`}>
                        <Icon icon={t.icon} className="text-lg" />
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === "read" && <ReadTab />}
            {tab === "create" && <CreateTab />}
        </div>
    );
}
