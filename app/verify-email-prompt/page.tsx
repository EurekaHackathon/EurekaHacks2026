import { redirect } from "next/navigation";
import { getEmailByVerificationTokenID } from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { StarField } from "@/components/StarField";
import { Icon } from "@iconify/react";
import ResendButton from "./ResendButton";

export default async function VerifyEmailPromptPage({
    searchParams,
}: {
    searchParams: Promise<{ id?: string }>;
}) {
    const { id } = await searchParams;

    if (!id) {
        redirect("/register");
    }

    const result = await getEmailByVerificationTokenID(db, { id });

    if (!result) {
        redirect("/register");
    }

    const email = result.email ?? "";

    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField />
            <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 max-w-[90vw] lg:w-[600px]">
                <div className="flex justify-center mb-6">
                    <Icon icon="mdi:email-outline" className="text-6xl text-[#f0c24f]" />
                </div>
                <h1 className="text-2xl md:text-4xl font-bold text-center">Check your email</h1>
                <p className="md:text-lg text-gray-300 text-center mt-4">
                    We sent a verification link to
                </p>
                <p className="md:text-lg font-semibold text-center mt-1 break-all">{email}</p>
                <p className="text-gray-400 text-sm md:text-base text-center mt-4">
                    Click the link in the email to verify your account. It expires in 15 minutes.
                </p>

                <ResendButton email={email} id={id} />

                <p className="pt-6 text-center text-sm md:text-base text-gray-400">
                    Wrong email?{" "}
                    <a href="/register" className="font-semibold underline hover:text-gray-200 duration-100">
                        Sign up again
                    </a>
                </p>
            </div>
        </div>
    );
}
