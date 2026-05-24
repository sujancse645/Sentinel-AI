"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { Shield, ShieldAlert, Lock, Unlock, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityPage() {
  const { securityThreatLevel } = useGlobalState();
  const isHighThreat = securityThreatLevel > 70;

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      {isHighThreat && (
        <div className="absolute inset-0 bg-brand-crimson/5 animate-pulse pointer-events-none z-0"></div>
      )}
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-crimson/10 flex items-center justify-center border border-brand-crimson/30 shadow-[0_0_20px_rgba(255,59,92,0.2)]">
            <Shield className="w-6 h-6 text-brand-crimson" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-crimson">SECURITY THREAT MATRIX</h1>
            <p className="text-xs font-mono tracking-widest text-brand-crimson/60 uppercase">Live cyber-defense command center</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 relative z-10">
        <HoloCard className="p-8 flex flex-col items-center justify-center text-center relative overflow-hidden" glowColor={isHighThreat ? "red" : "amber"}>
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="absolute w-[400px] h-[400px] border-2 border-brand-crimson/20 border-dashed rounded-full pointer-events-none"
          ></motion.div>
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            className="absolute w-[300px] h-[300px] border border-brand-amber/20 rounded-full pointer-events-none"
          ></motion.div>
          
          <ShieldAlert className={`w-24 h-24 mb-6 ${isHighThreat ? "text-brand-crimson animate-pulse" : "text-brand-amber"}`} />
          <h2 className="text-xl font-bold tracking-widest text-slate-300 mb-2">GLOBAL DEFENSE POSTURE</h2>
          <div className={`text-8xl font-black font-mono tracking-tighter mb-4 ${isHighThreat ? "text-brand-crimson text-glow-crimson" : "text-brand-amber"}`}>
            {securityThreatLevel.toFixed(1)}
          </div>
          <p className="text-sm font-mono text-slate-400 max-w-sm">
            {isHighThreat 
              ? "CRITICAL THREATS DETECTED. AUTO-MITIGATION ENGAGED." 
              : "MONITORING PERIMETER TRAFFIC. SYSTEMS SECURE."}
          </p>
        </HoloCard>

        <div className="flex flex-col gap-6">
          <HoloCard className="p-6 flex-1" glowColor="cyan">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> ACTIVE THREAT VECTORS
            </h3>
            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <span className="text-slate-300">DDoS Mitigation (Edge)</span>
                <span className="text-brand-emerald">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                <span className="text-slate-300">WAF Rule Engines</span>
                <span className="text-brand-emerald">ACTIVE</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-brand-crimson/10 rounded-lg border border-brand-crimson/30">
                <span className="text-brand-crimson text-glow-crimson">Brute Force Attack (Auth)</span>
                <span className="text-brand-crimson font-black animate-pulse">BLOCKING</span>
              </div>
            </div>
          </HoloCard>

          <HoloCard className="p-6 flex-1" glowColor="none">
             <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-brand-purple" /> ACCESS CONTROLS
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-brand-crimson/10 border border-brand-crimson/30 text-brand-crimson font-bold rounded-xl hover:bg-brand-crimson/20 transition-colors flex flex-col items-center gap-2">
                <Lock className="w-6 h-6" /> LOCKDOWN API
              </button>
              <button className="p-4 bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan font-bold rounded-xl hover:bg-brand-cyan/20 transition-colors flex flex-col items-center gap-2">
                <Unlock className="w-6 h-6" /> ROTATE KEYS
              </button>
            </div>
          </HoloCard>
        </div>
      </div>
    </div>
  );
}
