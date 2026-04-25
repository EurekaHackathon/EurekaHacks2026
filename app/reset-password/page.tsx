import { db } from "@/lib/database";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getPasswordResetTokenByToken } from "@/lib/sqlc/auth_sql";
import PasswordResetForm from "@/components/PasswordResetForm";
import { StarField } from "@/components/StarField";

export const dynamic = "force-dynamic";

export default async function ResetPasswordPage({searchParams,}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    let passwordResetToken: string | string[] | undefined;
    let valid = true;
    try {
        passwordResetToken = (await searchParams).token;
        if (!passwordResetToken || typeof passwordResetToken !== "string") {
            redirect("/login");
        }

        const token = await getPasswordResetTokenByToken(db, {
            token: passwordResetToken
        });

        if (!token) {
            valid = false;
        }

        if (token && token.expiresAt < new Date()) {
            valid = false;
        }
    } catch (error) {
        console.log(error);
        redirect("/login");
    }

    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField/>
            <div className="relative z-10">
                {valid ? (
                    <PasswordResetForm token={passwordResetToken!.toString()}/>
                ) : (
                    <div className="bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                        <h1 className="text-2xl md:text-4xl font-bold">Invalid reset link</h1>
                        <h2 className="md:text-xl font-medium pt-2">
                            Your reset link is invalid or expired.
                        </h2>
                        <p className="pt-6">Please
                            <Link className="lg:pt-6 whitespace-pre font-semibold underline duration-100 hover:text-gray-500"
                                  href="/request-password-reset"> request a new link.</Link>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
