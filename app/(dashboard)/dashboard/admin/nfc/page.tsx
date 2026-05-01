import { NFCBadgeClient } from "@/components/NFCBadgeClient";

export default async function NFCAdminPage() {
    return (
        <div className="mt-8 max-w-md">
            <h2 className="text-2xl font-bold text-gray-700">NFC Badge</h2>
            <p className="text-gray-500 mt-1">Read badges and assign chips to hackers.</p>
            <NFCBadgeClient />
        </div>
    );
}
