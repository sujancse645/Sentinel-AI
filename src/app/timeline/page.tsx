"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { Clock, ShieldAlert, CheckCircle, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TimelinePage() {
  const { incidents } = useGlobalState();
  const sortedIncidents = [...incidents].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Clock className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">HISTORICAL TIMELINE</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Chronological incident and resolution record</p>
          </div>
        </div>
      </div>

      <HoloCard className="flex-1 overflow-y-auto p-8 custom-scrollbar relative" glowColor="cyan">
        <div className="absolute top-0 bottom-0 left-12 w-[2px] bg-slate-800"></div>

        <div className="space-y-8 relative">
          <AnimatePresence>
            {sortedIncidents.map((incident, idx) => {
              const isCritical = incident.severity === "CRITICAL";
              return (
                <motion.div
                  key={`${incident.id}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-8 relative z-10"
                >
                  <div className="w-8 flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                      isCritical ? "bg-brand-crimson/20 border-brand-crimson/50 text-brand-crimson shadow-[0_0_15px_rgba(255,59,92,0.5)]" :
                      incident.severity === "SAFE" ? "bg-brand-emerald/20 border-brand-emerald/50 text-brand-emerald" :
                      "bg-brand-amber/20 border-brand-amber/50 text-brand-amber"
                    }`}>
                      {isCritical ? <ShieldAlert className="w-4 h-4" /> : incident.severity === "SAFE" ? <CheckCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                    </div>
                  </div>

                  <div className={`flex-1 p-6 rounded-2xl border backdrop-blur-md transition-all ${
                    isCritical 
                      ? "bg-brand-crimson/5 border-brand-crimson/30" 
                      : incident.severity === "SAFE"
                        ? "bg-brand-emerald/5 border-brand-emerald/20"
                        : "bg-brand-amber/5 border-brand-amber/20"
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono text-slate-500">
                        {new Date(incident.timestamp * 1000).toLocaleString()}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black tracking-widest border ${
                        isCritical ? "bg-brand-crimson/20 border-brand-crimson/50 text-brand-crimson" :
                        incident.severity === "SAFE" ? "bg-brand-emerald/20 border-brand-emerald/50 text-brand-emerald" :
                        "bg-brand-amber/20 border-brand-amber/50 text-brand-amber"
                      }`}>
                        {incident.severity}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2">{incident.title}</h3>
                    
                    <div className="flex items-center gap-4 mb-4 text-xs font-mono">
                      <span className="text-slate-400">SERVICE: <span className="text-brand-cyan">{incident.service}</span></span>
                      <span className="text-slate-400">REGION: <span className="text-brand-purple">{incident.region}</span></span>
                    </div>

                    <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-800/50">
                      <p className="text-sm text-slate-300 font-mono flex items-start gap-2">
                        <BrainCircuit className="w-4 h-4 text-brand-purple mt-0.5" />
                        <span>{incident.ai_summary}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </HoloCard>
    </div>
  );
}
