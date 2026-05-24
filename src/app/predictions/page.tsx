"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { Bot, TrendingDown, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function PredictionsPage() {
  const { metrics } = useGlobalState();
  const riskScore = metrics.cpu_usage > 80 ? 85 : metrics.latency_ms > 1000 ? 70 : 12;
  const isHighRisk = riskScore > 50;

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Bot className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">PREDICTIVE FAILURE ENGINE</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Forecasting outages before they happen</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
        <HoloCard className="p-8 flex flex-col items-center justify-center text-center relative overflow-hidden" glowColor={isHighRisk ? "red" : "cyan"}>
          {isHighRisk && (
            <motion.div animate={{ opacity: [0, 0.2, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute inset-0 bg-brand-crimson">
            </motion.div>
          )}
          <Bot className={`w-24 h-24 mb-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] ${isHighRisk ? "text-brand-crimson animate-pulse" : "text-brand-cyan"}`} />
          <h2 className="text-xl font-bold text-slate-300 tracking-widest mb-2">INFRASTRUCTURE RISK SCORE</h2>
          <div className={`text-9xl font-black font-mono tracking-tighter mb-4 ${isHighRisk ? "text-brand-crimson text-glow-crimson" : "text-brand-cyan text-glow-cyan"}`}>
            {riskScore}%
          </div>
          {isHighRisk ? (
            <p className="text-brand-crimson font-mono font-bold tracking-widest bg-brand-crimson/10 px-4 py-2 rounded-xl border border-brand-crimson/30">
              HIGH PROBABILITY OF CASCADING FAILURE
            </p>
          ) : (
            <p className="text-brand-emerald font-mono tracking-widest">INFRASTRUCTURE OPERATING WITHIN SAFE PREDICTIVE MARGINS</p>
          )}
        </HoloCard>

        <div className="flex flex-col gap-6">
          <HoloCard className="p-6 flex-1" glowColor="amber">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Target className="w-4 h-4 text-brand-amber" /> FORECASTED VULNERABILITIES
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-slate-300">Database Connection Exhaustion</span>
                <span className="text-xs font-black font-mono text-brand-amber bg-brand-amber/10 px-3 py-1.5 rounded border border-brand-amber/30">68% PROBABILITY</span>
              </li>
              <li className="flex items-center justify-between p-4 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-slate-300">Auth Service Memory Leak</span>
                <span className="text-xs font-black font-mono text-brand-amber bg-brand-amber/10 px-3 py-1.5 rounded border border-brand-amber/30">42% PROBABILITY</span>
              </li>
            </ul>
          </HoloCard>

          <HoloCard className="p-6 flex-1" glowColor="emerald">
            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-brand-emerald" /> RECOMMENDED PREVENTIVE ACTIONS
            </h3>
            <ul className="space-y-4 font-mono text-sm">
              <li className="text-slate-300 flex items-center gap-3 p-3 bg-brand-emerald/5 rounded-lg border border-brand-emerald/20">
                <div className="w-2 h-2 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(0,255,157,0.8)]"></div> Pre-scale Kubernetes nodes in EU region
              </li>
              <li className="text-slate-300 flex items-center gap-3 p-3 bg-brand-emerald/5 rounded-lg border border-brand-emerald/20">
                <div className="w-2 h-2 rounded-full bg-brand-emerald shadow-[0_0_10px_rgba(0,255,157,0.8)]"></div> Clear Redis cache proactively
              </li>
            </ul>
          </HoloCard>
        </div>
      </div>
    </div>
  );
}

