import { getEmailByPasswordResetTokenID } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import { StarField } from "@/components/StarField";
import { Icon } from "@iconify/react";

export const dynamic = "force-dynamic";

export default async function PasswordResetPromptPage({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let email: string | undefined | null;
    try {
        const resetTokenId = (await searchParams).id?.toString().trim();
        if (!resetTokenId) {
            redirect("/login");
        }

        email = (await getEmailByPasswordResetTokenID(db, {
            id: resetTokenId
        }))?.email;

        if (!email) {
            redirect("/login");
        }
    } catch (error) {
        redirect("/login");
    }

    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField/>
            <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 max-w-[90vw] lg:w-[600px]">
                <div className="flex justify-center mb-6">
                    <Icon icon="mdi:email-outline" className="text-6xl text-[var(--neon-yellow)]"/>
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-center">Check your email</h1>
                <p className="md:text-lg text-gray-300 text-center mt-4">
                    We sent a password reset link to
                </p>
                <p className="md:text-lg font-semibold text-center mt-1 break-all">{email}</p>
                <p className="text-gray-400 text-sm md:text-base text-center mt-4">
                    Click the link in the email to reset your password. It expires in 15 minutes. If you don't see it,
                    check your spam folder.
                </p>
            </div>
        </div>
    );
}
