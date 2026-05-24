"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { Zap, Hexagon, Brain } from "lucide-react";
import { motion } from "framer-motion";

export default function QuantumPage() {
  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Zap className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-purple">QUANTUM SYSTEM HEALTH</h1>
            <p className="text-xs font-mono tracking-widest text-brand-purple/60 uppercase">Sub-atomic latency and quantum-safe crypto</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <HoloCard className="lg:col-span-2 p-8 flex items-center justify-center relative overflow-hidden" glowColor="purple">
           {/* Futuristic Quantum Visualization */}
           <motion.div 
             animate={{ rotate: 360 }}
             transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
             className="absolute inset-0 flex items-center justify-center opacity-30"
           >
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="absolute w-64 h-64 border-2 border-brand-purple rounded-full" style={{ transform: `rotateX(${i * 30}deg) rotateY(${i * 60}deg)` }}></div>
              ))}
           </motion.div>
           <div className="relative z-10 text-center">
             <Hexagon className="w-16 h-16 text-brand-purple mx-auto mb-4 drop-shadow-[0_0_15px_rgba(139,92,246,0.8)]" />
             <h2 className="text-4xl font-black tracking-widest text-slate-200">QUANTUM ENTANGLED</h2>
             <p className="text-brand-cyan font-mono mt-2">Zero-Trust Post-Quantum Cryptography Active</p>
           </div>
        </HoloCard>

        <div className="flex flex-col gap-6">
           <HoloCard className="p-6 flex-1 flex flex-col justify-center" glowColor="none">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-2">QUBIT ERROR RATE</h3>
              <div className="text-4xl font-black font-mono text-brand-emerald">0.0004%</div>
           </HoloCard>
           <HoloCard className="p-6 flex-1 flex flex-col justify-center" glowColor="none">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-2">ENTANGLEMENT LATENCY</h3>
              <div className="text-4xl font-black font-mono text-brand-cyan">0.02 µs</div>
           </HoloCard>
           <HoloCard className="p-6 flex-1 flex flex-col justify-center" glowColor="none">
              <h3 className="text-xs font-bold tracking-widest text-slate-400 mb-2">QKD LINK STATUS</h3>
              <div className="text-lg font-black font-mono text-brand-purple tracking-widest">SECURE</div>
           </HoloCard>
        </div>
      </div>
    </div>
  );
}
