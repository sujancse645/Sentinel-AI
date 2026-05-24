"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { Rocket, GitCommit, GitPullRequest, Activity } from "lucide-react";

export default function DeploymentsPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Rocket className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">DEPLOYMENT INTELLIGENCE</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">AI-validated release pipelines</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
         <HoloCard className="p-6" glowColor="cyan">
           <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
             <Activity className="w-4 h-4 text-brand-cyan" /> LIVE DEPLOYMENTS
           </h3>
           <div className="space-y-6">
              {[
                { name: "api-gateway-v4.1.0", status: "ROLLING OUT", progress: 65, color: "text-brand-cyan" },
                { name: "auth-service-patch", status: "AI VERIFYING", progress: 90, color: "text-brand-purple" },
                { name: "payment-db-migration", status: "HALTED", progress: 12, color: "text-brand-crimson" },
              ].map((dep, i) => (
                <div key={i} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-bold font-mono text-slate-300">{dep.name}</span>
                     <span className={`text-xs font-black tracking-widest ${dep.color}`}>{dep.status}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-cyan" style={{ width: `${dep.progress}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
         </HoloCard>

         <HoloCard className="p-6" glowColor="none">
           <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
             <GitPullRequest className="w-4 h-4 text-brand-emerald" /> AI RISK ASSESSMENT
           </h3>
           <div className="flex flex-col gap-4">
             <div className="p-4 bg-brand-emerald/10 border border-brand-emerald/30 rounded-xl">
                <span className="text-brand-emerald font-bold flex items-center gap-2 mb-1"><GitCommit className="w-4 h-4" /> LOW RISK</span>
                <p className="text-xs text-slate-400 font-mono">auth-service-patch code analysis shows no structural vulnerabilities. Safe to proceed.</p>
             </div>
             <div className="p-4 bg-brand-crimson/10 border border-brand-crimson/30 rounded-xl">
                <span className="text-brand-crimson font-bold flex items-center gap-2 mb-1"><GitCommit className="w-4 h-4" /> CRITICAL RISK</span>
                <p className="text-xs text-slate-400 font-mono">payment-db-migration involves destructive schema changes with 84% probability of downtime. Rollback advised.</p>
             </div>
           </div>
         </HoloCard>
      </div>
    </div>
  );
}
