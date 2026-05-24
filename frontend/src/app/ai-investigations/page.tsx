"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { BrainCircuit, Cpu, Zap, ActivitySquare, Shield, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const AGENT_ICONS: Record<string, any> = {
  "AnomalyDetection": ActivitySquare,
  "CorrelationEngine": Zap,
  "RootCauseAnalyzer": BrainCircuit,
  "PredictiveForecaster": Cpu,
  "RecoveryPlanner": Rocket,
  "SecuritySentinel": Shield,
};

export default function AIAgentsPage() {
  const { aiAgents } = useGlobalState();
  const agentsList = Object.entries(aiAgents);

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <BrainCircuit className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-purple drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">AI AGENT NEURAL CORE</h1>
            <p className="text-xs font-mono tracking-widest text-brand-purple/60 uppercase">Autonomous swarm intelligence engine</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1 min-h-0 overflow-y-auto custom-scrollbar pr-2 relative z-10">
        {agentsList.map(([name, state]) => {
          const Icon = AGENT_ICONS[name] || BrainCircuit;
          const isProcessing = state.state === "PROCESSING" || state.state === "ANALYZING";

          return (
            <HoloCard key={name} className="p-6 flex flex-col" glowColor={isProcessing ? "purple" : "none"}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isProcessing ? "bg-brand-purple/20 shadow-[0_0_15px_rgba(139,92,246,0.3)] animate-pulse" : "bg-slate-800"}`}>
                    <Icon className={`w-5 h-5 ${isProcessing ? "text-brand-purple" : "text-slate-500"}`} />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-foreground font-mono">{name}</h2>
                    <p className={`text-[10px] font-black tracking-widest ${
                      state.state === "IDLE" ? "text-slate-500" :
                      state.state === "PROCESSING" ? "text-brand-amber animate-pulse" :
                      state.state === "RESOLVED" ? "text-brand-emerald" :
                      "text-brand-cyan"
                    }`}>{state.state}</p>
                  </div>
                </div>
                {isProcessing && (
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                )}
              </div>

              <div className="flex-1 min-h-0 bg-slate-950/80 rounded-xl border border-slate-800/50 p-4 relative group">
                 {isProcessing && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-purple/5 pointer-events-none group-hover:to-brand-purple/10 transition-colors"></div>
                 )}
                 <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-xs font-mono">
                     <span className="text-slate-500">CONFIDENCE:</span>
                     <span className={state.confidence > 0.8 ? "text-brand-emerald" : "text-brand-amber"}>
                       {(state.confidence * 100).toFixed(1)}%
                     </span>
                   </div>
                   <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                     <div 
                       className={`h-full ${state.confidence > 0.8 ? "bg-brand-emerald" : "bg-brand-amber"}`} 
                       style={{ width: `${state.confidence * 100}%` }}
                     />
                   </div>
                 </div>
              </div>
            </HoloCard>
          );
        })}
      </div>
    </div>
  );
}
