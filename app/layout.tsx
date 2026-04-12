import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Freeman,
  Righteous,
  Inter,
  Roboto,
} from "next/font/google";
import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/sessions";
import { GlobalFooter } from "@/components/GlobalFooter";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const freeman = Freeman({
  variable: "--font-freeman",
  weight: "400",
  subsets: ["latin"],
});

const righteous = Righteous({
  variable: "--font-righteous",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "EUREKAHACKS 2026",
  description: "EUREKAHACKS - March 2026 Hackathon",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  let pinkTheme = false;
  if (sessionCookie && cookieStore.get("pink_theme")?.value === "1") {
    const { session } = await validateSessionToken(sessionCookie.value);
    pinkTheme = !!session;
  }
  const isMockMode = process.env.MOCK_MODE === "true";
  if (isMockMode) {
    console.warn("\x1b[33m⚠️  MOCK_MODE is ON — no real database is being used. Set MOCK_MODE=false in .env.local before deploying.\x1b[0m");
  }
  return (
    <html lang="en" className={pinkTheme ? "pink-theme" : ""}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${freeman.variable} ${righteous.variable} ${inter.variable} ${roboto.variable} antialiased flex flex-col min-h-screen`}
      >
        {isMockMode && (
          <div className="fixed bottom-4 right-4 z-[9999] bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
            ⚠️ MOCK MODE — turn off before deploying
          </div>
        )}
        <div className="flex-1 flex flex-col">{children}</div>
        <GlobalFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
