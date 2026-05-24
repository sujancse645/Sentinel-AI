"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { FastForward, Play, Pause, RotateCcw, Activity } from "lucide-react";
import { useState } from "react";

export default function ReplayPage() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <FastForward className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">INCIDENT REPLAY SIMULATOR</h1>
            <p className="text-xs font-mono tracking-widest text-brand-blue/60 uppercase">Time-travel historical outage analysis</p>
          </div>
        </div>
      </div>

      <HoloCard className="p-6 flex flex-col gap-8 h-full" glowColor="cyan">
        <div className="flex-1 bg-slate-950/80 rounded-2xl border border-slate-800 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
          <div className="text-center font-mono">
             <Activity className={`w-16 h-16 mx-auto mb-4 ${isPlaying ? "text-brand-blue animate-pulse" : "text-slate-600"}`} />
             <p className={`text-xl ${isPlaying ? "text-brand-cyan" : "text-slate-500"}`}>
               {isPlaying ? "REPLAYING OUTAGE SEC-492..." : "SELECT INCIDENT TO REPLAY"}
             </p>
          </div>
        </div>

        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50">
          <div className="flex items-center justify-between mb-4">
             <span className="text-xs font-mono text-slate-400">T-MINUS 14:00</span>
             <span className="text-xs font-mono text-brand-crimson">INCIDENT ZERO</span>
             <span className="text-xs font-mono text-slate-400">T-PLUS 32:00</span>
          </div>
          <input type="range" className="w-full accent-brand-blue mb-8" defaultValue="30" />
          
          <div className="flex items-center justify-center gap-6">
            <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
              <RotateCcw className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-6 rounded-full bg-brand-blue/20 hover:bg-brand-blue/30 text-brand-blue border border-brand-blue/50 transition-colors shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
              {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
            </button>
            <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors">
              <FastForward className="w-6 h-6" />
            </button>
          </div>
        </div>
      </HoloCard>
    </div>
  );
}
