"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { ShieldAlert, Activity, GitCommit, Crosshair } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IncidentsPage() {
  const { incidents, securityThreatLevel } = useGlobalState();
  const sortedIncidents = [...incidents].sort((a, b) => b.timestamp - a.timestamp);
  const activeIncidents = sortedIncidents.filter(i => i.severity !== "SAFE");

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      {/* Background Pulse if critical */}
      {activeIncidents.length > 0 && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,59,92,0.05),transparent_70%)] animate-pulse pointer-events-none z-0"></div>
      )}

      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 flex items-center justify-center border border-brand-crimson/30 shadow-[0_0_20px_rgba(255,59,92,0.2)]">
            <ShieldAlert className="w-6 h-6 text-brand-crimson" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-crimson">LIVE INCIDENT WAR ROOM</h1>
            <p className="text-xs font-mono tracking-widest text-brand-crimson/60 uppercase">Real-time threat detection & autonomous escalation</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 relative z-10">
        {/* Left: Incident Feed */}
        <div className="lg:col-span-3 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
          <AnimatePresence>
            {sortedIncidents.map((incident, idx) => {
              const isCritical = incident.severity === "CRITICAL";
              return (
                <motion.div
                  key={`${incident.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  className={`relative p-6 rounded-2xl border backdrop-blur-xl transition-all ${
                    isCritical 
                      ? "bg-brand-crimson/5 border-brand-crimson/30 shadow-[0_0_20px_rgba(255,59,92,0.1)] hover:shadow-[0_0_30px_rgba(255,59,92,0.2)]" 
                      : incident.severity === "SAFE"
                        ? "bg-brand-emerald/5 border-brand-emerald/20 hover:border-brand-emerald/40"
                        : "bg-brand-amber/5 border-brand-amber/20 hover:border-brand-amber/40"
                  }`}
                >
                  {isCritical && (
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,59,92,0.2),transparent_70%)] rounded-tr-2xl pointer-events-none"></div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest border ${
                        isCritical ? "bg-brand-crimson/20 border-brand-crimson/50 text-brand-crimson animate-pulse" :
                        incident.severity === "SAFE" ? "bg-brand-emerald/20 border-brand-emerald/50 text-brand-emerald" :
                        "bg-brand-amber/20 border-brand-amber/50 text-brand-amber"
                      }`}>
                        {incident.severity}
                      </span>
                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> {new Date(incident.timestamp * 1000).toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-brand-blue/70">AFFECTED REGION</span>
                      <p className="text-xs font-mono font-bold text-slate-300">{incident.region}</p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 drop-shadow-md">{incident.title}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono px-2 py-1 bg-slate-900/80 border border-slate-700/50 rounded text-slate-400">
                      SERVICE: <span className="text-brand-cyan">{incident.service}</span>
                    </span>
                    <span className="text-xs font-mono px-2 py-1 bg-slate-900/80 border border-slate-700/50 rounded text-slate-400">
                      CONFIDENCE: <span className="text-brand-emerald">{Math.round(incident.confidence_score * 100)}%</span>
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/50 border border-slate-800/50 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-purple/50 group-hover:bg-brand-purple transition-colors"></div>
                    <p className="text-sm text-slate-300 leading-relaxed font-mono">
                      <span className="text-brand-purple mr-2">{"[AI_ANALYSIS]"}</span>
                      {incident.ai_summary}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right: Blast Radius & Threat Level */}
        <div className="flex flex-col gap-6">
          <HoloCard className="p-6" glowColor={securityThreatLevel > 70 ? "red" : "amber"}>
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Crosshair className="w-4 h-4 text-brand-crimson" /> THREAT SEVERITY INDEX
            </h3>
            <div className="flex items-end gap-2 mb-4">
              <span className={`text-6xl font-black font-mono tracking-tighter ${
                securityThreatLevel > 70 ? "text-brand-crimson text-glow-crimson" : "text-brand-amber"
              }`}>
                {securityThreatLevel.toFixed(1)}
              </span>
              <span className="text-sm font-mono text-slate-500 mb-2">/ 100</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${securityThreatLevel > 70 ? "bg-brand-crimson" : "bg-brand-amber"}`}
                initial={{ width: 0 }}
                animate={{ width: `${securityThreatLevel}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </HoloCard>

          <HoloCard className="p-6 flex-1 flex flex-col" glowColor="none">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-brand-purple" /> CASCADING FAILURE PROBABILITY
            </h3>
            <div className="flex-1 flex items-center justify-center">
               {/* Placeholder for complex simulation graph */}
               <div className="relative w-full aspect-square max-w-[200px]">
                 <div className="absolute inset-0 rounded-full border border-slate-700"></div>
                 <div className="absolute inset-[10%] rounded-full border border-slate-700"></div>
                 <div className="absolute inset-[20%] rounded-full border border-slate-700"></div>
                 {activeIncidents.map((_, i) => (
                   <motion.div
                     key={i}
                     className="absolute w-3 h-3 bg-brand-crimson rounded-full shadow-[0_0_10px_rgba(255,59,92,0.8)]"
                     style={{
                       top: `${Math.random() * 80 + 10}%`,
                       left: `${Math.random() * 80 + 10}%`,
                     }}
                     animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                     transition={{ repeat: Infinity, duration: Math.random() * 2 + 1 }}
                   />
                 ))}
               </div>
            </div>
          </HoloCard>
        </div>
      </div>
    </div>
  );
}
