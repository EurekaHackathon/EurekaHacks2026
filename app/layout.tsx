import type { Metadata } from "next";
import { Geist, Geist_Mono, Freeman, Righteous, Inter, Roboto } from "next/font/google";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${freeman.variable} ${righteous.variable} ${inter.variable} ${roboto.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
