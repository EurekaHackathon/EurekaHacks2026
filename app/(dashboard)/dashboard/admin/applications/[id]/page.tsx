import { Icon } from "@iconify/react";
import Link from "next/link";
import { getApplicationById, getAdjacentApplicationIds } from "@/lib/sqlc/admin_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import StatusBadge from "@/components/StatusBadge";
import ApplicationItem from "@/components/ApplicationItem";
import ApplicationLinkBox from "@/components/ApplicationLinkBox";
import { ApplicationActionsForm } from "@/components/ApplicationActionsForm";
import BackButton from "@/components/BackButton";
import ScoringForm from "@/components/ScoringForm";
import { getScoreByUser, getAverageScore } from "@/lib/sqlc/scores_sql";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";

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

    return (
        <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
                <BackButton
                    className="border border-gray-600 flex items-center gap-2 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                    <Icon icon="fluent:arrow-left-24-filled" className="text-2xl"/>
                    {from === "scan" ? "Back to QR code scanner" : "Back to applications list"}
                </BackButton>
                <div className="flex items-center gap-2 ml-auto">
                    {adjacentIds.prevId !== null && (
                        <Link href={`/dashboard/admin/applications/${adjacentIds.prevId}`}
                              className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                            <Icon icon="fluent:arrow-left-24-filled" className="text-xl"/>
                            Prev
                        </Link>
                    )}
                    {adjacentIds.nextId !== null && (
                        <Link href={`/dashboard/admin/applications/${adjacentIds.nextId}`}
                              className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                            Next
                            <Icon icon="fluent:arrow-right-24-filled" className="text-xl"/>
                        </Link>
                    )}
                </div>
            </div>
            <div
                className="bg-[#151c2b] border-gray-300 border rounded-xl mt-8 p-6 text-secondary-50 font-semibold">
                <div className="flex items-center gap-8">
                    <h1 className="text-2xl font-semibold">{application.firstName} {application.lastName}</h1>
                    <StatusBadge className="font-semibold" status={applicationStatus}/>
                </div>
                <div className="mt-2 text-gray-400">
                    <h1>
                        Submitted: {application.createdAt.toLocaleDateString("en-CA")} at {new Intl.DateTimeFormat("en-CA", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                        timeZone: "America/Toronto",
                    }).format(application.createdAt)} ({formatTimeAgo(application.createdAt)} ago)
                    </h1>
                </div>
                <div className="grid md:grid-cols-2 xl:grid-cols-3 mt-8 gap-4">
                    <ApplicationItem label="Full name" icon="icon-park-outline:edit-name"
                                     value={application.firstName + " " + application.lastName}/>
                    <ApplicationItem label="Email" icon="fluent:mail-24-regular" value={application.email}/>
                    <ApplicationItem label="Age" icon="fluent:person-24-regular"
                                     value={application.age.toString()}/>
                    <ApplicationItem label="Hackathons attended" icon="fluent:code-block-16-regular"
                                     value={application.numberOfHackathonsAttended.toString()}/>
                    <ApplicationItem label="City" icon="fluent:location-24-regular" value={application.city}/>
                    <ApplicationItem label="School" icon="fluent:hat-graduation-12-regular"
                                     value={application.school}/>
                    <ApplicationItem label="Year of graduation" icon="fluent:calendar-12-regular"
                                     value={application.yearOfGraduation.toString()}/>
                    <ApplicationItem label="Dietary restrictions" icon="fluent:food-24-regular"
                                     value={formatDietaryRestrictions(application.dietaryRestrictions)}/>
                    <ApplicationItem label="T-shirt size" icon="fluent:person-tag-24-regular"
                                     value={application.tshirtSize}/>
                </div>
                <hr className="mt-8 border-gray-700"/>
                <div className="mt-8">
                    <h1 className="text-xl font-semibold">Emergency Contact</h1>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <ApplicationItem label="Full name" icon="icon-park-outline:edit-name"
                                         value={application.emergencyContactFullName}/>
                        <ApplicationItem label="Phone number" icon="fluent:phone-24-regular"
                                         value={application.emergencyContactPhoneNumber}/>
                    </div>
                </div>
                <hr className="mt-8 border-gray-700"/>
                <div className="mt-8">
                    <h1 className="text-xl font-semibold">Links</h1>
                    <div className="grid md:grid-cols-2 gap-4 mt-4">
                        <ApplicationLinkBox icon="mdi:github" label="GitHub" link={application.githubLink}/>
                        <ApplicationLinkBox icon="basil:linkedin-outline" label="LinkedIn" link={application.linkedinLink}/>
                        <ApplicationLinkBox label="Portfolio website" link={application.portfolioLink} icon="fluent:globe-12-regular"/>
                        <ApplicationLinkBox icon="fluent:document-one-page-16-regular" label="Resume" link={application.resumeLink}/>
                    </div>
                </div>
                <hr className="mt-8 border-gray-700"/>
                <div className="mt-8">
                    <h1 className="text-xl font-semibold mb-3">Short Answer</h1>
                    <p className="text-gray-400 text-sm mb-3 italic">If aliens landed tomorrow and asked you to show them one piece of human culture, what would you show them?</p>
                    <p className="text-secondary-50 whitespace-pre-wrap leading-relaxed">{application.shortAnswerResponse || <span className="text-gray-500">No response provided.</span>}</p>
                </div>
                <hr className="mt-8 border-gray-700"/>
                <ScoringForm applicationId={application.id} initialScore={myScore}/>
                <hr className="mt-8 border-gray-700"/>
                <div className="mt-8">
                    <h1 className="text-xl font-semibold mb-4">Average Score</h1>
                    {scoreCount === 0 ? (
                        <p className="text-gray-400">No scores yet.</p>
                    ) : (
                        <details className="cursor-pointer">
                            <summary className="text-gray-400 select-none hover:text-secondary-50 duration-150">
                                Reveal average ({scoreCount} score{scoreCount !== 1 ? "s" : ""})
                            </summary>
                            <p className="mt-3 text-4xl font-bold text-[var(--neon-yellow)]">
                                {avgScore?.toFixed(2)}<span className="text-xl text-gray-400 font-normal">/7</span>
                            </p>
                        </details>
                    )}
                </div>
                <hr className="mt-8 border-gray-700"/>
                <ApplicationActionsForm id={application.id}/>
                {(adjacentIds.prevId !== null || adjacentIds.nextId !== null) && (
                    <div className="flex items-center justify-between gap-3 mt-8 pt-8 border-t border-gray-700">
                        {adjacentIds.prevId !== null ? (
                            <Link href={`/dashboard/admin/applications/${adjacentIds.prevId}`}
                                  className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                                <Icon icon="fluent:arrow-left-24-filled" className="text-xl"/>
                                Prev
                            </Link>
                        ) : <div/>}
                        {adjacentIds.nextId !== null ? (
                            <Link href={`/dashboard/admin/applications/${adjacentIds.nextId}`}
                                  className="border border-gray-600 flex items-center gap-1.5 font-semibold text-secondary-50 rounded-lg px-4 h-10 duration-75 hover:bg-white/5">
                                Next
                                <Icon icon="fluent:arrow-right-24-filled" className="text-xl"/>
                            </Link>
                        ) : <div/>}
                    </div>
                )}
            </div>
        </div>
    );
};