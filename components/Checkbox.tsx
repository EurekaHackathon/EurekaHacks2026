"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'defaultChecked' | 'onChange'> {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
    checked: controlledChecked,
    defaultChecked,
    onCheckedChange,
    className,
    ...props
}: CheckboxProps) {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? !!controlledChecked : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newChecked = e.target.checked;
        if (!isControlled) {
            setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
    };

    return (
        <div className={cn("relative flex items-center justify-center h-5 w-5 shrink-0", className)}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
                {...props}
            />
            <div
                className={cn(
                    "h-full w-full border-2 border-secondary-700 bg-[#030712] rounded transition-all duration-200 peer-hover:border-secondary-500 peer-focus-visible:border-[var(--neon-yellow)] peer-checked:bg-[var(--neon-yellow)] peer-checked:border-[var(--neon-yellow)] flex items-center justify-center",
                    isChecked && "bg-[var(--neon-yellow)] border-[var(--neon-yellow)]"
                )}
            >
                {isChecked && (
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5 text-[#030712]"
                    >
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                )}
            </div>
        </div>
    );
}
