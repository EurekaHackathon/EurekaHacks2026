import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { db } from "@/lib/database";

export async function GET(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");
    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) return new Response("Unauthorized", { status: 401 });

    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q") ?? "";
    if (!q.trim()) return Response.json([]);

    const rows = await db`
        select ha.user_id, ha.first_name, ha.last_name, ha.status
        from public.hackathon_applications ha
        where lower(ha.first_name) like lower(${"%" + q + "%"})
           or lower(ha.last_name)  like lower(${"%" + q + "%"})
        order by ha.id desc
        limit 10
    `;

    return Response.json(
        rows.map(r => ({
            userId: r.user_id,
            firstName: r.first_name,
            lastName: r.last_name,
            status: r.status,
        }))
    );
}
