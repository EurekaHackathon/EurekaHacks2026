import RequestPasswordResetForm from "@/components/RequestPasswordResetForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { validateSessionToken } from "@/lib/sessions";
import { StarField } from "@/components/StarField";

export default async function PasswordResetRequestPage() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");

    if (sessionToken) {
        const sessionValidationResult = await validateSessionToken(sessionToken.value);
        if (sessionValidationResult.session && sessionValidationResult.user) {
            redirect("/dashboard");
        }
    }

    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField/>
            <div className="relative z-10">
                <RequestPasswordResetForm/>
            </div>
        </div>
    );
}
