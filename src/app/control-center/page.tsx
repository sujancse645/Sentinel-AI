"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { ServerCrash, Power, Lock, RotateCcw } from "lucide-react";

export default function ControlCenter() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">System Control</h1>
          <p className="text-sm text-slate-400">Master infrastructure controls</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard className="p-6 border-red-500/30" glowColor="none">
          <h2 className="text-red-400 font-bold mb-4 flex items-center gap-2"><ServerCrash /> EMERGENCY ACTIONS</h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl transition-colors font-bold text-left flex items-center gap-4">
              <Power className="w-6 h-6" /> INITIATE GLOBAL FAILOVER
            </button>
            <button className="w-full p-4 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl transition-colors font-bold text-left flex items-center gap-4">
              <Lock className="w-6 h-6" /> EMERGENCY LOCKDOWN MODE
            </button>
          </div>
        </GlassCard>

        <GlassCard className="p-6" glowColor="none">
          <h2 className="text-cyan-400 font-bold mb-4 flex items-center gap-2"><RotateCcw /> ROUTINE CONTROLS</h2>
          <div className="space-y-4">
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors font-bold text-left">
              Restart API Gateway
            </button>
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors font-bold text-left">
              Clear Redis Cache
            </button>
            <button className="w-full p-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl transition-colors font-bold text-left">
              Force AI State Sync
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
