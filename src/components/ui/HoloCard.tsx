"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface HoloCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "emerald" | "amber" | "red" | "purple" | "none";
  interactive?: boolean;
}

export function HoloCard({ children, className = "", glowColor = "none", interactive = true, ...props }: HoloCardProps) {
  const glowStyles = {
    cyan: "border-brand-cyan/20 hover:border-brand-cyan/60 hover:shadow-[0_0_40px_rgba(0,245,255,0.2)]",
    emerald: "border-brand-emerald/20 hover:border-brand-emerald/60 hover:shadow-[0_0_40px_rgba(0,255,157,0.2)]",
    amber: "border-brand-amber/20 hover:border-brand-amber/60 hover:shadow-[0_0_40px_rgba(255,183,3,0.2)]",
    red: "border-brand-crimson/20 hover:border-brand-crimson/60 hover:shadow-[0_0_40px_rgba(255,59,92,0.2)]",
    purple: "border-brand-purple/20 hover:border-brand-purple/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)]",
    none: "border-slate-800/50 hover:border-slate-700/80",
  };

  const hoverProps = interactive ? {
    whileHover: { scale: 1.01, y: -2 },
    whileTap: { scale: 0.99 }
  } : {};

  return (
    <motion.div
      className={`holo-glass rounded-2xl transition-all duration-500 overflow-hidden relative group ${glowStyles[glowColor]} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      {...hoverProps}
      {...props}
    >
      {/* Holographic sweep effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none z-0"></div>
      
      {/* Content wrapper to stay above background effects */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}
