"use client";

import { cn } from "@/lib/utils";

const isPresentLink = (link: string | null | undefined): link is string => {
    return !!link && link.trim() !== "" && link !== "None";
};

export default function OpenApplicationLinksButton({
    githubLink,
    linkedinLink,
    portfolioLink,
    resumeLink,
    label = "Open links",
    className,
    id,
}: {
    githubLink: string | null;
    linkedinLink: string | null;
    portfolioLink: string | null;
    resumeLink: string | null;
    label?: string;
    className?: string;
    id?: string;
}) {
    const links = [githubLink, linkedinLink, portfolioLink, resumeLink].filter(isPresentLink);

    const openLinks = () => {
        links.forEach((link) => {
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
        });
    };

    return (
        <button
            id={id}
            type="button"
            onClick={openLinks}
            disabled={links.length === 0}
            className={cn(
                "border border-gray-600 py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-secondary-50 duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5",
                className,
            )}
        >
            {label}
        </button>
    );
}
