import { Sql } from "postgres";
import { isMockMode, MOCK_STATS, MOCK_APPLICATIONS, MOCK_APPLICATIONS_PAGINATED, MOCK_APP_COUNT_PER_DAY } from "@/lib/mock-data";

export const getNumberOfRegisteredUsersQuery = `-- name: GetNumberOfRegisteredUsers :one
select count(*) as count from public.app_users`;

export interface GetNumberOfRegisteredUsersRow {
    count: string;
}

export async function getNumberOfRegisteredUsers(sql: Sql): Promise<GetNumberOfRegisteredUsersRow | null> {
    if (isMockMode()) return { count: MOCK_STATS.registeredUsers };
    const rows = await sql.unsafe(getNumberOfRegisteredUsersQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfHackerApplicationsQuery = `-- name: GetNumberOfHackerApplications :one
select count(*) as count from public.hackathon_applications`;

export interface GetNumberOfHackerApplicationsRow {
    count: string;
}

export async function getNumberOfHackerApplications(sql: Sql): Promise<GetNumberOfHackerApplicationsRow | null> {
    if (isMockMode()) return { count: MOCK_STATS.applications };
    const rows = await sql.unsafe(getNumberOfHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfAcceptedHackerApplicationsQuery = `-- name: GetNumberOfAcceptedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'accepted'`;

export interface GetNumberOfAcceptedHackerApplicationsRow {
    count: string;
}

export async function getNumberOfAcceptedHackerApplications(sql: Sql): Promise<GetNumberOfAcceptedHackerApplicationsRow | null> {
    if (isMockMode()) return { count: MOCK_STATS.accepted };
    const rows = await sql.unsafe(getNumberOfAcceptedHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfRejectedHackerApplicationsQuery = `-- name: GetNumberOfRejectedHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'rejected'`;

export interface GetNumberOfRejectedHackerApplicationsRow {
    count: string;
}

export async function getNumberOfRejectedHackerApplications(sql: Sql): Promise<GetNumberOfRejectedHackerApplicationsRow | null> {
    if (isMockMode()) return { count: MOCK_STATS.rejected };
    const rows = await sql.unsafe(getNumberOfRejectedHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getNumberOfPendingHackerApplicationsQuery = `-- name: GetNumberOfPendingHackerApplications :one
select count(*) as count from public.hackathon_applications where status = 'submitted'`;

export interface GetNumberOfPendingHackerApplicationsRow {
    count: string;
}

export async function getNumberOfPendingHackerApplications(sql: Sql): Promise<GetNumberOfPendingHackerApplicationsRow | null> {
    if (isMockMode()) return { count: MOCK_STATS.pending };
    const rows = await sql.unsafe(getNumberOfPendingHackerApplicationsQuery, []).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getApplicationsPaginatedQuery = `-- name: GetApplicationsPaginated :many
select ha.id,
       ha.first_name,
       ha.last_name,
       ha.school,
       ha.status,
       ha.created_at,
       ha.github_link,
       ha.linkedin_link,
       ha.portfolio_link,
       ha.resume_link,
       exists (
           select 1
           from public.rsvps r
           where r.user_id = ha.user_id
       ) as rsvped
from public.hackathon_applications ha
where (lower(ha.first_name) like lower('%' || $3 || '%')
    or lower(ha.last_name) like lower('%' || $3 || '%'))
  and (
        coalesce($4::boolean, false) = false
        or exists (
           select 1
           from public.rsvps r
           where r.user_id = ha.user_id
       )
  )
order by ha.id desc
limit $1 offset $2`;

export interface GetApplicationsPaginatedArgs {
    limit: string;
    offset: string;
    searchQuery: string | null;
    onlyWithRsvp: boolean;
}

export interface GetApplicationsPaginatedRow {
    id: number;
    firstName: string;
    lastName: string;
    school: string;
    status: string;
    createdAt: Date;
    githubLink: string | null;
    linkedinLink: string | null;
    portfolioLink: string | null;
    resumeLink: string | null;
    rsvped: boolean;
}

export async function getApplicationsPaginated(sql: Sql, args: GetApplicationsPaginatedArgs): Promise<GetApplicationsPaginatedRow[]> {
    if (isMockMode()) {
        const q = (args.searchQuery || "").toLowerCase();
        let results = MOCK_APPLICATIONS_PAGINATED.filter(a =>
            !q || a.firstName.toLowerCase().includes(q) || a.lastName.toLowerCase().includes(q)
        );
        if (args.onlyWithRsvp) results = results.filter(a => a.rsvped);
        const offset = parseInt(args.offset);
        const limit = parseInt(args.limit);
        return results.slice(offset, offset + limit);
    }
    return (await sql.unsafe(getApplicationsPaginatedQuery, [args.limit, args.offset, args.searchQuery, args.onlyWithRsvp]).values()).map(row => ({
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        school: row[3],
        status: row[4],
        createdAt: row[5],
        githubLink: row[6],
        linkedinLink: row[7],
        portfolioLink: row[8],
        resumeLink: row[9],
        rsvped: row[10]
    }));
}

export const getNumberOfApplicationsFilteredQuery = `-- name: GetNumberOfApplicationsFiltered :one
select count(*)
from public.hackathon_applications ha
where (lower(ha.first_name) like lower('%' || $1 || '%')
    or lower(ha.last_name) like lower('%' || $1 || '%'))
  and (
        coalesce($2::boolean, false) = false
        or exists (
            select 1
            from public.rsvps r
            where r.user_id = ha.user_id
        )
  )`;

export interface GetNumberOfApplicationsFilteredArgs {
    searchQuery: string | null;
    onlyWithRsvp: boolean;
}

export interface GetNumberOfApplicationsFilteredRow {
    count: string;
}

export async function getNumberOfApplicationsFiltered(sql: Sql, args: GetNumberOfApplicationsFilteredArgs): Promise<GetNumberOfApplicationsFilteredRow | null> {
    if (isMockMode()) {
        const q = (args.searchQuery || "").toLowerCase();
        let results = MOCK_APPLICATIONS_PAGINATED.filter(a =>
            !q || a.firstName.toLowerCase().includes(q) || a.lastName.toLowerCase().includes(q)
        );
        if (args.onlyWithRsvp) results = results.filter(a => a.rsvped);
        return { count: results.length.toString() };
    }
    const rows = await sql.unsafe(getNumberOfApplicationsFilteredQuery, [args.searchQuery, args.onlyWithRsvp]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        count: row[0]
    };
}

export const getApplicationByIdQuery = `-- name: GetApplicationById :one
select ha.id, ha.user_id, ha.status, ha.first_name, ha.last_name, ha.email, ha.age, ha.school, ha.year_of_graduation, ha.city, ha.dietary_restrictions, ha.number_of_hackathons_attended, ha.github_link, ha.linkedin_link, ha.portfolio_link, ha.resume_link, ha.emergency_contact_full_name, ha.emergency_contact_phone_number, ha.short_answer_response, ha.tshirt_size, ha.created_at, ha.updated_at,
       exists(
           select 1
           from public.rsvps r
           where r.user_id = ha.user_id
       ) as rsvped
from public.hackathon_applications ha
where ha.id = $1
limit 1`;

export interface GetApplicationByIdArgs {
    id: number;
}

export interface GetApplicationByIdRow {
    id: number;
    userId: number;
    status: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    school: string;
    yearOfGraduation: number;
    city: string;
    dietaryRestrictions: string[] | null;
    numberOfHackathonsAttended: number;
    githubLink: string | null;
    linkedinLink: string | null;
    portfolioLink: string | null;
    resumeLink: string | null;
    emergencyContactFullName: string;
    emergencyContactPhoneNumber: string;
    shortAnswerResponse: string;
    tshirtSize: string;
    createdAt: Date;
    updatedAt: Date;
    rsvped: boolean;
}

export async function getApplicationById(sql: Sql, args: GetApplicationByIdArgs): Promise<GetApplicationByIdRow | null> {
    if (isMockMode()) return MOCK_APPLICATIONS.find(a => a.id === args.id) ?? null;
    const rows = await sql.unsafe(getApplicationByIdQuery, [args.id]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        userId: row[1],
        status: row[2],
        firstName: row[3],
        lastName: row[4],
        email: row[5],
        age: row[6],
        school: row[7],
        yearOfGraduation: row[8],
        city: row[9],
        dietaryRestrictions: row[10],
        numberOfHackathonsAttended: row[11],
        githubLink: row[12],
        linkedinLink: row[13],
        portfolioLink: row[14],
        resumeLink: row[15],
        emergencyContactFullName: row[16],
        emergencyContactPhoneNumber: row[17],
        shortAnswerResponse: row[18],
        tshirtSize: row[19],
        createdAt: row[20],
        updatedAt: row[21],
        rsvped: row[22]
    };
}

export const getApplicationCountPerDayQuery = `-- name: GetApplicationCountPerDay :many
select date(created_at at time zone 'America/Toronto') as date, count(*) as count
from public.hackathon_applications
group by date(created_at at time zone 'America/Toronto')
order by date(created_at at time zone 'America/Toronto') asc`;

export interface GetApplicationCountPerDayRow {
    date: Date;
    count: string;
}

export async function getApplicationCountPerDay(sql: Sql): Promise<GetApplicationCountPerDayRow[]> {
    if (isMockMode()) return MOCK_APP_COUNT_PER_DAY;
    return (await sql.unsafe(getApplicationCountPerDayQuery, []).values()).map(row => ({
        date: row[0],
        count: row[1]
    }));
}

export const getNumberOfApplicationsPerSchoolQuery = `-- name: GetNumberOfApplicationsPerSchool :many
select school, count(*) as count
from public.hackathon_applications
group by school
order by count desc`;

export interface GetNumberOfApplicationsPerSchoolRow {
    school: string;
    count: string;
}

export async function getNumberOfApplicationsPerSchool(sql: Sql): Promise<GetNumberOfApplicationsPerSchoolRow[]> {
    return (await sql.unsafe(getNumberOfApplicationsPerSchoolQuery, []).values()).map(row => ({
        school: row[0],
        count: row[1]
    }));
}

export const getEmailsOfUnappliedUsersQuery = `-- name: GetEmailsOfUnappliedUsers :many
select email from public.app_users where email not in (select email from public.hackathon_applications)`;

export interface GetEmailsOfUnappliedUsersRow {
    email: string | null;
}

export async function getEmailsOfUnappliedUsers(sql: Sql): Promise<GetEmailsOfUnappliedUsersRow[]> {
    return (await sql.unsafe(getEmailsOfUnappliedUsersQuery, []).values()).map(row => ({
        email: row[0]
    }));
}

export const getBasicUserInfoByUserIdQuery = `-- name: GetBasicUserInfoByUserId :one
select id, first_name, last_name, email from public.hackathon_applications where user_id = $1`;

export interface GetBasicUserInfoByUserIdArgs {
    userId: number;
}

export interface GetBasicUserInfoByUserIdRow {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export async function getBasicUserInfoByUserId(sql: Sql, args: GetBasicUserInfoByUserIdArgs): Promise<GetBasicUserInfoByUserIdRow | null> {
    const rows = await sql.unsafe(getBasicUserInfoByUserIdQuery, [args.userId]).values();
    if (rows.length !== 1) {
        return null;
    }
    const row = rows[0];
    return {
        id: row[0],
        firstName: row[1],
        lastName: row[2],
        email: row[3]
    };
}

export const getAdjacentApplicationIdsQuery = `-- name: GetAdjacentApplicationIds :one
select
    (select id from public.hackathon_applications where id < $1 order by id desc limit 1) as prev_id,
    (select id from public.hackathon_applications where id > $1 order by id asc limit 1) as next_id`;

export interface GetAdjacentApplicationIdsArgs {
    id: number;
}

export interface GetAdjacentApplicationIdsRow {
    prevId: number | null;
    nextId: number | null;
}

export async function getAdjacentApplicationIds(sql: Sql, args: GetAdjacentApplicationIdsArgs): Promise<GetAdjacentApplicationIdsRow> {
    if (isMockMode()) {
        const ids = MOCK_APPLICATIONS.map(a => a.id).sort((a, b) => a - b);
        const idx = ids.indexOf(args.id);
        return {
            prevId: idx > 0 ? ids[idx - 1] : null,
            nextId: idx < ids.length - 1 ? ids[idx + 1] : null,
        };
    }
    const rows = await sql.unsafe(getAdjacentApplicationIdsQuery, [args.id]).values();
    const row = rows[0];
    return {
        prevId: row[0] ?? null,
        nextId: row[1] ?? null,
    };
}
