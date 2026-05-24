"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Activity, ShieldAlert, Shield, ShieldCheck, Globe, Wifi, Command } from "lucide-react";

export function TopBar() {
  const { metrics, isConnected, latestAILog, securityThreatLevel } = useGlobalState();
  const health = metrics.system_health;

  let HealthIcon = ShieldCheck;
  let healthColor = "text-brand-emerald";
  let healthBg = "bg-brand-emerald/10 border-brand-emerald/30 shadow-[0_0_15px_rgba(0,255,157,0.3)]";
  let statusText = "SYSTEM STABLE";

  if (health < 50 || securityThreatLevel > 70) {
    HealthIcon = ShieldAlert;
    healthColor = "text-brand-crimson text-glow-crimson";
    healthBg = "bg-brand-crimson/20 border-brand-crimson/50 shadow-[0_0_20px_rgba(255,59,92,0.5)] animate-pulse";
    statusText = securityThreatLevel > 70 ? "THREAT DETECTED" : "CRITICAL FAILURE";
  } else if (health < 80) {
    HealthIcon = Shield;
    healthColor = "text-brand-amber";
    healthBg = "bg-brand-amber/10 border-brand-amber/30 shadow-[0_0_15px_rgba(255,183,3,0.3)]";
    statusText = "DEGRADED PERFORMANCE";
  }

  return (
    <header className="h-20 border-b border-slate-800/50 bg-background-dark/80 backdrop-blur-2xl flex items-center justify-between px-8 sticky top-0 z-40">
      
      {/* Left: Global Map & Connection Status */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 px-3 py-1.5 rounded-lg shadow-inner">
          <Globe className="w-4 h-4 text-brand-blue" />
          <span className="text-xs font-mono text-slate-300">GLOBAL SENSOR NET</span>
          <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse shadow-[0_0_10px_#00F5FF]"></div>
        </div>

        <div className="h-6 border-l border-slate-800/50"></div>

        <div className="flex flex-col justify-center max-w-xl overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            <Activity className={`w-3 h-3 ${isConnected ? "text-brand-cyan" : "text-slate-600"}`} />
            <span className="text-[10px] font-mono tracking-widest text-brand-cyan/70 uppercase">
              {isConnected ? "Live Neural Telemetry" : "Establishing Uplink"}
            </span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={latestAILog || "none"}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              className="text-sm font-mono text-foreground font-medium truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
            >
              {latestAILog || "AI Engine standing by. All systems nominal."}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Health, Voice, Action */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4 bg-slate-900/40 border border-slate-800/60 rounded-xl px-4 py-2">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-brand-blue/80 font-bold tracking-[0.2em]">AVG LATENCY</span>
            <span className="text-sm font-mono text-foreground">{metrics.latency_ms.toFixed(0)} <span className="text-brand-blue/50 text-xs">ms</span></span>
          </div>
          <div className="w-px h-8 bg-slate-800/50"></div>
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-brand-purple/80 font-bold tracking-[0.2em]">THROUGHPUT</span>
            <span className="text-sm font-mono text-foreground">{metrics.requests_per_sec} <span className="text-brand-purple/50 text-xs">r/s</span></span>
          </div>
        </div>

        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${healthBg} transition-all duration-500`}>
          <HealthIcon className={`w-5 h-5 ${healthColor}`} />
          <div className="flex flex-col">
            <span className={`text-xs font-black tracking-widest ${healthColor}`}>
              {statusText}
            </span>
            <span className="text-[10px] font-mono text-slate-400">INTEGRITY: {health.toFixed(1)}%</span>
          </div>
        </div>

        <div className="h-8 border-l border-slate-800/50"></div>

        <div className="flex items-center gap-3">
          <button className="relative group p-3 rounded-full bg-slate-900/50 border border-slate-800 hover:bg-brand-cyan/10 hover:border-brand-cyan/40 transition-all">
            <Command className="w-5 h-5 text-slate-400 group-hover:text-brand-cyan transition-colors" />
          </button>
          
          <button className="relative flex items-center justify-center w-12 h-12 rounded-full border border-brand-purple/30 bg-brand-purple/10 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:scale-105 transition-transform group">
            <div className="absolute inset-0 rounded-full border border-brand-purple/50 animate-ping opacity-20"></div>
            <Mic className="w-5 h-5 text-brand-purple drop-shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
          </button>
        </div>
      </div>
    </header>
  );
}

