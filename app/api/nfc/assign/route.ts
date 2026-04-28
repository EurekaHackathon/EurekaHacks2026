import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";
import { isMockMode } from "@/lib/mock-data";

/**
 * Stores the assignment of an NFC tag number to a user.
 *
 * In production this would write to a `nfc_chip_assignments` table:
 *   create table nfc_chip_assignments (
 *       chip_number integer primary key,
 *       user_id integer not null references public.app_users(id),
 *       assigned_at timestamptz not null default now()
 *   );
 *
 * In mock mode it just returns success (the client uses localStorage).
 */
export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { chipNumber, userId, name } = body;

    if (chipNumber === undefined || chipNumber === null || !userId || !name) {
        return new Response("Missing required fields", { status: 400 });
    }

    const num = parseInt(chipNumber);
    if (isNaN(num)) {
        return new Response("chipNumber must be a number", { status: 400 });
    }

    if (isMockMode()) {
        return Response.json({ ok: true, chipNumber: num, userId, name });
    }

    await db.unsafe(
        `insert into nfc_chip_assignments (chip_number, user_id)
         values ($1, $2)
         on conflict (chip_number) do update set user_id = excluded.user_id, assigned_at = now()`,
        [num, userId]
    );

    return Response.json({ ok: true, chipNumber: num, userId, name });
}
