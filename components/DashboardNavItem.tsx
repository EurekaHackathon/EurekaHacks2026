"use client";

import { Icon } from "@iconify/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface props {
    icon: string;
    text: string;
    route: string;
}

export default function DashboardNavItem({ icon, text, route }: props) {
    const pathname = usePathname();
    const isActive = pathname === route;

    return (
        <Link href={route} className={`flex gap-2 hover:bg-gray-600 hover:bg-opacity-10 duration-75 py-2 px-4 rounded-lg
                      ${isActive ? "bg-gray-600 bg-opacity-10" : ""}
                      ${isActive ? "text-[var(--neon-yellow)]" : "text-secondary-50"}`}>
            <div className="min-w-6">
                <Icon icon={icon} className="text-2xl"/>
            </div>
            <span className="font-semibold">{text}</span>
        </Link>
    );
}