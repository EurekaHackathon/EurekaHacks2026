import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/sessions";
import { redirect } from "next/navigation";
import PinkToggle from "./PinkToggle";

function SignInMessage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center gap-4">
            <p className="text-xl text-gray-400">Sign in: there&apos;s a surprise waiting...</p>
            <a href="/login" className="text-blue-400 underline text-sm">Sign in</a>
        </div>
    );
}

export default async function PinkPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
        return <SignInMessage />;
    }

    const { session } = await validateSessionToken(sessionCookie.value);
    if (!session) {
        return <SignInMessage />;
    }

    const pinkActive = cookieStore.get("pink_theme")?.value === "1";

    // Auto-activate on first visit
    if (!pinkActive) {
        redirect("/pink/activate");
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6">
            <PinkToggle initialActive={true} />
        </div>
    );
}
