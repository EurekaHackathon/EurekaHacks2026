import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";
import { getUserEvent } from "@/lib/sqlc/events_sql";
import { MEAL_EVENTS } from "@/lib/events";

const MEALS = MEAL_EVENTS.map(e => e.key);
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(request.url);
    const chip = searchParams.get("chip");
    if (!chip || !UUID_RE.test(chip)) return new Response("Invalid chip", { status: 400 });

    try {
        const chipRow = await db<{ user_id: number }[]>`
            select user_id from public.nfc_chips where id = ${chip}::uuid
        `;
        if (!chipRow.length) return new Response("Not found", { status: 404 });
        const userId = chipRow[0].user_id;

        const userRow = await db<{ first_name: string; last_name: string }[]>`
            select first_name, last_name from public.app_users where id = ${userId}
        `;
        if (!userRow.length) return new Response("Not found", { status: 404 });

        const mealChecks = await Promise.all(
            MEALS.map(m => getUserEvent(db, { userId, name: m }))
        );

        return Response.json({
            userId,
            firstName: userRow[0].first_name,
            lastName: userRow[0].last_name,
            ...Object.fromEntries(MEALS.map((m, i) => [m, mealChecks[i] !== null])),
        });
    } catch {
        return new Response("Server error", { status: 500 });
    }
}
