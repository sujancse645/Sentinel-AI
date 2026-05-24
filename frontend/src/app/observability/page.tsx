"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { TerminalSquare, Filter, Play, Square, LineChart, Cpu, Zap, WifiOff, RefreshCcw, Activity } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Observability() {
  const { incidents, metrics } = useGlobalState();
  const [logs, setLogs] = useState<string[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [command, setCommand] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStreaming) return;
    
    const interval = setInterval(() => {
      const now = new Date().toISOString();
      // Generate some dynamic realistic logs
      const services = ["API_GATEWAY", "AUTH_SERVICE", "PAYMENT_PROCESSOR", "USER_DB"];
      const srv = services[Math.floor(Math.random() * services.length)];
      let newLog = `[${now}] INFO  [${srv}] Handling request, latency=${metrics.latency_ms.toFixed(0)}ms, CPU=${metrics.cpu_usage.toFixed(1)}%`;
      
      if (Math.random() > 0.95) {
        newLog = `[${now}] WARN  [${srv}] Thread pool approaching capacity. Queued=14`;
      }
      
      setLogs(prev => [...prev.slice(-100), newLog]);
    }, 800);
    return () => clearInterval(interval);
  }, [metrics, isStreaming]);

  useEffect(() => {
    if (incidents.length > 0 && incidents[0].severity !== "SAFE") {
      const now = new Date().toISOString();
      const errorLog = `[${now}] ${incidents[0].severity} [${incidents[0].service}] ${incidents[0].title} - AI_CONFIDENCE: ${(incidents[0].confidence_score*100).toFixed(0)}%`;
      setLogs(prev => [...prev.slice(-100), errorLog]);
    }
  }, [incidents]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    const now = new Date().toISOString();
    setLogs(prev => [...prev.slice(-100), `[${now}] USER_EXEC > ${command}`]);
    
    if ((window as any).triggerToast) {
       (window as any).triggerToast(`Executed: ${command}`, "info");
    }

    setTimeout(() => {
      let response = `[${now}] SYSTEM  Command executed successfully.`;
      if (command.toLowerCase().includes("grep")) {
        response = `[${now}] SYSTEM  Found 3 matches in buffer.`;
      } else if (command.toLowerCase().includes("restart")) {
        response = `[${now}] SYSTEM  Restarting targeted service... [OK]`;
      }
      setLogs(prev => [...prev.slice(-100), response]);
    }, 600);
    
    setCommand("");
  };

  const injectFault = (type: string) => {
    const now = new Date().toISOString();
    let msg = "";
    if (type === "cpu") msg = `[${now}] CRITICAL [SYNTHETIC_TEST] Spiking CPU utilization to 99% across target nodes...`;
    if (type === "network") msg = `[${now}] CRITICAL [SYNTHETIC_TEST] Injecting 5000ms latency to EU-WEST-1 routing tables...`;
    if (type === "db") msg = `[${now}] ERROR [SYNTHETIC_TEST] Simulating connection pool exhaustion...`;
    
    setLogs(prev => [...prev.slice(-100), msg]);
    if ((window as any).triggerToast) {
       (window as any).triggerToast(`Test Injected: ${type.toUpperCase()}`, "warning");
    }
  };

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <LineChart className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">ADVANCED OBSERVABILITY MATRIX</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Distributed tracing & Synthetic Real-World Testing</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Synthetic Testing Panel */}
        <div className="flex flex-col gap-6">
          <HoloCard className="p-6 flex flex-col" glowColor="purple">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-brand-purple" /> SYNTHETIC TESTING
            </h2>
            <p className="text-xs text-slate-500 mb-6 leading-relaxed">
              Inject controlled chaos into the infrastructure to validate autonomous recovery routines and Sentinel AI response times.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => injectFault("cpu")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-brand-crimson/10 border border-brand-crimson/30 hover:bg-brand-crimson/20 hover:border-brand-crimson/50 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Cpu className="w-4 h-4 text-brand-crimson group-hover:animate-pulse" />
                  <span className="text-xs font-bold font-mono text-left">INJECT CPU SPIKE</span>
                </div>
              </button>
              <button 
                onClick={() => injectFault("network")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-brand-amber/10 border border-brand-amber/30 hover:bg-brand-amber/20 hover:border-brand-amber/50 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <WifiOff className="w-4 h-4 text-brand-amber group-hover:animate-pulse" />
                  <span className="text-xs font-bold font-mono text-left">SIMULATE NETWORK DROP</span>
                </div>
              </button>
              <button 
                onClick={() => injectFault("db")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-brand-blue/10 border border-brand-blue/30 hover:bg-brand-blue/20 hover:border-brand-blue/50 text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <RefreshCcw className="w-4 h-4 text-brand-blue group-hover:spin" />
                  <span className="text-xs font-bold font-mono text-left">DB POOL EXHAUSTION</span>
                </div>
              </button>
            </div>
          </HoloCard>

          <HoloCard className="p-6 flex-1 flex flex-col" glowColor="none">
            <h2 className="text-sm font-bold tracking-widest text-slate-400 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" /> STREAM CONTROLS
            </h2>
             <button 
              onClick={() => setIsStreaming(!isStreaming)}
              className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl border text-sm font-bold transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] ${
                isStreaming 
                  ? "bg-brand-crimson/10 border-brand-crimson/50 text-brand-crimson hover:bg-brand-crimson/20" 
                  : "bg-brand-emerald/10 border-brand-emerald/50 text-brand-emerald hover:bg-brand-emerald/20"
              }`}
            >
              {isStreaming ? <><Square className="w-4 h-4" /> HALT STREAM</> : <><Play className="w-4 h-4" /> RESUME STREAM</>}
            </button>
          </HoloCard>
        </div>

        {/* Live Terminal & Logs */}
        <HoloCard className="lg:col-span-3 flex flex-col p-6 overflow-hidden" glowColor="cyan">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/50 pb-4">
            <div className="flex items-center gap-2 text-brand-cyan font-bold text-sm tracking-widest">
              <TerminalSquare className="w-5 h-5" />
              LIVE LOG FIREHOSE
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-slate-500 animate-pulse"></span> INFO
                <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></span> WARN
                <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span> ERROR
              </div>
              <button className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:border-brand-cyan/50 text-slate-300 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto bg-background-dark/90 rounded-xl border border-slate-800 p-4 font-mono text-[11px] custom-scrollbar space-y-1.5 relative mb-4">
            <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-background-dark/90 to-transparent pointer-events-none z-10"></div>
            {logs.map((log, i) => {
              let colorClass = "text-slate-400";
              if (log.includes("ERROR") || log.includes("CRITICAL")) colorClass = "text-brand-crimson text-glow-crimson";
              else if (log.includes("WARN") || log.includes("WARNING")) colorClass = "text-brand-amber";
              else if (log.includes("SYSTEM") || log.includes("USER_EXEC")) colorClass = "text-brand-purple font-bold";
              
              return (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }} 
                  animate={{ opacity: 1, x: 0 }}
                  className={`${colorClass} hover:bg-slate-800/30 px-1 py-0.5 rounded break-all`}
                >
                  {log}
                </motion.div>
              );
            })}
            {logs.length === 0 && <div className="text-slate-600 animate-pulse">Establishing log stream uplink...</div>}
          </div>

          <form onSubmit={handleTerminalSubmit} className="flex gap-2 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-cyan font-mono font-bold">{">"}</div>
            <input 
              type="text" 
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              placeholder="Enter shell command or query logs (e.g. grep CRITICAL)..."
              className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-lg py-3 pl-10 pr-4 text-sm font-mono text-slate-200 focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.1)] transition-all"
            />
            <button type="submit" className="px-6 rounded-lg bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan hover:bg-brand-cyan/20 hover:border-brand-cyan/50 font-bold font-mono text-sm transition-colors">
              EXECUTE
            </button>
          </form>
        </HoloCard>

      </div>
    </div>
  );
}
