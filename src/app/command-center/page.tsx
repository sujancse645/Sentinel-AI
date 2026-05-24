"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { MetricsChart } from "@/components/charts/MetricsChart";
import { AlertTriangle, Activity, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CommandCenter() {
  const { incidents } = useGlobalState();
  const activeIncidents = incidents.filter(i => i.severity !== "SAFE");

  return (
    <div className="flex flex-col gap-6 h-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Activity className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">COMMAND CENTER</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Live Operations & Telemetry Matrix</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* Left: Charts */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          <HoloCard className="flex-1 p-6 flex flex-col" glowColor="cyan">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span> GLOBAL CPU UTILIZATION
            </h2>
            <div className="flex-1 min-h-0">
              <MetricsChart dataKey="cpu_usage" color="#00F5FF" name="CPU (%)" />
            </div>
          </HoloCard>

          <HoloCard className="flex-1 p-6 flex flex-col" glowColor="purple">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span> NETWORK LATENCY (MS)
            </h2>
            <div className="flex-1 min-h-0">
              <MetricsChart dataKey="latency_ms" color="#8B5CF6" name="Latency (ms)" />
            </div>
          </HoloCard>
        </div>

        {/* Right: Active Incidents Radar */}
        <HoloCard className="flex flex-col p-6 overflow-hidden relative" glowColor="none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,59,92,0.1),transparent_50%)]"></div>
          
          <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-4 flex items-center justify-between relative z-10">
            <span className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-brand-crimson" /> TACTICAL INCIDENT FEED
            </span>
            <span className="px-2 py-0.5 bg-brand-crimson/20 border border-brand-crimson/50 rounded-md text-xs font-mono text-brand-crimson shadow-[0_0_10px_rgba(255,59,92,0.3)]">
              {activeIncidents.length} LIVE
            </span>
          </h2>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 relative z-10 pr-2">
            <AnimatePresence>
              {activeIncidents.map((incident, idx) => (
                <motion.div
                  key={`${incident.id}-${idx}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`p-4 rounded-xl border backdrop-blur-md ${
                    incident.severity === "CRITICAL" 
                      ? "bg-brand-crimson/10 border-brand-crimson/30 shadow-[0_0_15px_rgba(255,59,92,0.2)]" 
                      : "bg-brand-amber/10 border-brand-amber/30 shadow-[0_0_15px_rgba(255,183,3,0.1)]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-black tracking-widest ${
                      incident.severity === "CRITICAL" ? "text-brand-crimson" : "text-brand-amber"
                    }`}>{incident.severity}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {new Date(incident.timestamp * 1000).toLocaleTimeString()}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground mb-1">{incident.title}</h3>
                  <p className="text-[11px] text-slate-400 font-mono truncate">{incident.service}</p>
                </motion.div>
              ))}
              {activeIncidents.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 mt-12">
                  <div className="w-16 h-16 rounded-full border border-slate-700/50 flex items-center justify-center mb-4 relative">
                    <div className="absolute w-12 h-12 rounded-full border border-slate-700/50 animate-ping opacity-20"></div>
                    <ShieldCheck className="w-6 h-6 text-slate-600 absolute" />
                  </div>
                  <p className="text-xs font-mono">NO ACTIVE THREATS</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </HoloCard>
      </div>
    </div>
  );
}
