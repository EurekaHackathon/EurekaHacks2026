import { cookies } from "next/headers";
import { authorizeSession } from "@/lib/sessions";
import { redirect } from "next/navigation";
import { NFCBadgeClient } from "@/components/NFCBadgeClient";

export default async function UserQRCode() {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session");
    const user = await authorizeSession(sessionToken?.value);
    if (!user) redirect("/login");
    if (!user.isAdmin) redirect("/dashboard");

    return (
        <div className="flex p-12 justify-center items-center min-h-screen">
            <div
                className="flex flex-col items-center bg-[#151c2b] border border-gray-300 p-8 md:p-10 lg:p-12 rounded-xl max-w-md w-full">
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-secondary-50 font-bold">NFC Badge</h1>
                    <p className="md:text-lg text-gray-500 mt-1">Use this to check in and receive food.</p>
                </div>
                <NFCBadgeClient encryptedId={user.id.toString()} />
            </div>
        </div>
    );
}