"use client";

/**
 * DEV ONLY — Installs a mock NDEFReader on window so the NFC badge + admin scan
 * pages work in any desktop browser (no Android / real NFC hardware needed).
 *
 * The "chip" is just localStorage["nfc-mock-tag"].
 *
 * Write flow:  NFCBadgeClient  → NDEFReader.write()  → saves to localStorage
 * Scan  flow:  AdminNFCScanner → NDEFReader.scan()   → polls localStorage every 1 s,
 *              fires onreading when a value is present and the "Trigger scan" button is clicked.
 */

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const STORAGE_KEY = "nfc-mock-tag";

// ── Install mock NDEFReader on window ────────────────────────────────────────
function installMock() {
    if (typeof window === "undefined") return;
    if ("NDEFReader" in window) return; // real NFC already present

    class MockNDEFReader extends EventTarget {
        onreading: ((e: unknown) => void) | null = null;
        onreadingerror: ((e: unknown) => void) | null = null;

        private abortSignal: AbortSignal | null = null;
        private scanInterval: ReturnType<typeof setInterval> | null = null;

        async write(message: { records: { recordType: string; data: string }[] }) {
            const record = message.records[0];
            if (!record) throw new Error("No records");
            // simulate a short NFC write delay
            await new Promise(r => setTimeout(r, 600));
            localStorage.setItem(STORAGE_KEY, record.data);
            // Dispatch a custom event so the dev panel can update
            window.dispatchEvent(new CustomEvent("nfc-mock-written", { detail: record.data }));
        }

        async scan({ signal }: { signal?: AbortSignal } = {}) {
            this.abortSignal = signal ?? null;

            if (signal) {
                signal.addEventListener("abort", () => {
                    if (this.scanInterval) clearInterval(this.scanInterval);
                });
            }

            // Listen for manual trigger from the dev panel
            const triggerHandler = () => {
                const value = localStorage.getItem(STORAGE_KEY);
                if (!value) return;
                const event = {
                    message: {
                        records: [
                            {
                                recordType: "text",
                                encoding: "utf-8",
                                // Uint8Array so the real decode path works
                                data: new TextEncoder().encode(value),
                            },
                        ],
                    },
                    serialNumber: "mock-serial",
                };
                if (this.onreading) this.onreading(event);
                this.dispatchEvent(Object.assign(new Event("reading"), event));
            };

            window.addEventListener("nfc-mock-trigger", triggerHandler);
            if (signal) {
                signal.addEventListener("abort", () =>
                    window.removeEventListener("nfc-mock-trigger", triggerHandler)
                );
            }
        }
    }

    // @ts-expect-error intentional global override
    window.NDEFReader = MockNDEFReader;
    console.info("[NFC Mock] NDEFReader installed. Chip stored in localStorage['nfc-mock-tag'].");
}

// ── Dev panel UI ─────────────────────────────────────────────────────────────
export function NFCDevMock() {
    const [tagValue, setTagValue] = useState<string>("");
    const [open, setOpen] = useState(false);
    const [customValue, setCustomValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        installMock();

        const refresh = () => setTagValue(localStorage.getItem(STORAGE_KEY) ?? "");
        refresh();

        window.addEventListener("nfc-mock-written", refresh);
        window.addEventListener("storage", refresh);
        return () => {
            window.removeEventListener("nfc-mock-written", refresh);
            window.removeEventListener("storage", refresh);
        };
    }, []);

    const triggerScan = () => {
        window.dispatchEvent(new CustomEvent("nfc-mock-trigger"));
    };

    const clearTag = () => {
        localStorage.removeItem(STORAGE_KEY);
        setTagValue("");
    };

    const setManual = () => {
        if (!customValue.trim()) return;
        localStorage.setItem(STORAGE_KEY, customValue.trim());
        setTagValue(customValue.trim());
        setCustomValue("");
        window.dispatchEvent(new CustomEvent("nfc-mock-written", { detail: customValue.trim() }));
    };

    return (
        <div className="fixed bottom-4 left-4 z-[9999] font-mono text-xs">
            {open ? (
                <div className="bg-gray-900 border border-yellow-400 text-yellow-300 rounded-xl shadow-2xl p-4 w-80 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-yellow-400 text-sm flex items-center gap-1">
                            <Icon icon="fluent:nfc-28-filled" className="text-base" /> NFC Dev Mock
                        </span>
                        <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-white">
                            <Icon icon="fluent:dismiss-12-regular" />
                        </button>
                    </div>

                    {/* Current chip value */}
                    <div>
                        <p className="text-gray-400 mb-1">Current chip value:</p>
                        {tagValue ? (
                            <code className="block bg-gray-800 rounded p-2 break-all text-green-400 leading-relaxed">
                                {tagValue}
                            </code>
                        ) : (
                            <p className="text-gray-600 italic">Empty (no tag written)</p>
                        )}
                    </div>

                    {/* Trigger scan */}
                    <button
                        onClick={triggerScan}
                        disabled={!tagValue}
                        className="flex items-center justify-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-40 text-white rounded-lg py-2 transition-colors"
                    >
                        <Icon icon="fluent:nfc-28-filled" />
                        Trigger scan (simulate tap)
                    </button>

                    {/* Manual ID override */}
                    <div className="flex flex-col gap-1">
                        <p className="text-gray-400">Set chip value manually:</p>
                        <div className="flex gap-2">
                            <input
                                ref={inputRef}
                                value={customValue}
                                onChange={e => setCustomValue(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && setManual()}
                                placeholder="paste encrypted ID…"
                                className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400"
                            />
                            <button
                                onClick={setManual}
                                className="bg-yellow-500 hover:bg-yellow-400 text-black rounded px-2 py-1 font-bold"
                            >
                                Set
                            </button>
                        </div>
                    </div>

                    {/* Clear */}
                    <button
                        onClick={clearTag}
                        className="text-red-400 hover:text-red-300 underline text-xs self-start"
                    >
                        Clear chip
                    </button>

                    <p className="text-gray-600 leading-relaxed">
                        1. Go to <span className="text-white">/dashboard/qrcode</span> and click <em>Write to NFC Tag</em> — it will auto-fill the chip above.<br />
                        2. Go to <span className="text-white">admin/scan</span>, select an event, Start Scanning, then click <em>Trigger scan</em> above.
                    </p>
                </div>
            ) : (
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 bg-gray-900 border border-yellow-400 text-yellow-400 rounded-xl px-3 py-2 shadow-lg hover:bg-gray-800 transition-colors"
                >
                    <Icon icon="fluent:nfc-28-filled" className="text-base" />
                    NFC Mock
                    {tagValue && <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />}
                </button>
            )}
        </div>
    );
}
