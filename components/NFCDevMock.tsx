"use client";

import { useEffect, useState } from "react";

export function NFCDevMock() {
    const [chip, setChip] = useState<string>("");
    const [input, setInput] = useState("");
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem("nfc-mock-tag") ?? "";
        setChip(stored);
        setInput(stored);

        class MockNDEFReader {
            onreading: ((e: unknown) => void) | null = null;

            async write(msg: { records: { recordType: string; data: string }[] }) {
                const text = msg.records.find(r => r.recordType === "text")?.data ?? "";
                localStorage.setItem("nfc-mock-tag", text);
                setChip(text);
                setInput(text);
                console.log("[NFC Mock] Written:", text);
            }

            async scan({ signal }: { signal: AbortSignal }) {
                const handler = (e: Event) => {
                    const val = (e as CustomEvent).detail ?? localStorage.getItem("nfc-mock-tag") ?? "";
                    this.onreading?.({
                        message: {
                            records: [{ recordType: "text", encoding: "utf-8", data: new TextEncoder().encode(val) }],
                        },
                    });
                };
                window.addEventListener("nfc-mock-trigger", handler);
                signal.addEventListener("abort", () => window.removeEventListener("nfc-mock-trigger", handler));
            }
        }

        // @ts-expect-error mock override
        window.NDEFReader = MockNDEFReader;
        setInstalled(true);

        const onWritten = (e: Event) => {
            const val = (e as CustomEvent).detail ?? "";
            localStorage.setItem("nfc-mock-tag", val);
            setChip(val);
            setInput(val);
        };
        window.addEventListener("nfc-mock-written", onWritten);
        return () => window.removeEventListener("nfc-mock-written", onWritten);
    }, []);

    const trigger = () => {
        window.dispatchEvent(new CustomEvent("nfc-mock-trigger", { detail: localStorage.getItem("nfc-mock-tag") ?? "" }));
    };

    const saveChip = () => {
        localStorage.setItem("nfc-mock-tag", input);
        setChip(input);
    };

    const clear = () => {
        localStorage.removeItem("nfc-mock-tag");
        setChip("");
        setInput("");
    };

    if (!installed) return null;

    return (
        <div className="fixed bottom-4 left-4 z-[9999] bg-gray-900 border border-yellow-500 text-white text-xs rounded-xl p-3 shadow-2xl w-56 flex flex-col gap-2">
            <p className="font-bold text-yellow-400">🔧 NFC Mock</p>
            <p className="text-gray-400">Chip: <span className="text-white font-mono">{chip || "(empty)"}</span></p>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Set chip value"
                className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-xs w-full"
            />
            <div className="flex gap-1">
                <button onClick={saveChip} className="flex-1 bg-blue-700 hover:bg-blue-600 rounded px-2 py-1">Set</button>
                <button onClick={trigger} className="flex-1 bg-green-700 hover:bg-green-600 rounded px-2 py-1">Trigger</button>
                <button onClick={clear} className="flex-1 bg-red-800 hover:bg-red-700 rounded px-2 py-1">Clear</button>
            </div>
        </div>
    );
}
