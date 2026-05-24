"use client";

import { useEffect, useState } from "react";
import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";

import {
  BrainCircuit,
  Cpu,
  Zap,
  ActivitySquare,
  Shield,
  Rocket,
  Radar,
  Terminal,
  Orbit,
  Sparkles,
} from "lucide-react";

import { motion } from "framer-motion";

const AGENT_ICONS: Record<string, any> = {
  AnomalyDetection: ActivitySquare,
  CorrelationEngine: Zap,
  RootCauseAnalyzer: BrainCircuit,
  PredictiveForecaster: Cpu,
  RecoveryPlanner: Rocket,
  SecuritySentinel: Shield,
};

const neuralLogs = [
  "Neural mesh synchronized",
  "Threat intelligence refreshed",
  "Quantum anomaly detected",
  "AI autonomous scan initiated",
  "Behavioral engine recalibrated",
  "Sentinel swarm online",
];

export default function AIAgentsPage() {
  const { aiAgents } = useGlobalState();

  const [logs, setLogs] = useState(neuralLogs);

  const agentsList = Object.entries(aiAgents);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] AI neural activity stable`,
        ...prev.slice(0, 5),
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_60%)] pointer-events-none"></div>

      {/* HEADER */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/30 shadow-[0_0_30px_rgba(139,92,246,0.35)]">
            <BrainCircuit className="w-7 h-7 text-brand-purple" />
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight text-white text-glow-purple">
              AI AGENT NEURAL CORE
            </h1>

            <p className="text-xs font-mono tracking-[0.3em] text-brand-purple/70 uppercase">
              Autonomous Swarm Intelligence Engine
            </p>
          </div>
        </div>

        {/* STATUS */}
        <div className="hidden xl:flex items-center gap-3 px-4 py-2 rounded-xl border border-cyan-500/20 bg-slate-900/70 backdrop-blur-xl">
          <Orbit className="w-5 h-5 text-cyan-400 animate-spin" />

          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase">
              Neural Link
            </p>

            <p className="text-sm font-bold text-cyan-400">
              SYNCHRONIZED
            </p>
          </div>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 flex-1 min-h-0 relative z-10">
        {/* LEFT SIDE */}
        <div className="xl:col-span-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">
          {/* AGENTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
            {agentsList.map(([name, state], index) => {
              const Icon = AGENT_ICONS[name] || BrainCircuit;

              const isProcessing =
                state.state === "PROCESSING" ||
                state.state === "ANALYZING";

              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <HoloCard
                    className="p-6 flex flex-col h-full relative overflow-hidden"
                    glowColor={isProcessing ? "purple" : "none"}
                  >
                    {/* Glow */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(139,92,246,0.15),transparent_70%)] pointer-events-none"></div>
                    )}

                    {/* TOP */}
                    <div className="flex items-start justify-between mb-5 relative z-10">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl border ${isProcessing
                              ? "bg-brand-purple/20 border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                              : "bg-slate-900 border-slate-800"
                            }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${isProcessing
                                ? "text-brand-purple"
                                : "text-slate-500"
                              }`}
                          />
                        </div>

                        <div>
                          <h2 className="text-base font-bold text-white font-mono">
                            {name}
                          </h2>

                          <p
                            className={`text-[10px] font-black tracking-[0.25em] uppercase ${state.state === "IDLE"
                                ? "text-slate-500"
                                : state.state === "PROCESSING"
                                  ? "text-brand-amber animate-pulse"
                                  : state.state === "RESOLVED"
                                    ? "text-brand-emerald"
                                    : "text-brand-cyan"
                              }`}
                          >
                            {state.state}
                          </p>
                        </div>
                      </div>

                      {isProcessing && (
                        <div className="flex gap-1 mt-1">
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce"
                            style={{ animationDelay: "0ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      )}
                    </div>

                    {/* MIDDLE */}
                    <div className="flex-1 bg-slate-950/70 border border-slate-800/60 rounded-2xl p-5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(139,92,246,0.04))]"></div>

                      <div className="relative z-10">
                        <div className="flex justify-between items-center text-xs font-mono mb-3">
                          <span className="text-slate-500">
                            CONFIDENCE SCORE
                          </span>

                          <span
                            className={
                              state.confidence > 0.8
                                ? "text-brand-emerald"
                                : "text-brand-amber"
                            }
                          >
                            {(state.confidence * 100).toFixed(1)}%
                          </span>
                        </div>

                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-5">
                          <motion.div
                            className={`h-full ${state.confidence > 0.8
                                ? "bg-brand-emerald"
                                : "bg-brand-amber"
                              }`}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${state.confidence * 100}%`,
                            }}
                            transition={{ duration: 1 }}
                          />
                        </div>

                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-500">
                              Neural Stability
                            </span>

                            <span className="text-cyan-400">
                              OPTIMAL
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">
                              Runtime Status
                            </span>

                            <span className="text-brand-purple">
                              ACTIVE
                            </span>
                          </div>

                          <div className="flex justify-between">
                            <span className="text-slate-500">
                              Threat Sync
                            </span>

                            <span className="text-brand-emerald">
                              CONNECTED
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FOOTER */}
                    <div className="flex items-center justify-between mt-4 text-xs font-mono">
                      <div className="flex items-center gap-2 text-cyan-400">
                        <Sparkles className="w-4 h-4" />
                        Autonomous AI
                      </div>

                      <div className="text-slate-500">
                        Node #{index + 1}
                      </div>
                    </div>
                  </HoloCard>
                </motion.div>
              );
            })}
          </div>

          {/* TERMINAL */}
          <HoloCard className="p-5">
            <div className="flex items-center gap-2 mb-5">
              <Terminal className="w-4 h-4 text-cyan-400" />

              <h3 className="text-xs font-bold tracking-[0.25em] text-slate-400">
                LIVE NEURAL LOG STREAM
              </h3>
            </div>

            <div className="space-y-3 max-h-[240px] overflow-hidden">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-sm text-emerald-400 border-b border-slate-800 pb-2"
                >
                  {log}
                </motion.div>
              ))}
            </div>
          </HoloCard>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">
          {/* SYSTEM CORE */}
          <HoloCard className="p-6">
            <h3 className="text-xs font-bold tracking-[0.25em] text-slate-400 mb-5 flex items-center gap-2">
              <Radar className="w-4 h-4 text-brand-purple" />
              NEURAL CORE STATUS
            </h3>

            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: "linear",
                }}
                className="relative w-52 h-52"
              >
                <div className="absolute inset-0 rounded-full border border-brand-purple/30"></div>

                <div className="absolute inset-[15%] rounded-full border border-cyan-500/30"></div>

                <div className="absolute inset-[30%] rounded-full border border-emerald-500/30"></div>

                <div className="absolute inset-[42%] rounded-full bg-brand-purple shadow-[0_0_40px_rgba(139,92,246,0.8)]"></div>
              </motion.div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-4xl font-black text-brand-purple">
                99.8%
              </p>

              <p className="text-xs font-mono tracking-[0.2em] text-slate-500 uppercase">
                CORE SYNCHRONIZATION
              </p>
            </div>
          </HoloCard>

          {/* AI METRICS */}
          <HoloCard className="p-6 flex-1">
            <h3 className="text-xs font-bold tracking-[0.25em] text-slate-400 mb-5">
              AI SWARM METRICS
            </h3>

            <div className="space-y-5">
              {[
                ["Threat Analysis", 96],
                ["Prediction Engine", 88],
                ["Autonomous Defense", 93],
                ["Neural Learning", 91],
              ].map(([label, value], i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-mono mb-2">
                    <span className="text-slate-500">{label}</span>

                    <span className="text-cyan-400">{value}%</span>
                  </div>

                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${value}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </HoloCard>
        </div>
      </div>
    </div>
  );
}