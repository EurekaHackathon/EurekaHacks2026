import { Icon } from "@iconify/react";

export default function ApplicationItem({ label, value, icon }: { label: string, value: string | null | undefined, icon: string }) {
    const display = value !== null && value !== undefined && value.trim() !== "" ? value : null;
    return (
        <div>
            <div className="flex items-center">
                <div className="min-w-8">
                    <Icon icon={icon} className="text-xl"/>
                </div>
                {label}
            </div>
            <p className="ml-8 text-gray-400">
                {display ?? <span className="text-gray-600 italic">Not provided</span>}
            </p>
        </div>
    );
}