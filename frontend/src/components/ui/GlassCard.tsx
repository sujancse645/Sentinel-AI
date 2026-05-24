"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "emerald" | "amber" | "red" | "none";
}

export function GlassCard({ children, className = "", glowColor = "none", ...props }: GlassCardProps) {
  const glowStyles = {
    cyan: "border-cyan-500/30 hover:border-cyan-500/60 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]",
    emerald: "border-emerald-500/30 hover:border-emerald-500/60 hover:shadow-[0_0_30px_rgba(0,255,135,0.15)]",
    amber: "border-amber-500/30 hover:border-amber-500/60 hover:shadow-[0_0_30px_rgba(255,170,0,0.15)]",
    red: "border-red-500/30 hover:border-red-500/60 hover:shadow-[0_0_30px_rgba(255,51,51,0.15)]",
    none: "border-slate-800 hover:border-slate-700",
  };

  return (
    <motion.div
      className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl transition-all duration-300 ${glowStyles[glowColor]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
