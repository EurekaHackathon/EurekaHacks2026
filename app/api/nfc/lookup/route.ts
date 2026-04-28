import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";
import { getUserEvent } from "@/lib/sqlc/events_sql";
import { isMockMode } from "@/lib/mock-data";

const MEALS = ["dinner-day-1", "breakfast-day-2", "lunch-day-2", "dinner-day-2"] as const;

export async function GET(request: Request) {
    if (isMockMode()) {
        return Response.json({
            firstName: "Test",
            lastName: "User",
            "dinner-day-1": true,
            "breakfast-day-2": false,
            "lunch-day-2": true,
            "dinner-day-2": false,
        });
    }

    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(request.url);
    const chip = searchParams.get("chip");
    if (!chip) return new Response("Missing chip", { status: 400 });

    const userId = parseInt(chip);
    if (isNaN(userId)) return new Response("Invalid chip", { status: 400 });

    try {
        const userRow = await db`
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
