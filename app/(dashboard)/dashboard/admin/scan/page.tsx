"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { GetBasicUserInfoByUserIdRow } from "@/lib/sqlc/admin_sql";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

export default function AdminNFCScanner() {
    const [currentEvent, setCurrentEvent] = useState<string | undefined>(undefined);
    const [currentUserInfo, setCurrentUserInfo] = useState<GetBasicUserInfoByUserIdRow | null>(null);
    const [scanning, setScanning] = useState(false);
    const [nfcSupported, setNfcSupported] = useState<boolean | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);
    const router = useRouter();
    const eventParam = useSearchParams().get("event");

    useEffect(() => {
        setNfcSupported("NDEFReader" in window);
    }, []);

    const handleNFCRead = useCallback(async (encryptedId: string) => {
        if (!currentEvent) {
            toast({ variant: "error", title: "Error", description: "Please select an event to scan for." });
            return;
        }
        const formData = new FormData();
        formData.append("encryptedId", encryptedId);
        formData.append("event", currentEvent);
        const response = await fetch("/api/scan-event", { method: "POST", body: formData });
        if (response.ok) {
            const userInfo = await response.json();
            setCurrentUserInfo(userInfo);
            toast({ variant: "success", title: "Success", description: "Successfully scanned user into event." });
            if (currentEvent === "check-in") setModalOpen(true);
        } else {
            const text = await response.text();
            if (response.status === 409) {
                toast({ variant: "error", title: "Error", description: "User already scanned into this event." });
            } else if (response.status === 403) {
                toast({ variant: "error", title: "Error", description: "User is not an accepted hacker." });
            } else {
                toast({ variant: "error", title: "Error", description: text });
            }
        }
    }, [currentEvent]);

    const startScanning = useCallback(async () => {
        if (!nfcSupported) {
            toast({ variant: "error", title: "NFC Not Supported", description: "Web NFC requires Android Chrome." });
            return;
        }
        try {
            abortControllerRef.current?.abort();
            const ac = new AbortController();
            abortControllerRef.current = ac;
            // @ts-expect-error NDEFReader not in TS lib
            const ndef = new NDEFReader();
            await ndef.scan({ signal: ac.signal });
            setScanning(true);
            // @ts-expect-error NDEFReader event typing
            ndef.onreading = (event) => {
                for (const record of event.message.records) {
                    if (record.recordType === "text") {
                        const decoder = new TextDecoder(record.encoding ?? "utf-8");
                        const encryptedId = decoder.decode(record.data);
                        handleNFCRead(encryptedId);
                        break;
                    }
                }
            };
            // @ts-expect-error NDEFReader event typing
            ndef.onreadingerror = () => {
                toast({ variant: "error", title: "NFC Error", description: "Could not read NFC tag." });
            };
            ac.signal.addEventListener("abort", () => setScanning(false));
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Unknown error";
            toast({ variant: "error", title: "NFC Scan Failed", description: message });
            setScanning(false);
        }
    }, [nfcSupported, handleNFCRead]);

    const stopScanning = useCallback(() => {
        abortControllerRef.current?.abort();
        setScanning(false);
    }, []);

    // restart scan listener when event changes
    useEffect(() => {
        if (scanning) {
            startScanning();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentEvent]);

    return (
        <div className="mt-8 flex justify-center gap-4">
            <div className="w-full max-w-md">
                <h1 className="text-4xl font-semibold text-gray-700">NFC Scanner</h1>
                <h2 className="text-gray-500">Choose the event, then start scanning NFC badges</h2>

                <form className="mt-4">
                    <Select
                        defaultValue={["check-in", "lunch", "dinner"].includes(eventParam ?? "") ? eventParam! : undefined}
                        value={currentEvent as (string | undefined)}
                        onValueChange={val => {
                            setCurrentEvent(val);
                            router.push(`?event=${val}`, { scroll: false });
                        }}
                        required
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select an event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="check-in">Hacker check-in</SelectItem>
                            <SelectItem value="lunch">Lunch</SelectItem>
                            <SelectItem value="dinner">Dinner</SelectItem>
                        </SelectContent>
                    </Select>
                </form>

                {nfcSupported === false && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
                        <Icon icon="fluent:warning-24-filled" className="inline mr-2" />
                        Web NFC is not supported on this device. Please use Android Chrome.
                    </div>
                )}

                {/* NFC status indicator */}
                <div className="mt-6 flex flex-col items-center gap-4">
                    <div className={`flex items-center justify-center w-40 h-40 rounded-full border-4 transition-colors duration-300 ${
                        scanning ? "border-green-400 bg-green-50" : "border-gray-300 bg-gray-50"
                    }`}>
                        <Icon
                            icon="fluent:nfc-28-filled"
                            className={`text-8xl transition-colors duration-300 ${
                                scanning ? "text-green-500 animate-pulse" : "text-gray-400"
                            }`}
                        />
                    </div>
                    <p className={`font-semibold text-lg ${ scanning ? "text-green-600" : "text-gray-500" }`}>
                        {scanning ? "Scanning — hold badge to phone" : "Not scanning"}
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={startScanning}
                            disabled={scanning || nfcSupported === false}
                            className="flex items-center gap-2 bg-secondary-600 hover:bg-secondary-700 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
                        >
                            <Icon icon="fluent:play-circle-24-filled" className="text-xl" />
                            Start Scanning
                        </button>
                        <button
                            onClick={stopScanning}
                            disabled={!scanning}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-semibold px-5 py-2 rounded-xl transition-colors"
                        >
                            <Icon icon="fluent:stop-24-filled" className="text-xl" />
                            Stop
                        </button>
                    </div>
                </div>

                {currentUserInfo && (
                    <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
                        <p className="font-semibold text-gray-700">Last scanned:</p>
                        <p className="text-lg font-bold text-gray-800">{currentUserInfo.firstName} {currentUserInfo.lastName}</p>
                        <p className="text-gray-500">{currentUserInfo.email}</p>
                    </div>
                )}

                <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                    <DialogContent
                        className="flex flex-col justify-center items-center py-4 md:py-6 lg:py-8 px-6 md:px-8 lg:px-12 w-[90%] max-w-3xl rounded-xl">
                        <DialogHeader className="w-full">
                            <DialogTitle className="text-gray-700 text-2xl md:text-3xl font-semibold">
                                {currentUserInfo?.firstName} {currentUserInfo?.lastName}
                            </DialogTitle>
                            <DialogDescription className="md:text-lg">
                                <span className="text-lg">{currentUserInfo?.email}</span>
                            </DialogDescription>
                            <div className="w-full flex justify-center">
                                <div className="w-64 pt-4 text-gray-700 font-semibold text-lg">
                                    <Link
                                        className="border py-1 px-2 rounded-lg bg-white hover:bg-gray-200 duration-75"
                                        href={`/dashboard/admin/applications/${currentUserInfo?.id}?from=scan&event=${currentEvent}`}>
                                        View scanned user
                                    </Link>
                                </div>
                            </div>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}