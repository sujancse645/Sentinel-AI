"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { Wrench, Rocket, Cpu, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function RecoveryPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-emerald/10 flex items-center justify-center border border-brand-emerald/30 shadow-[0_0_20px_rgba(0,255,157,0.2)]">
            <Wrench className="w-6 h-6 text-brand-emerald" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-emerald">AI RECOVERY CENTER</h1>
            <p className="text-xs font-mono tracking-widest text-brand-emerald/60 uppercase">Autonomous remediation and self-healing</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <HoloCard className="p-6" glowColor="emerald">
          <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
             <Rocket className="w-4 h-4 text-brand-emerald" /> AUTONOMOUS ACTIONS
          </h2>
          <div className="space-y-4">
            {[
              { title: "K8s Pod Restart (Auth)", time: "2m ago", status: "SUCCESS" },
              { title: "Database Failover (EU-Central)", time: "15m ago", status: "SUCCESS" },
              { title: "Cache Eviction (Redis-02)", time: "1h ago", status: "SUCCESS" },
            ].map((action, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                 <div>
                   <h3 className="text-sm font-bold text-slate-200">{action.title}</h3>
                   <span className="text-xs font-mono text-slate-500">{action.time}</span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 bg-brand-emerald/10 border border-brand-emerald/30 rounded text-brand-emerald text-xs font-bold font-mono">
                   <CheckCircle className="w-3 h-3" /> {action.status}
                 </div>
              </div>
            ))}
          </div>
        </HoloCard>

        <HoloCard className="p-6 flex flex-col justify-center items-center text-center" glowColor="none">
           <Cpu className="w-24 h-24 text-slate-700 mb-6" />
           <h2 className="text-xl font-bold text-slate-300 mb-2">SYSTEMS OPTIMAL</h2>
           <p className="text-slate-500 font-mono text-sm mb-8">No manual intervention required. Self-healing algorithms are actively monitoring the cluster state.</p>
           <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold text-slate-300 transition-colors">
             VIEW RECOVERY LOGS
           </button>
        </HoloCard>
      </div>
    </div>
  );
}
