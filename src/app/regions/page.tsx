"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { Globe, MapPin, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function RegionsPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center border border-brand-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
            <Globe className="w-6 h-6 text-brand-blue" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">GLOBAL MULTI-REGION</h1>
            <p className="text-xs font-mono tracking-widest text-brand-blue/60 uppercase">Distributed infrastructure topology</p>
          </div>
        </div>
      </div>

      <HoloCard className="flex-1 p-8 relative overflow-hidden" glowColor="cyan">
        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-no-repeat bg-center bg-contain opacity-20 filter invert sepia hue-rotate-180 brightness-150"></div>
        
        {/* Nodes */}
        <motion.div className="absolute top-[30%] left-[20%] flex flex-col items-center group" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3 }}>
          <div className="w-4 h-4 rounded-full bg-brand-emerald shadow-[0_0_15px_rgba(0,255,157,0.8)] mb-2 group-hover:scale-150 transition-transform"></div>
          <span className="text-[10px] font-mono font-bold bg-slate-900/80 px-2 py-1 rounded">US-EAST-1</span>
        </motion.div>

        <motion.div className="absolute top-[25%] left-[45%] flex flex-col items-center group" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 0.5 }}>
          <div className="w-4 h-4 rounded-full bg-brand-emerald shadow-[0_0_15px_rgba(0,255,157,0.8)] mb-2 group-hover:scale-150 transition-transform"></div>
          <span className="text-[10px] font-mono font-bold bg-slate-900/80 px-2 py-1 rounded">EU-CENTRAL-1</span>
        </motion.div>

        <motion.div className="absolute top-[40%] right-[20%] flex flex-col items-center group" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 3, delay: 1 }}>
          <div className="w-4 h-4 rounded-full bg-brand-amber shadow-[0_0_15px_rgba(255,183,3,0.8)] animate-pulse mb-2 group-hover:scale-150 transition-transform"></div>
          <span className="text-[10px] font-mono font-bold bg-slate-900/80 px-2 py-1 rounded border border-brand-amber text-brand-amber">AP-NORTHEAST-1</span>
        </motion.div>

        <div className="absolute bottom-8 right-8 p-4 bg-slate-900/80 border border-slate-800 rounded-xl backdrop-blur-sm">
           <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-2">GLOBAL LATENCY MAP</h3>
           <div className="flex flex-col gap-2 font-mono text-xs">
              <div className="flex justify-between w-48"><span className="text-slate-300">US-EAST-1</span><span className="text-brand-emerald">12ms</span></div>
              <div className="flex justify-between w-48"><span className="text-slate-300">EU-CENTRAL-1</span><span className="text-brand-emerald">45ms</span></div>
              <div className="flex justify-between w-48"><span className="text-slate-300">AP-NORTHEAST-1</span><span className="text-brand-amber">120ms</span></div>
           </div>
        </div>
      </HoloCard>
    </div>
  );
}
