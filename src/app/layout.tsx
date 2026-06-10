import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flare — AI-Powered Automation & Growth Ecosystem",
  description:
    "Flare creates AI-powered systems, tools and automations that help creators and businesses reclaim time, scale intelligently and focus on what matters.",
  keywords: ["AI automation", "productivity", "growth platform", "digital products", "workflow automation"],
  openGraph: {
    title: "Flare — AI-Powered Automation & Growth Ecosystem",
    description: "Build Faster. Think Clearer. Automate Everything.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
