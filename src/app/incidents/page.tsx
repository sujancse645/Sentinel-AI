"use client";

import { useEffect, useState } from "react";
import { HoloCard } from "@/components/ui/HoloCard";

import {
  ShieldAlert,
  Activity,
  Crosshair,
  Terminal,
  Globe,
  Cpu,
  Radar,
  Zap,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const mockIncidents = [
  {
    id: 1,
    severity: "CRITICAL",
    timestamp: Math.floor(Date.now() / 1000),
    region: "US-EAST-1",
    title: "Ransomware Activity Detected",
    service: "Auth Gateway",
    confidence_score: 0.97,
    ai_summary:
      "AI detected abnormal encryption patterns and lateral movement attempts across authentication nodes.",
  },

  {
    id: 2,
    severity: "WARNING",
    timestamp: Math.floor(Date.now() / 1000),
    region: "EU-WEST-2",
    title: "Suspicious API Traffic Spike",
    service: "Payments API",
    confidence_score: 0.82,
    ai_summary:
      "Traffic anomaly detected from rotating IP addresses targeting payment endpoints.",
  },

  {
    id: 3,
    severity: "SAFE",
    timestamp: Math.floor(Date.now() / 1000),
    region: "AP-SOUTH-1",
    title: "System Stabilized",
    service: "AI Monitoring",
    confidence_score: 0.99,
    ai_summary:
      "Previous instability resolved automatically through autonomous AI recovery protocols.",
  },
];

const terminalLogs = [
  "[02:41:22] Threat signature matched",
  "[02:41:25] AI quarantine initiated",
  "[02:41:27] Node isolation successful",
  "[02:41:29] Monitoring outbound traffic",
  "[02:41:33] DNS anomaly detected",
  "[02:41:37] Autonomous mitigation active",
];

export default function IncidentsPage() {
  const [incidents] = useState(mockIncidents);

  const [logs, setLogs] = useState(terminalLogs);

  const sortedIncidents = [...incidents].sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const activeIncidents = sortedIncidents.filter(
    (i) => i.severity !== "SAFE"
  );

  const securityThreatLevel = 78.4;

  useEffect(() => {
    const interval = setInterval(() => {
      setLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] AI monitoring active`,
        ...prev.slice(0, 7),
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col gap-6 h-full p-6 overflow-hidden bg-[#030712]">

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <div className="absolute top-[-10%] left-[10%] w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full"></div>

        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-500/10 blur-[180px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center justify-between">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-3xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,0,60,0.25)]">

            <ShieldAlert className="w-8 h-8 text-red-400" />

          </div>

          <div>

            <h1 className="text-5xl font-black text-white tracking-tight">
              LIVE INCIDENT WAR ROOM
            </h1>

            <p className="mt-2 text-xs uppercase tracking-[0.4em] text-red-400/70 font-mono">
              Real-time threat detection & autonomous escalation
            </p>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">

        {/* LEFT */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">

          {/* WORLD MAP */}
          <div className="relative h-[460px] overflow-hidden rounded-[32px] border border-cyan-500/20 bg-black/40 backdrop-blur-2xl">

            {/* GRID */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(0,255,255,0.15) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
              }}
            />

            {/* WORLD MAP */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">

              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                alt="world map"
                className="w-[92%] object-contain"
              />

            </div>

            {/* RADAR SWEEP */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "linear",
              }}
            >
              <div className="absolute left-1/2 top-1/2 w-[2px] h-[50%] bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"></div>
            </motion.div>

            {/* RADAR CIRCLES */}
            <div className="absolute inset-0 flex items-center justify-center">

              <div className="relative w-[400px] h-[400px]">

                <div className="absolute inset-0 rounded-full border border-cyan-500/20"></div>

                <div className="absolute inset-[15%] rounded-full border border-cyan-500/20"></div>

                <div className="absolute inset-[30%] rounded-full border border-cyan-500/20"></div>

                <div className="absolute inset-[45%] rounded-full border border-cyan-500/20"></div>

              </div>

            </div>

            {/* THREAT NODES */}
            {[...Array(28)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(0,255,255,1)]"
                style={{
                  top: `${Math.random() * 85}%`,
                  left: `${Math.random() * 90}%`,
                }}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  repeat: Infinity,
                  duration: Math.random() * 4 + 2,
                }}
              />
            ))}

            {/* TITLE */}
            <div className="absolute top-6 left-6">

              <div className="flex items-center gap-3 mb-2">

                <Globe className="w-7 h-7 text-cyan-400" />

                <h2 className="text-3xl font-black text-cyan-300">
                  GLOBAL THREAT MATRIX
                </h2>

              </div>

              <p className="text-xs uppercase tracking-[0.35em] text-cyan-500/60 font-mono">
                Autonomous Neural Defense Grid
              </p>

            </div>

            {/* STATUS BAR */}
            <div className="absolute bottom-5 left-5 right-5">

              <div className="rounded-2xl border border-cyan-500/20 bg-black/60 backdrop-blur-xl p-4 font-mono text-xs text-cyan-300 space-y-1">

                <div>[AI] Monitoring 142 global nodes...</div>
                <div>[AI] Threat signatures synchronized...</div>
                <div>[AI] Autonomous response engine active...</div>
                <div>[SYS] Quantum defense mesh operational...</div>

              </div>

            </div>

          </div>

          {/* INCIDENT FEED */}
          <AnimatePresence>

            {sortedIncidents.map((incident, idx) => {

              const isCritical = incident.severity === "CRITICAL";

              return (
                <motion.div
                  key={`${incident.id}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`relative overflow-hidden rounded-[30px] border p-6 backdrop-blur-2xl ${isCritical
                    ? "border-red-500/30 bg-red-500/5 shadow-[0_0_30px_rgba(255,0,80,0.15)]"
                    : incident.severity === "SAFE"
                      ? "border-emerald-500/20 bg-emerald-500/5"
                      : "border-amber-500/20 bg-amber-500/5"
                    }`}
                >

                  <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-3xl rounded-full"></div>

                  <div className="flex items-start justify-between mb-5">

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest border ${isCritical
                          ? "bg-red-500/20 border-red-500/50 text-red-400 animate-pulse"
                          : incident.severity === "SAFE"
                            ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                            : "bg-amber-500/20 border-amber-500/50 text-amber-400"
                          }`}
                      >
                        {incident.severity}
                      </span>

                      <span className="text-xs font-mono text-slate-500 flex items-center gap-1">

                        <Activity className="w-3 h-3" />

                        {new Date(
                          incident.timestamp * 1000
                        ).toLocaleTimeString()}

                      </span>

                    </div>

                    <div className="text-right">

                      <span className="text-[10px] font-mono text-cyan-400/60">
                        REGION
                      </span>

                      <p className="text-xs font-mono font-bold text-slate-300">
                        {incident.region}
                      </p>

                    </div>

                  </div>

                  <h3 className="text-3xl font-black text-white mb-4">
                    {incident.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-5">

                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400">
                      SERVICE:
                      <span className="ml-1 text-cyan-400">
                        {incident.service}
                      </span>
                    </span>

                    <span className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-400">
                      CONFIDENCE:
                      <span className="ml-1 text-emerald-400">
                        {Math.round(
                          incident.confidence_score * 100
                        )}
                        %
                      </span>
                    </span>

                  </div>

                  <div className="rounded-2xl border border-slate-800 bg-black/40 p-5">

                    <p className="text-sm text-slate-300 leading-relaxed font-mono">

                      <span className="text-purple-400 mr-2">
                        [AI_ANALYSIS]
                      </span>

                      {incident.ai_summary}

                    </p>

                  </div>

                </motion.div>
              );
            })}

          </AnimatePresence>

        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">

          {/* THREAT LEVEL */}
          <HoloCard className="p-6">

            <div className="flex items-center gap-2 mb-4">

              <Crosshair className="w-5 h-5 text-red-400" />

              <h3 className="text-xs tracking-widest text-slate-400 font-bold">
                THREAT SEVERITY INDEX
              </h3>

            </div>

            <div className="flex items-end gap-2 mb-4">

              <span className="text-7xl font-black font-mono text-red-400">
                {securityThreatLevel}
              </span>

              <span className="text-sm text-slate-500 mb-3">
                /100
              </span>

            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">

              <motion.div
                className="h-full bg-red-500"
                initial={{ width: 0 }}
                animate={{ width: `${securityThreatLevel}%` }}
              />

            </div>

          </HoloCard>

          {/* AI CORE */}
          <HoloCard className="p-6">

            <div className="flex items-center gap-3 mb-5">

              <Cpu className="w-5 h-5 text-purple-400" />

              <h3 className="text-xs font-bold tracking-widest text-slate-400">
                AI CORE STATUS
              </h3>

            </div>

            <div className="space-y-5">

              {[
                { name: "Neural Analysis", value: "98%", color: "bg-cyan-400" },
                { name: "Threat Prediction", value: "92%", color: "bg-purple-400" },
                { name: "Auto Mitigation", value: "87%", color: "bg-emerald-400" },
              ].map((item, i) => (
                <div key={i}>

                  <div className="flex justify-between mb-2 text-xs font-mono">

                    <span>{item.name}</span>

                    <span>{item.value}</span>

                  </div>

                  <div className="h-2 rounded-full bg-slate-800 overflow-hidden">

                    <motion.div
                      className={`h-full ${item.color}`}
                      animate={{ width: item.value }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </HoloCard>

          {/* TERMINAL */}
          <HoloCard className="p-5 border border-cyan-500/20 bg-black/40">

            <div className="flex items-center gap-2 mb-4">

              <Terminal className="w-4 h-4 text-cyan-400" />

              <h3 className="text-xs font-bold tracking-widest text-slate-400">
                LIVE SECURITY LOG STREAM
              </h3>

            </div>

            <div className="space-y-2 max-h-[260px] overflow-hidden">

              {logs.map((log, i) => (

                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-sm text-emerald-400"
                >
                  {log}
                </motion.div>

              ))}

            </div>

          </HoloCard>

        </div>

      </div>

    </div>
  );
}