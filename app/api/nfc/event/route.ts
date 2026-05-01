import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";
import { MEAL_EVENT_KEYS } from "@/lib/events";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const userId = Number(body?.userId);
    const name = String(body?.name ?? "");
    const checked = Boolean(body?.checked);

    if (!Number.isInteger(userId) || userId <= 0) {
        return new Response("Missing or invalid userId", { status: 400 });
    }
    if (!MEAL_EVENT_KEYS.has(name)) {
        return new Response("Invalid event name", { status: 400 });
    }

    if (checked) {
        await db`
            insert into public.events (user_id, name) values (${userId}, ${name})
            on conflict (user_id, name) do nothing
        `;
    } else {
        await db`
            delete from public.events where user_id = ${userId} and name = ${name}
        `;
    }

    return Response.json({ ok: true, checked });
}
