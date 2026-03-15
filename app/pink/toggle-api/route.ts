import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/sessions";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { session } = await validateSessionToken(sessionCookie.value);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pinkTheme = cookieStore.get("pink_theme");
    const newValue = pinkTheme?.value === "1" ? "0" : "1";

    const response = NextResponse.json({ active: newValue === "1" });
    response.cookies.set("pink_theme", newValue, { path: "/" });
    return response;
}
