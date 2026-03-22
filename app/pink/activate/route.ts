import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/sessions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/pink", url.origin));
    }

    const { session } = await validateSessionToken(sessionCookie.value);
    if (!session) {
        return NextResponse.redirect(new URL("/pink", url.origin));
    }

    const response = NextResponse.redirect(new URL("/pink", url.origin));
    response.cookies.set("pink_theme", "1", { path: "/" });
    return response;
}
