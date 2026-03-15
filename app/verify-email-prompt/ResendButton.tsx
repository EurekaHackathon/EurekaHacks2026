"use client";

import { useActionState } from "react";
import { resendEmailVerificationLink } from "@/lib/actions/auth";

const initialState: { error: string; success: boolean } = { error: "", success: false };

export default function ResendVerificationButton({
    email,
    id,
}: {
    email: string;
    id: string;
}) {
    const [state, formAction, pending] = useActionState(resendEmailVerificationLink, initialState);

    return (
        <form action={formAction} className="mt-8">
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="id" value={id} />
            {state?.success && (
                <p className="mb-4 text-green-400 font-semibold text-center">
                    Verification email resent! Check your inbox.
                </p>
            )}
            {state?.error && (
                <p className="mb-4 text-red-400 font-semibold text-center">
                    {state.error}
                </p>
            )}
            <button
                type="submit"
                disabled={pending}
                className="w-full border border-secondary-700 text-gray-100 md:text-lg py-4 rounded-xl hover:border-secondary-500 hover:bg-secondary-950 duration-200 font-semibold disabled:opacity-50"
            >
                {pending ? "Sending..." : "Resend verification email"}
            </button>
        </form>
    );
}
