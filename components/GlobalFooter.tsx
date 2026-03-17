"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export function GlobalFooter() {
    const pathname = usePathname();
    if (pathname?.startsWith("/dashboard")) {
        return null;
    }
    return <Footer />;
}
