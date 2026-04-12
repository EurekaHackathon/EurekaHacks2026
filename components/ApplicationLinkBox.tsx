import { Icon } from "@iconify/react";

export default function ApplicationLinkBox({ icon, label, link }: {
    icon: string,
    label: string,
    link: string | null | undefined
}) {
    const hasLink = !!link && link.trim() !== "" && link !== "None";
    return (
        <div className="border-gray-700 border flex items-center justify-between p-4 rounded-lg">
            <div className="flex items-center gap-2">
                <Icon icon={icon} className="text-xl"/>
                {label}
            </div>
            {hasLink ? (
                <a href={link!} target="_blank" rel="noreferrer" className="text-[var(--neon-yellow)] hover:underline">
                    View
                </a>
            ) : (
                <p className="text-gray-500">None</p>
            )}
        </div>
    );
}