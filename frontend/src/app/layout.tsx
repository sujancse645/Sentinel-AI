import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalStateProvider } from "@/lib/store/GlobalStateProvider";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { GlobalToast } from "@/components/ui/GlobalToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SENTINEL AI — Autonomous Incident Intelligence Platform",
  description: "Next-generation autonomous AI operating system for infrastructure intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 overflow-hidden flex`}
      >
        <GlobalStateProvider>
          <Sidebar />
          <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
            <TopBar />
            <main className="flex-1 overflow-y-auto overflow-x-hidden p-6">
              {children}
            </main>
            <GlobalToast />
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}
