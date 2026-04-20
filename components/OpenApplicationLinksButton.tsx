"use client";

const isPresentLink = (link: string | null | undefined) => {
    return !!link && link.trim() !== "" && link !== "None";
};

export default function OpenApplicationLinksButton({
    githubLink,
    linkedinLink,
    portfolioLink,
    resumeLink,
}: {
    githubLink: string | null;
    linkedinLink: string | null;
    portfolioLink: string | null;
    resumeLink: string | null;
}) {
    const links = [githubLink, linkedinLink, portfolioLink, resumeLink].filter(isPresentLink);

    const openLinks = () => {
        links.forEach((link) => {
            window.open(link, "_blank", "noopener,noreferrer");
        });
    };

    return (
        <button
            type="button"
            onClick={openLinks}
            disabled={links.length === 0}
            className="border border-gray-600 py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-secondary-50 duration-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/5"
        >
            Open links
        </button>
    );
}
