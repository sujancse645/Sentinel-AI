"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Radio, BrainCircuit, Network, ActivitySquare, Bot, 
  LineChart, FileText, Clock, ShieldAlert, FastForward, Wrench, Shield,
  Mic, Rocket, Zap, Globe, Maximize, MessageSquare, Briefcase, Settings
} from "lucide-react";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";

const NAV_ITEMS = [
  { name: "Overview", path: "/", icon: LayoutDashboard },
  { name: "Command Center", path: "/command-center", icon: Radio },
  { name: "Live Incidents", path: "/incidents", icon: ActivitySquare },
  { name: "AI Agent Neural Core", path: "/ai-investigations", icon: BrainCircuit },
  { name: "Infrastructure Map", path: "/infrastructure", icon: Network },
  { name: "Predictive Intelligence", path: "/predictions", icon: Bot },
  { name: "Observability Matrix", path: "/observability", icon: LineChart },
  { name: "Incident Replay", path: "/replay", icon: FastForward },
  { name: "AI Recovery Center", path: "/recovery", icon: Wrench },
  { name: "Enterprise Analytics", path: "/reports", icon: FileText },
  { name: "Security Threat Matrix", path: "/security", icon: Shield },
  { name: "AI Voice Command", path: "/voice", icon: Mic },
  { name: "Deployment Intelligence", path: "/deployments", icon: Rocket },
  { name: "Quantum System Health", path: "/quantum", icon: Zap },
  { name: "AI Decision Timeline", path: "/timeline", icon: Clock },
  { name: "Global Multi-Region", path: "/regions", icon: Globe },
  { name: "Autonomous Scaling", path: "/scaling", icon: Maximize },
  { name: "AI Copilot Chat", path: "/copilot", icon: MessageSquare },
  { name: "Executive Dashboard", path: "/executive", icon: Briefcase },
  { name: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const { incidents } = useGlobalState();
  
  const activeIncidentCount = incidents.filter(i => i.severity !== "SAFE").length;

  return (
    <motion.aside
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ width: isHovered ? 280 : 80 }}
      className="h-screen sticky top-0 flex flex-col border-r border-slate-800/50 bg-background-dark/80 backdrop-blur-3xl z-50 transition-all duration-500 overflow-hidden"
    >
      <div className="p-4 flex items-center h-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-3 w-full">
          <div className="relative w-10 h-10 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <div className="absolute inset-0 rounded-xl border border-brand-cyan/50 animate-pulse-glow"></div>
            <BrainCircuit className="w-5 h-5 text-brand-cyan" />
          </div>
          <motion.div
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            className="flex flex-col whitespace-nowrap"
          >
            <span className="font-bold text-xl tracking-widest text-foreground text-glow-cyan">
              SENTINEL<span className="text-brand-cyan">.AI</span>
            </span>
            <span className="text-[10px] tracking-[0.2em] text-brand-cyan/60 uppercase">Neural Core Online</span>
          </motion.div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 custom-scrollbar relative z-10">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center gap-4 px-3 py-3 rounded-xl cursor-pointer group transition-all duration-300 ${
                  isActive ? "text-brand-cyan bg-brand-cyan/10" : "text-foreground-secondary hover:text-foreground hover:bg-slate-800/40"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-brand-cyan/20 to-transparent border-l-2 border-brand-cyan rounded-xl"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                
                <div className="relative flex-shrink-0 flex items-center justify-center w-6 h-6">
                  <Icon className={`w-5 h-5 z-10 transition-colors duration-300 ${isActive ? "text-brand-cyan drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]" : "group-hover:text-brand-cyan"}`} />
                </div>
                
                <motion.span 
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  className="z-10 font-medium text-sm whitespace-nowrap tracking-wide"
                >
                  {item.name}
                </motion.span>

                {/* Notifications */}
                {item.name === "Live Incidents" && activeIncidentCount > 0 && (
                  <motion.div 
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="ml-auto z-10 bg-brand-crimson/20 border border-brand-crimson/50 text-brand-crimson text-xs font-black px-2 py-0.5 rounded-md shadow-[0_0_10px_rgba(255,59,92,0.4)]"
                  >
                    {activeIncidentCount}
                  </motion.div>
                )}
                {item.name === "Live Incidents" && activeIncidentCount > 0 && !isHovered && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-crimson z-10 shadow-[0_0_8px_rgba(255,59,92,0.8)]" />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/5 to-transparent pointer-events-none"></div>
        <div className="flex items-center gap-3 p-2">
          <div className="relative w-10 h-10 rounded-full flex-shrink-0 border border-brand-emerald/30 p-0.5">
            <div className="absolute inset-0 rounded-full border border-brand-emerald/50 animate-[spin_4s_linear_infinite]"></div>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SentinelAdmin" alt="Admin" className="w-full h-full rounded-full bg-slate-900" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-brand-emerald border-2 border-background-dark rounded-full shadow-[0_0_10px_rgba(0,255,157,0.8)]"></div>
          </div>
          <motion.div animate={{ opacity: isHovered ? 1 : 0 }} className="flex flex-col whitespace-nowrap">
            <span className="text-sm font-bold text-foreground text-glow-emerald">Director Prime</span>
            <span className="text-[10px] text-brand-emerald/70 font-mono tracking-widest">L5 CLEARANCE</span>
          </motion.div>
        </div>
      </div>
    </motion.aside>
  );
}

