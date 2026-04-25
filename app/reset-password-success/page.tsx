import Link from "next/link";
import { StarField } from "@/components/StarField";

export const dynamic = "force-dynamic";

export default async function ResetPasswordSuccessPage() {
    return (
        <div className="bg-[#03060f] flex items-center justify-center py-32 flex-grow min-h-screen relative">
            <StarField/>
            <div className="relative z-10 bg-[#151c2b] p-8 md:p-12 lg:p-16 rounded-2xl text-gray-100 min-w-[70vw] lg:min-w-[40vw] max-w-[90vw] lg:w-[750px]">
                <h1 className="text-xl md:text-4xl font-bold">Successfully reset password</h1>
                <h2 className="md:text-xl font-medium pt-2">
                    Your password has been changed.
                </h2>
                <p className="pt-6">You may
                    <Link className="lg:pt-6 whitespace-pre font-semibold underline duration-100 hover:text-gray-500"
                          href="/login"> log in</Link> now.
                </p>
            </div>
        </div>
    );
}
