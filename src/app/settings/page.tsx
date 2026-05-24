"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">Settings</h1>
          <p className="text-sm text-slate-400">AI configuration and preferences</p>
        </div>
      </div>

      <GlassCard className="p-6 max-w-2xl" glowColor="none">
        <h2 className="text-lg font-bold text-slate-200 mb-6">AI Sensitivity Configuration</h2>
        
        <div className="space-y-6">
          <div>
            <label className="text-sm font-bold text-slate-400 mb-2 block">Anomaly Detection Threshold</label>
            <input type="range" className="w-full accent-cyan-500" />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>High (More alerts)</span>
              <span>Balanced</span>
              <span>Low (Critical only)</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-bold text-slate-400 mb-2 block">Autonomous Recovery Mode</label>
            <div className="flex items-center gap-4 p-4 border border-slate-800 rounded-xl bg-slate-900/50">
              <input type="checkbox" className="w-5 h-5 accent-emerald-500" defaultChecked />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-200">Allow AI to execute actions</span>
                <span className="text-xs text-slate-500">Recovery agent will automatically resolve known issues.</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
