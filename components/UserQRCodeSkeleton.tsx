import React from "react";
import { cn } from "@/lib/utils";

function Skeleton({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("skeleton-pulse rounded-md bg-gray-300", className)}
            {...props}
        >
            {children}
        </div>
    );
}

export default function UserQRCodeSkeleton() {
    return (
        <div className="flex p-12 justify-center items-center min-h-screen">
            <div
                className="flex flex-col items-center bg-[#151c2b] border border-gray-300 p-8 md:p-10 lg:p-12 rounded-xl max-w-md w-full">
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-secondary-50 font-bold">NFC Badge</h1>
                    <p className="md:text-lg text-gray-500 mt-1">Use this to check in and receive food.</p>
                </div>
                <div className="flex flex-col items-center gap-6 w-full mt-6">
                    <Skeleton className="w-44 h-44 md:w-56 md:h-56 rounded-full" />
                    <Skeleton className="w-full h-10 rounded-lg" />
                    <Skeleton className="w-48 h-12 rounded-xl" />
                </div>
            </div>
        </div>
    );
}