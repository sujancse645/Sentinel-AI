"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { Mic, Radio } from "lucide-react";
import { motion } from "framer-motion";

export default function VoicePage() {
  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-purple/10 flex items-center justify-center border border-brand-purple/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Mic className="w-6 h-6 text-brand-purple" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-purple">VOICE COMMAND INTERFACE</h1>
            <p className="text-xs font-mono tracking-widest text-brand-purple/60 uppercase">Natural language infrastructure control</p>
          </div>
        </div>
      </div>

      <HoloCard className="flex-1 flex flex-col items-center justify-center p-6" glowColor="purple">
         <motion.div 
           className="relative w-48 h-48 flex items-center justify-center mb-12"
           animate={{ scale: [1, 1.05, 1] }}
           transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
         >
           <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-[40px] mix-blend-screen"></div>
           <div className="absolute inset-4 bg-brand-purple/30 rounded-full blur-[20px]"></div>
           <div className="relative w-24 h-24 bg-slate-900 rounded-full border-2 border-brand-purple shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center z-10">
              <Mic className="w-10 h-10 text-brand-purple drop-shadow-[0_0_10px_rgba(139,92,246,0.8)]" />
           </div>
           
           {/* Sound wave rings */}
           {[1, 2, 3].map(i => (
             <motion.div 
               key={i}
               className="absolute inset-0 border-2 border-brand-purple/50 rounded-full"
               animate={{ scale: [1, 2], opacity: [0.5, 0] }}
               transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
             />
           ))}
         </motion.div>

         <div className="text-center space-y-4">
           <p className="text-2xl font-mono text-brand-cyan/80">"Listening for commands..."</p>
           <p className="text-sm font-mono text-slate-500">Try saying: <span className="text-brand-emerald">"Show me the affected services"</span> or <span className="text-brand-amber">"Initiate failover"</span></p>
         </div>
      </HoloCard>
    </div>
  );
}
