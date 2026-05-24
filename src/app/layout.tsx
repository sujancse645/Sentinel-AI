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
  title:
    "SENTINEL AI — Autonomous Incident Intelligence Platform",

  description:
    "Next-generation autonomous AI operating system for infrastructure intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen overflow-hidden bg-slate-950 text-slate-200`}
      >
        {/* GLOBAL BACKGROUND */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Main gradient glow */}
          <div className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] bg-cyan-500/10 blur-[140px] rounded-full animate-pulse"></div>

          <div className="absolute bottom-[-20%] right-[5%] w-[700px] h-[700px] bg-purple-500/10 blur-[140px] rounded-full animate-pulse"></div>

          <div className="absolute top-[30%] left-[40%] w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full"></div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Radar pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[900px] h-[900px] rounded-full border border-cyan-500/10 animate-ping"></div>
          </div>

          {/* Noise texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02),transparent_70%)]"></div>
        </div>

        {/* MAIN APP */}
        <GlobalStateProvider>
          <div className="relative z-10 flex h-screen overflow-hidden">
            {/* SIDEBAR */}
            <Sidebar />

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
              {/* Top Glow */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

              <TopBar />

              {/* PAGE CONTENT */}
              <main className="flex-1 overflow-y-auto overflow-x-hidden p-6 relative">
                {/* inner subtle glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.03),transparent_60%)] pointer-events-none"></div>

                <div className="relative z-10">
                  {children}
                </div>
              </main>

              {/* Footer Glow */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/30 to-transparent"></div>

              <GlobalToast />
            </div>
          </div>
        </GlobalStateProvider>
      </body>
    </html>
  );
}