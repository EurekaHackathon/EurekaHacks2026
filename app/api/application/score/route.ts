import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { upsertApplicationScore } from "@/lib/sqlc/scores_sql";
import { db } from "@/lib/database";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("session");

    const user = await authorizeSession(sessionId?.value);
    if (!user.isAdmin) {
        return new Response("Unauthorized", { status: 401 });
    }

    const formData = await request.formData();
    const applicationId = formData.get("applicationId");
    const score = formData.get("score");

    if (!applicationId || typeof applicationId !== "string" || isNaN(parseInt(applicationId))) {
        return new Response("Invalid application ID", { status: 400 });
    }

    const scoreNum = parseInt(score as string);
    if (!score || isNaN(scoreNum) || scoreNum < 1 || scoreNum > 7) {
        return new Response("Score must be between 1 and 7", { status: 400 });
    }

    try {
        await upsertApplicationScore(db, {
            applicationId: parseInt(applicationId),
            userId: user.id,
            score: scoreNum,
        });
        return new Response("Success", { status: 200 });
    } catch (e) {
        console.error(e);
        return new Response("Error", { status: 500 });
    }
}
