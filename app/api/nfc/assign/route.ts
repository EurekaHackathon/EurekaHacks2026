import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) return new Response("Unauthorized", { status: 401 });

    const body = await request.json();
    const userId = Number(body?.userId);
    const chipId = String(body?.chipId ?? "");
    if (!Number.isInteger(userId) || userId <= 0) {
        return new Response("Missing or invalid userId", { status: 400 });
    }
    if (!UUID_RE.test(chipId)) {
        return new Response("Missing or invalid chipId", { status: 400 });
    }

    await db`
        insert into public.nfc_chips (id, user_id) values (${chipId}::uuid, ${userId})
        on conflict (id) do update set user_id = excluded.user_id
    `;
    return Response.json({ ok: true });
}
