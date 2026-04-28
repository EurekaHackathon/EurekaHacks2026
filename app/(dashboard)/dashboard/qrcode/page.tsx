import { Suspense } from "react";
import UserQRCode from "@/components/UserQRCode";
import UserQRCodeSkeleton from "@/components/UserQRCodeSkeleton";
import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";

export default async function QRCodePage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    const user = await authorizeSession(sessionCookie?.value);
    if (!user.isAdmin) {
        redirect("/dashboard");
    }

    return (
        <Suspense fallback={<UserQRCodeSkeleton/>}>
            <UserQRCode/>
        </Suspense>
    );
}