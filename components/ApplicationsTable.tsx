import { db } from "@/lib/database";
import {
    getApplicationsPaginated,
    getNumberOfApplicationsFiltered,
} from "@/lib/sqlc/admin_sql";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import ApplicationsSearch from "@/components/ApplicationsSearch";
import OpenApplicationLinksButton from "@/components/OpenApplicationLinksButton";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export default async function ApplicationsTable({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | undefined }>
}) {
    const params = await searchParams;

    const sort = params.sort ?? "";
    const hackathons = params.hackathons ?? "";

    // Get current admin user id for "scored by current user" check
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);
    const currentUserId = user.id;

    const numberOfApplications = await getNumberOfApplicationsFiltered(db, {
        searchQuery: params.q?.toString().trim() ?? "",
        onlyWithRsvp: params.rsvp === "true",
        hackathonsFilter: hackathons || null,
    });

    let page = params.page ? clamp(parseInt(params.page), 1, Math.max(Math.ceil(parseInt(numberOfApplications?.count ?? "1") / 10), 1)) : 1;
    if (isNaN(page)) {
        page = 1;
    }

    const applications = await getApplicationsPaginated(db, {
        limit: "10",
        offset: ((page - 1) * 10).toString(),
        searchQuery: params.q?.toString().trim() ?? "",
        onlyWithRsvp: params.rsvp === "true",
        currentUserId,
        hackathonsFilter: hackathons || null,
    });

    // Apply in-memory sorting (does not affect the database)
    let sortedApplications = [...applications];
    if (sort === "submitted_first") {
        sortedApplications = sortedApplications.sort((a, b) => {
            const aIsSubmitted = a.status === "submitted" ? 0 : 1;
            const bIsSubmitted = b.status === "submitted" ? 0 : 1;
            return aIsSubmitted - bIsSubmitted;
        });
    } else if (sort === "unrated_first") {
        sortedApplications = sortedApplications.sort((a, b) => {
            const aUnrated = !a.scoredByCurrentUser ? 0 : 1;
            const bUnrated = !b.scoredByCurrentUser ? 0 : 1;
            return aUnrated - bUnrated;
        });
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-CA", {});
    };

    return (
        <div className="overflow-x-auto">
            <div className="pb-12">
                <ApplicationsSearch
                    page={page}
                    query={params.q?.toString().trim() ?? ""}
                    sort={sort}
                    hackathons={hackathons}
                />
            </div>
            <table className="w-full border">
                <thead>
                <tr className="text-sm 2xl:text-base text-gray-400 hover:bg-white/5 duration-75">
                    <th className="text-start border-b py-4 pl-4 mr-12">First Name</th>
                    <th className="text-start border-b mr-12">Last Name</th>
                    <th className="text-start border-b mr-12">School</th>
                    <th className="text-start border-b mr-12">Status</th>
                    <th className="text-start text-nowrap border-b mr-12">Date submitted</th>
                    <th className="text-start border-b mr-12"></th>
                </tr>
                </thead>
                <tbody>
                {sortedApplications.map((application, index) => (
                    <tr className="text-secondary-50 2xl:text-lg font-semibold hover:bg-white/5 duration-75"
                        key={application.id}>
                        <td className={`pr-4 text-start py-6 pl-4 ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div className="min-w-0">
                                {application.firstName}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div className="min-w-0">
                                {application.lastName}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div className="max-w-[200px] truncate" title={application.school}>
                                {application.school}
                            </div>
                        </td>
                        <td className={`pr-4 text-start capitalize ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div>
                                <StatusBadge status={application.rsvped ? "rsvped" : application.status}/>
                            </div>
                        </td>
                        <td className={`text-start text-nowrap ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div>
                                {formatDate(application.createdAt)}
                            </div>
                        </td>
                        <td className={`pr-4 text-start ${index !== sortedApplications.length - 1 ? "border-b" : ""}`}>
                            <div className="flex items-center gap-2">
                                <OpenApplicationLinksButton
                                    githubLink={application.githubLink}
                                    linkedinLink={application.linkedinLink}
                                    portfolioLink={application.portfolioLink}
                                    resumeLink={application.resumeLink}
                                />
                                <Link className="border border-gray-600 py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-secondary-50 duration-75"
                                      href={`/dashboard/admin/applications/${application.id}?from=${page}`}>View</Link>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination className="w-full mt-4" currentPage={page} numberOfCurrentItems={sortedApplications.length}
                        query={params.q?.toString().trim() ?? ""}
                        rsvp={params.rsvp === "true"}
                        sort={sort}
                        hackathons={hackathons}
                        numberOfTotalItems={isNaN(parseInt(numberOfApplications?.count ?? "0")) ? 0 : parseInt(numberOfApplications?.count ?? "0")}/>
        </div>
    );
}
