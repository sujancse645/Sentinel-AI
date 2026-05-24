"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Cpu, Globe, Crosshair } from "lucide-react";
import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { CyberGrid } from "@/components/ui/CyberGrid";
import { ParticleSystem } from "@/components/ui/ParticleSystem";
import { HoloCard } from "@/components/ui/HoloCard";

export default function Overview() {
  const { metrics, securityThreatLevel, incidents } = useGlobalState();
  const [displayText, setDisplayText] = useState("");
  const fullText = "Autonomous Intelligence for the Future of Infrastructure.";
  
  // Cinematic Typing Effect
  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const criticalCount = incidents.filter(i => i.severity === "CRITICAL").length;

  return (
    <div className="relative flex flex-col h-full overflow-hidden p-8">
      {/* Backgrounds */}
      <CyberGrid />
      <ParticleSystem />

      {/* Main Cinematic Hero */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          {/* Glowing Orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-cyan/20 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
          
          <h1 className="text-8xl md:text-9xl font-black tracking-tighter mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-300 to-slate-600 drop-shadow-2xl">
              SENTINEL
            </span>
            <span className="text-brand-cyan text-glow-cyan drop-shadow-[0_0_30px_rgba(0,245,255,0.8)]">.AI</span>
          </h1>
        </motion.div>

        <h2 className="text-xl md:text-2xl font-mono text-brand-cyan/80 mb-6 h-8">
          {displayText}<motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity }} className="inline-block w-3 h-6 bg-brand-cyan ml-1 align-middle"></motion.span>
        </h2>

        <p className="text-sm font-bold tracking-[0.3em] text-foreground-secondary uppercase max-w-2xl mx-auto drop-shadow-lg mb-12">
          Detect. <span className="text-brand-cyan">Predict.</span> Investigate. <span className="text-brand-purple">Recover.</span>
        </p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string, value: string, icon: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-md flex flex-col items-center justify-center gap-3"
    >
      <div className="p-3 rounded-full bg-slate-800/80 border border-slate-700">
        {icon}
      </div>
      <div className="flex flex-col items-center">
        <span className="text-3xl font-bold font-mono text-slate-100">{value}</span>
        <span className="text-[10px] tracking-widest text-slate-500 font-bold mt-1">{title}</span>
      </div>
    </motion.div>
  );
}
