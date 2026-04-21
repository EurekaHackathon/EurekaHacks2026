import { Icon } from "@iconify/react";
import Link from "next/link";
import { getApplicationById, getAdjacentApplicationIds } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import ApplicationItem from "@/components/ApplicationItem";
import { ApplicationActionsForm } from "@/components/ApplicationActionsForm";
import BackButton from "@/components/BackButton";
import ScoringForm from "@/components/ScoringForm";
import { getScoreByUser, getAverageScore } from "@/lib/sqlc/scores_sql";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import OpenApplicationLinksButton from "@/components/OpenApplicationLinksButton";
import ApplicationKeyboardShortcuts from "@/components/ApplicationKeyboardShortcuts";

const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
        return years + " year" + (years > 1 ? "s" : "");
    }

    if (months > 0) {
        return months + " month" + (months > 1 ? "s" : "");
    }

    if (days > 0) {
        return days + " day" + (days > 1 ? "s" : "");
    }

    if (hours > 0) {
        return hours + " hour" + (hours > 1 ? "s" : "");
    }

    if (minutes > 0) {
        return minutes + " minute" + (minutes > 1 ? "s" : "");
    }

    return seconds + " second" + (seconds > 1 ? "s" : "");
};

export default async function Application({
                                              params, searchParams
                                          }: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const {id} = await params;
    const {from} = await searchParams;
    if (isNaN(parseInt(id))) {
        redirect("/dashboard/admin/applications");
    }

    const application = await getApplicationById(db, {
        id: parseInt(id),
    });

    if (!application) {
        redirect("/dashboard/admin/applications");
    }

    const cookieStore = await cookies();
    const currentUser = await authorizeSession(cookieStore.get("session")?.value);
    const [myScoreRow, avgScoreRow, adjacentIds] = await Promise.all([
        getScoreByUser(db, { applicationId: parseInt(id), userId: currentUser.id }),
        getAverageScore(db, { applicationId: parseInt(id) }),
        getAdjacentApplicationIds(db, { id: parseInt(id) }),
    ]);
    const myScore = myScoreRow?.score ?? null;
    const avgScore = avgScoreRow?.average ? parseFloat(avgScoreRow.average) : null;
    const scoreCount = parseInt(avgScoreRow?.count ?? "0");

    const formatDietaryRestrictions = (restrictions: string[] | null) => {
        if (!restrictions) {
            return "None";
        }

        if (restrictions.length === 0) {
            return "None";
        }

        return restrictions.map((restriction) => restriction.charAt(0).toUpperCase() + restriction.slice(1)).join(", ");
    };

    const applicationStatus = application.rsvped ? "rsvped" : application.status;
    const availableLinks = [
        application.githubLink ? "GitHub" : null,
        application.linkedinLink ? "LinkedIn" : null,
        application.portfolioLink ? "Website" : null,
        application.resumeLink ? "Resume" : null,
    ].filter((value): value is string => value !== null);

    return (
        <div className="mt-3 lg:mt-2">
            <ApplicationKeyboardShortcuts/>
            <div className="flex flex-wrap items-center gap-3">
                <BackButton
                    className="border border-gray-600 flex items-center gap-2 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                    <Icon icon="fluent:arrow-left-24-filled" className="text-2xl"/>
                    {from === "scan" ? "Back to QR code scanner" : "Back to applications list"}
                </BackButton>
                <div className="flex items-center gap-2 ml-auto">
                    {adjacentIds.prevId !== null && (
                        <Link id="application-prev" href={`/dashboard/admin/applications/${adjacentIds.prevId}`}
                              className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                            <Icon icon="fluent:arrow-left-24-filled" className="text-xl"/>
                            Prev
                        </Link>
                    )}
                    {adjacentIds.nextId !== null && (
                        <Link id="application-next" href={`/dashboard/admin/applications/${adjacentIds.nextId}`}
                              className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                            Next
                            <Icon icon="fluent:arrow-right-24-filled" className="text-xl"/>
                        </Link>
                    )}
                </div>
            </div>
            <div
                className="bg-[#151c2b] border-gray-300 border rounded-xl mt-3 p-3 lg:p-4 text-secondary-50 font-semibold lg:h-[calc(100vh-7rem)] lg:overflow-hidden">
                <div className="flex flex-col gap-3 h-full">
                    <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-3">
                        <div>
                            <div className="flex flex-wrap items-center gap-3">
                                <h1 className="text-2xl font-semibold">{application.firstName} {application.lastName}</h1>
                                <StatusBadge className="font-semibold" status={applicationStatus}/>
                            </div>
                            <div className="mt-1.5 text-sm text-gray-400">
                                Submitted: {application.createdAt.toLocaleDateString("en-CA")} at {new Intl.DateTimeFormat("en-CA", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: false,
                                timeZone: "America/Toronto",
                            }).format(application.createdAt)} ({formatTimeAgo(application.createdAt)} ago)
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.38fr)_minmax(21rem,0.92fr)] lg:min-h-0 lg:flex-1">
                        <div className="grid gap-3 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:min-h-0">
                            <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Name</p>
                                    <p className="mt-1.5 text-base text-secondary-50">{application.firstName} {application.lastName}</p>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Age</p>
                                    <p className="mt-1.5 text-base text-secondary-50">{application.age}</p>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Graduation Year</p>
                                    <p className="mt-1.5 text-base text-secondary-50">{application.yearOfGraduation}</p>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">School</p>
                                    <p className="mt-1.5 text-sm leading-5 text-secondary-50">{application.school}</p>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">City</p>
                                    <p className="mt-1.5 text-base text-secondary-50">{application.city}</p>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Hackathons Attended</p>
                                    <p className="mt-1.5 text-base text-secondary-50">{application.numberOfHackathonsAttended}</p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-white/5 p-4 lg:min-h-0 lg:flex lg:flex-col lg:overflow-hidden">
                                <h2 className="text-xl font-semibold">Short Answer</h2>
                                <p className="mt-1.5 text-sm text-gray-400 italic">If aliens landed tomorrow and asked you to show them one piece of human culture, what would you show them?</p>
                                <p className="mt-3 whitespace-pre-wrap break-words text-[15px] leading-7 text-secondary-50 lg:min-h-0 lg:flex-1 lg:overflow-y-auto lg:pr-1">
                                    {application.shortAnswerResponse || <span className="text-gray-500">No response provided.</span>}
                                </p>
                            </div>

                            <div className="grid gap-2.5 md:grid-cols-2">
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <h2 className="text-base font-semibold">Application Details</h2>
                                    <div className="mt-2.5 space-y-2.5 text-sm font-normal">
                                        <ApplicationItem label="Email" icon="fluent:mail-24-regular"
                                                         value={application.email}/>
                                        <ApplicationItem label="Dietary restrictions" icon="fluent:food-24-regular"
                                                         value={formatDietaryRestrictions(application.dietaryRestrictions)}/>
                                        <ApplicationItem label="T-shirt size" icon="fluent:person-tag-24-regular"
                                                         value={application.tshirtSize}/>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                    <h2 className="text-base font-semibold">Emergency Contact</h2>
                                    <div className="mt-2.5 space-y-2.5 text-sm font-normal">
                                        <ApplicationItem label="Full name" icon="icon-park-outline:edit-name"
                                                         value={application.emergencyContactFullName}/>
                                        <ApplicationItem label="Phone number" icon="fluent:phone-24-regular"
                                                         value={application.emergencyContactPhoneNumber}/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-3 content-start lg:min-h-0 lg:overflow-auto pr-1">
                            <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                <div className="flex items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">Review Tools</h2>
                                        <p className="mt-1 text-sm font-normal text-gray-400">
                                            {availableLinks.length > 0 ? `Available: ${availableLinks.join(", ")}` : "No external links submitted."}
                                        </p>
                                    </div>
                                    <OpenApplicationLinksButton
                                        id="application-open-links"
                                        githubLink={application.githubLink}
                                        linkedinLink={application.linkedinLink}
                                        portfolioLink={application.portfolioLink}
                                        resumeLink={application.resumeLink}
                                        label="Open all links"
                                        className="px-3 py-2 font-semibold shrink-0"
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                <ScoringForm
                                    applicationId={application.id}
                                    initialScore={myScore}
                                    className="mt-0"
                                    title="Your Rating"
                                />
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                <h2 className="text-lg font-semibold">Average Score</h2>
                                {scoreCount === 0 ? (
                                    <p className="mt-3 text-sm font-normal text-gray-400">No scores yet.</p>
                                ) : (
                                    <div className="mt-3">
                                        <p className="text-4xl font-bold text-[var(--neon-yellow)]">
                                            {avgScore?.toFixed(2)}<span className="text-xl text-gray-400 font-normal">/7</span>
                                        </p>
                                        <p className="mt-2 text-sm font-normal text-gray-400">
                                            Based on {scoreCount} score{scoreCount !== 1 ? "s" : ""}.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                <ApplicationActionsForm
                                    id={application.id}
                                    className="mt-0"
                                    title="Decision"
                                    gridClassName="grid-cols-2 xl:grid-cols-2 gap-3"
                                />
                            </div>

                            <div className="rounded-xl border border-gray-700 bg-white/5 p-3">
                                <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
                                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                    <div className="rounded-lg border border-gray-700 bg-[#0d1320] px-3 py-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Open Links</p>
                                        <p className="mt-1 text-sm text-secondary-50"><span className="font-bold">O</span> opens all submitted links</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-700 bg-[#0d1320] px-3 py-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Score</p>
                                        <p className="mt-1 text-sm text-secondary-50"><span className="font-bold">1-7</span> assigns your rating</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-700 bg-[#0d1320] px-3 py-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Decision</p>
                                        <p className="mt-1 text-sm text-secondary-50"><span className="font-bold">A</span> accepts, <span className="font-bold">R</span> rejects</p>
                                    </div>
                                    <div className="rounded-lg border border-gray-700 bg-[#0d1320] px-3 py-2">
                                        <p className="text-xs uppercase tracking-[0.18em] text-gray-400">Navigation</p>
                                        <p className="mt-1 text-sm text-secondary-50"><span className="font-bold">H / L</span> moves between applications</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
