"use client";

import { useEffect, useState } from "react";
import { HoloCard } from "@/components/ui/HoloCard";

import {
  ShieldAlert,
  Activity,
  Crosshair,
  Terminal,
  Radar,
  Globe,
  Cpu,
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
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative overflow-hidden">

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

        <div className="absolute bottom-[-20%] right-[0%] w-[500px] h-[500px] bg-purple-500/10 blur-[140px] rounded-full"></div>

      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between relative z-10">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-brand-crimson/10 flex items-center justify-center border border-brand-crimson/30 shadow-[0_0_30px_rgba(255,59,92,0.25)]">

            <ShieldAlert className="w-7 h-7 text-brand-crimson" />

          </div>

          <div>

            <h1 className="text-4xl font-black tracking-tight text-white text-glow-crimson">
              LIVE INCIDENT WAR ROOM
            </h1>

            <p className="text-xs font-mono tracking-[0.35em] text-brand-crimson/70 uppercase">
              Real-time threat detection & autonomous escalation
            </p>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0 relative z-10">

        {/* LEFT */}
        <div className="lg:col-span-3 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-2">

          {/* CYBER THREAT MATRIX */}
          <div className="relative h-[360px] rounded-3xl overflow-hidden border border-cyan-500/20 bg-black/40 backdrop-blur-2xl">

            {/* animated background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.08),transparent_70%)]"></div>

            {/* grid */}
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

            {/* scan lines */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "linear",
              }}
            />

            {/* title */}
            <div className="absolute top-6 left-6 z-10">

              <div className="flex items-center gap-3 mb-2">

                <Globe className="w-6 h-6 text-cyan-400" />

                <h2 className="text-2xl font-black text-cyan-300">
                  GLOBAL THREAT MATRIX
                </h2>

              </div>

              <p className="text-xs uppercase tracking-[0.35em] text-cyan-500/60">
                Autonomous Neural Defense Grid
              </p>

            </div>

            {/* radar */}
            <div className="absolute inset-0 flex items-center justify-center">

              <div className="relative w-[280px] h-[280px]">

                <div className="absolute inset-0 rounded-full border border-cyan-500/20"></div>

                <div className="absolute inset-[15%] rounded-full border border-cyan-500/20"></div>

                <div className="absolute inset-[30%] rounded-full border border-cyan-500/20"></div>

                {/* rotating beam */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 5,
                    ease: "linear",
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 w-[2px] h-1/2 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"></div>
                </motion.div>

                {/* nodes */}
                {[...Array(18)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(0,255,255,0.9)]"
                    style={{
                      top: `${Math.random() * 90}%`,
                      left: `${Math.random() * 90}%`,
                    }}
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: Math.random() * 3 + 2,
                    }}
                  />
                ))}

              </div>

            </div>

            {/* bottom logs */}
            <div className="absolute bottom-4 left-4 right-4">

              <div className="bg-black/60 border border-cyan-500/20 rounded-2xl p-4 font-mono text-xs text-cyan-300 space-y-1 backdrop-blur-xl">

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

              const isCritical =
                incident.severity === "CRITICAL";

              return (
                <motion.div
                  key={`${incident.id}-${idx}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                  className={`relative p-6 rounded-3xl border backdrop-blur-2xl overflow-hidden ${isCritical
                      ? "bg-brand-crimson/5 border-brand-crimson/30 shadow-[0_0_30px_rgba(255,59,92,0.15)]"
                      : incident.severity === "SAFE"
                        ? "bg-brand-emerald/5 border-brand-emerald/20"
                        : "bg-brand-amber/5 border-brand-amber/20"
                    }`}
                >

                  {/* glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_70%)]"></div>

                  <div className="flex items-start justify-between mb-4">

                    <div className="flex items-center gap-3">

                      <span
                        className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest border ${isCritical
                            ? "bg-brand-crimson/20 border-brand-crimson/50 text-brand-crimson animate-pulse"
                            : incident.severity === "SAFE"
                              ? "bg-brand-emerald/20 border-brand-emerald/50 text-brand-emerald"
                              : "bg-brand-amber/20 border-brand-amber/50 text-brand-amber"
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

                  <h3 className="text-2xl font-black text-white mb-3">
                    {incident.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mb-4">

                    <span className="text-xs font-mono px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400">
                      SERVICE:
                      <span className="text-cyan-400 ml-1">
                        {incident.service}
                      </span>
                    </span>

                    <span className="text-xs font-mono px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400">
                      CONFIDENCE:
                      <span className="text-emerald-400 ml-1">
                        {Math.round(
                          incident.confidence_score * 100
                        )}
                        %
                      </span>
                    </span>

                  </div>

                  <div className="p-4 bg-black/40 border border-slate-800 rounded-2xl">

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

          {/* TERMINAL */}
          <HoloCard className="p-5 bg-black/40 border border-cyan-500/20">

            <div className="flex items-center gap-2 mb-4">

              <Terminal className="w-4 h-4 text-cyan-400" />

              <h3 className="text-xs font-bold tracking-widest text-slate-400">
                LIVE SECURITY LOG STREAM
              </h3>

            </div>

            <div className="space-y-2 max-h-[240px] overflow-hidden">

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

        {/* RIGHT SIDE */}
        <div className="flex flex-col gap-6">

          {/* threat */}
          <HoloCard className="p-6">

            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">

              <Crosshair className="w-4 h-4 text-brand-crimson" />

              THREAT SEVERITY INDEX

            </h3>

            <div className="flex items-end gap-2 mb-4">

              <span className="text-6xl font-black font-mono tracking-tighter text-brand-crimson text-glow-crimson">
                {securityThreatLevel}
              </span>

              <span className="text-sm font-mono text-slate-500 mb-2">
                /100
              </span>

            </div>

            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">

              <motion.div
                className="h-full bg-brand-crimson"
                initial={{ width: 0 }}
                animate={{
                  width: `${securityThreatLevel}%`,
                }}
                transition={{ duration: 1 }}
              />

            </div>

          </HoloCard>

          {/* radar */}
          <HoloCard className="p-6 flex-1">

            <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-4 flex items-center gap-2">

              <Radar className="w-4 h-4 text-cyan-400" />

              CASCADING FAILURE PROBABILITY

            </h3>

            <div className="flex-1 flex items-center justify-center">

              <div className="relative w-full aspect-square max-w-[240px]">

                <div className="absolute inset-0 rounded-full border border-slate-700"></div>

                <div className="absolute inset-[12%] rounded-full border border-slate-700"></div>

                <div className="absolute inset-[24%] rounded-full border border-slate-700"></div>

                {/* rotating beam */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    ease: "linear",
                  }}
                >
                  <div className="absolute left-1/2 top-1/2 w-[2px] h-1/2 bg-gradient-to-t from-cyan-400 to-transparent origin-bottom"></div>
                </motion.div>

                {activeIncidents.map((_, i) => (

                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-brand-crimson rounded-full shadow-[0_0_14px_rgba(255,59,92,0.9)]"
                    style={{
                      top: `${Math.random() * 70 + 10}%`,
                      left: `${Math.random() * 70 + 10}%`,
                    }}
                    animate={{
                      scale: [1, 1.6, 1],
                      opacity: [0.4, 1, 0.4],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                    }}
                  />

                ))}

              </div>

            </div>

          </HoloCard>

          {/* ai core */}
          <HoloCard className="p-6">

            <div className="flex items-center gap-3 mb-4">

              <Cpu className="w-5 h-5 text-purple-400" />

              <h3 className="text-xs font-bold tracking-widest text-slate-400">
                AI CORE STATUS
              </h3>

            </div>

            <div className="space-y-4">

              <div>
                <div className="flex justify-between mb-1 text-xs font-mono">
                  <span>Neural Analysis</span>
                  <span className="text-cyan-400">98%</span>
                </div>

                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                  <motion.div
                    className="h-full bg-cyan-400"
                    animate={{ width: "98%" }}
                  />

                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1 text-xs font-mono">
                  <span>Threat Prediction</span>
                  <span className="text-purple-400">92%</span>
                </div>

                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">

                  <motion.div
                    className="h-full bg-purple-400"
                    animate={{ width: "92%" }}
                  />

                </div>
              </div>

            </div>

          </HoloCard>

        </div>

      </div>

    </div>
  );
}