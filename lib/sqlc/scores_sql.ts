import { Sql } from "postgres";
import { isMockMode, MOCK_SCORES } from "@/lib/mock-data";

export const upsertApplicationScoreQuery = `-- name: UpsertApplicationScore :exec
insert into public.application_scores (application_id, user_id, score)
values ($1, $2, $3)
on conflict (application_id, user_id)
do update set score = excluded.score, updated_at = now()`;

export interface UpsertApplicationScoreArgs {
    applicationId: number;
    userId: number;
    score: number;
}

export async function upsertApplicationScore(sql: Sql, args: UpsertApplicationScoreArgs): Promise<void> {
    if (isMockMode()) { MOCK_SCORES[args.applicationId] = args.score; return; }
    await sql.unsafe(upsertApplicationScoreQuery, [args.applicationId, args.userId, args.score]);
}

export const getScoreByUserQuery = `-- name: GetScoreByUser :one
select score from public.application_scores
where application_id = $1 and user_id = $2
limit 1`;

export interface GetScoreByUserArgs {
    applicationId: number;
    userId: number;
}

export interface GetScoreByUserRow {
    score: number;
}

export async function getScoreByUser(sql: Sql, args: GetScoreByUserArgs): Promise<GetScoreByUserRow | null> {
    if (isMockMode()) {
        const score = MOCK_SCORES[args.applicationId];
        return score !== undefined ? { score } : null;
    }
    const rows = await sql.unsafe(getScoreByUserQuery, [args.applicationId, args.userId]).values();
    if (rows.length !== 1) {
        return null;
    }
    return { score: rows[0][0] };
}

export const getAverageScoreQuery = `-- name: GetAverageScore :one
select round(avg(score)::numeric, 2) as average, count(*) as count
from public.application_scores
where application_id = $1`;

export interface GetAverageScoreArgs {
    applicationId: number;
}

export interface GetAverageScoreRow {
    average: string | null;
    count: string;
}

export async function getAverageScore(sql: Sql, args: GetAverageScoreArgs): Promise<GetAverageScoreRow | null> {
    if (isMockMode()) {
        const score = MOCK_SCORES[args.applicationId];
        return score !== undefined ? { average: score.toFixed(2), count: "1" } : { average: null, count: "0" };
    }
    const rows = await sql.unsafe(getAverageScoreQuery, [args.applicationId]).values();
    if (rows.length !== 1) {
        return null;
    }
    return { average: rows[0][0], count: rows[0][1] };
}
