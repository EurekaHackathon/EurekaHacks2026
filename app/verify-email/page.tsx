import { redirect } from "next/navigation";
import {
    getEmailVerificationTokenByToken,
    verifyUserEmail,
    deleteAllEmailVerificationTokensByUserID,
} from "@/lib/sqlc/auth_sql";
import { db } from "@/lib/database";
import { StarField } from "@/components/StarField";
import { Icon } from "@iconify/react";
import Link from "next/link";

export default async function VerifyEmailPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;

    if (!token) {
        redirect("/login");
    }

    const tokenRecord = await getEmailVerificationTokenByToken(db, { token });

    if (!tokenRecord) {
        return (
            <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
                <StarField />
                <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 max-w-[90vw] lg:w-[600px] text-center">
                    <Icon icon="mdi:close-circle-outline" className="text-6xl text-red-400 mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-bold">Invalid link</h1>
                    <p className="text-gray-400 mt-4 md:text-lg">
                        This verification link is invalid or has already been used.
                    </p>
                    <Link
                        href="/login"
                        className="inline-block mt-8 bg-[#f0c24f] text-gray-900 font-semibold md:text-xl px-8 py-4 rounded-xl hover:bg-[#e5b73e] duration-200"
                    >
                        Go to login
                    </Link>
                </div>
            </div>
        );
    }

    if (tokenRecord.expiresAt < new Date()) {
        return (
            <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
                <StarField />
                <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 max-w-[90vw] lg:w-[600px] text-center">
                    <Icon icon="mdi:clock-alert-outline" className="text-6xl text-yellow-400 mx-auto mb-6" />
                    <h1 className="text-2xl md:text-4xl font-bold">Link expired</h1>
                    <p className="text-gray-400 mt-4 md:text-lg">
                        This verification link has expired. Please sign up again to receive a new one.
                    </p>
                    <Link
                        href="/register"
                        className="inline-block mt-8 bg-[#f0c24f] text-gray-900 font-semibold md:text-xl px-8 py-4 rounded-xl hover:bg-[#e5b73e] duration-200"
                    >
                        Sign up again
                    </Link>
                </div>
            </div>
        );
    }

    await verifyUserEmail(db, { id: tokenRecord.userId });
    await deleteAllEmailVerificationTokensByUserID(db, { userId: tokenRecord.userId });

    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField />
            <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 max-w-[90vw] lg:w-[600px] text-center">
                <Icon icon="mdi:check-circle-outline" className="text-6xl text-green-400 mx-auto mb-6" />
                <h1 className="text-2xl md:text-4xl font-bold">Email verified!</h1>
                <p className="text-gray-400 mt-4 md:text-lg">
                    Your email has been verified. You can now log in to your account.
                </p>
                <Link
                    href="/login"
                    className="inline-block mt-8 bg-[#f0c24f] text-gray-900 font-semibold md:text-xl px-8 py-4 rounded-xl hover:bg-[#e5b73e] duration-200"
                >
                    Log in
                </Link>
            </div>
        </div>
    );
}
