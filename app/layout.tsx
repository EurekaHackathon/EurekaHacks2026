import type { Metadata } from "next";
import { Geist, Geist_Mono, Freeman, Righteous, Inter, Roboto } from "next/font/google";
import { cookies } from "next/headers";
import { validateSessionToken } from "@/lib/sessions";
import { GlobalFooter } from "@/components/GlobalFooter";
import "./globals.css";

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
  variable: "--font-roboto"
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
  return (
    <html lang="en" className={pinkTheme ? "pink-theme" : ""}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${freeman.variable} ${righteous.variable} ${inter.variable} ${roboto.variable} antialiased flex flex-col min-h-screen`}
      >
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <GlobalFooter />
      </body>
    </html>
  );
}
