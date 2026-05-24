"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { Maximize, Activity, Box } from "lucide-react";
import { motion } from "framer-motion";

export default function ScalingPage() {
  const { metrics } = useGlobalState();

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/30 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Maximize className="w-6 h-6 text-brand-emerald" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-emerald">AUTONOMOUS SCALING</h1>
            <p className="text-xs font-mono tracking-widest text-brand-emerald/60 uppercase">Predictive capacity management</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
         <HoloCard className="p-6 flex flex-col items-center justify-center" glowColor="emerald">
           <h3 className="text-sm font-bold tracking-widest text-slate-400 mb-8 flex items-center gap-2">
             <Activity className="w-4 h-4 text-brand-emerald" /> LIVE POD ALLOCATION
           </h3>
           <div className="grid grid-cols-4 gap-2 w-full max-w-sm mb-8">
              {Array.from({ length: 32 }).map((_, i) => (
                <motion.div 
                  key={i}
                  className={`aspect-square rounded-md border ${i < 24 ? "bg-brand-emerald/40 border-brand-emerald shadow-[0_0_10px_rgba(0,255,157,0.5)]" : "bg-slate-800/50 border-slate-700"}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                />
              ))}
           </div>
           <div className="flex items-center justify-center gap-8">
             <div className="text-center">
               <div className="text-3xl font-black font-mono text-foreground">24</div>
               <div className="text-[10px] font-bold tracking-widest text-slate-500">ACTIVE PODS</div>
             </div>
             <div className="text-center">
               <div className="text-3xl font-black font-mono text-brand-emerald">+3</div>
               <div className="text-[10px] font-bold tracking-widest text-slate-500">SCALING FACTOR</div>
             </div>
           </div>
         </HoloCard>

         <div className="flex flex-col gap-6">
           <HoloCard className="p-6 flex-1" glowColor="none">
             <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">
               <Box className="w-4 h-4 text-brand-cyan" /> RECENT SCALING EVENTS
             </h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-300">API Gateway</span>
                    <span className="text-[10px] font-mono text-slate-500">Trigger: CPU {">"} 80%</span>
                  </div>
                  <span className="text-xs font-black font-mono text-brand-emerald bg-brand-emerald/10 px-2 py-1 rounded border border-brand-emerald/30">SCALED UP (+2)</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-300">Payment Service</span>
                    <span className="text-[10px] font-mono text-slate-500">Trigger: Traffic decrease</span>
                  </div>
                  <span className="text-xs font-black font-mono text-brand-blue bg-brand-blue/10 px-2 py-1 rounded border border-brand-blue/30">SCALED DOWN (-1)</span>
                </div>
             </div>
           </HoloCard>
         </div>
      </div>
    </div>
  );
}
