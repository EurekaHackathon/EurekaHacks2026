import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { getApplicationStatus } from "@/lib/sqlc/application_sql";
import { db } from "@/lib/database";
import { createUserEvent, getUserEvent } from "@/lib/sqlc/events_sql";
import { getBasicUserInfoByUserId, GetBasicUserInfoByUserIdRow } from "@/lib/sqlc/admin_sql";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", {status: 401});
    }

    const formData = await request.formData();
    const encryptedId = formData.get("encryptedId");
    const event = formData.get("event");

    if (!encryptedId || !event) {
        return new Response("Missing required fields", {status: 400});
    }

    if (typeof (encryptedId) !== "string") {
        return new Response("Invalid encryptedId", {status: 400});
    }

    if (typeof (event) !== "string") {
        return new Response("Invalid event", {status: 400});
    }

    let userInfo: GetBasicUserInfoByUserIdRow | null;

    try {
        const userId = parseInt(encryptedId);
        if (isNaN(userId)) {
            return new Response("Invalid ID", { status: 400 });
        }

        const userApplicationStatus = await getApplicationStatus(db, {
            userId
        });
        if (userApplicationStatus?.status !== "accepted") {
            return new Response("User is not accepted", {status: 403});
        }

        const existingEvent = await getUserEvent(db, {
            userId,
            name: event
        });

        if (existingEvent) {
            return new Response("User already scanned into this event", {status: 409});
        }

        try {
            await createUserEvent(db, {
                userId,
                name: event
            });
        } catch (insertError: unknown) {
            const msg = insertError instanceof Error ? insertError.message : "";
            if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
                return new Response("User already scanned into this event", {status: 409});
            }
            throw insertError;
        }

        userInfo = await getBasicUserInfoByUserId(db, {
            userId
        });
    } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "";
        if (msg.includes("unique") || msg.includes("duplicate") || msg.includes("23505")) {
            return new Response("User already scanned into this event", {status: 409});
        }
        return Response.json({ error: "Invalid ID" }, { status: 400 });
    }

    return Response.json(userInfo, {
        status: 200
    });
}