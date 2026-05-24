"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSquare, CheckCircle, AlertTriangle, ShieldAlert } from "lucide-react";

type Toast = {
  id: string;
  message: string;
  type: "success" | "warning" | "critical" | "info";
};

export function GlobalToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest button element
      const target = e.target as HTMLElement;
      const button = target.closest("button");
      
      if (button) {
        // If it's a filter/icon-only button, ignore or give generic response
        const text = button.innerText.trim();
        if (text) {
          const type = 
            text.includes("HALT") || text.includes("REJECT") || text.includes("CRITICAL") ? "critical" :
            text.includes("WARN") || text.includes("ISOLATE") ? "warning" :
            text.includes("EXECUTE") || text.includes("APPROVE") || text.includes("RESUME") ? "success" : "info";
            
          addToast(`COMMAND INTERCEPTED: ${text}`, type);
        } else {
           addToast("SYSTEM ACTION REGISTERED", "info");
        }
      }
    };

    document.addEventListener("click", handleGlobalClick);
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  // Expose to window for manual triggering
  useEffect(() => {
    (window as any).triggerToast = (msg: string, type: Toast["type"] = "info") => {
      addToast(msg, type);
    };
  }, []);

  const addToast = (message: string, type: Toast["type"]) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            className={`pointer-events-auto p-4 rounded-xl border backdrop-blur-xl flex items-center gap-4 shadow-2xl min-w-[300px] ${
              toast.type === "success" ? "bg-brand-emerald/10 border-brand-emerald/50 shadow-[0_0_20px_rgba(0,255,157,0.2)]" :
              toast.type === "critical" ? "bg-brand-crimson/10 border-brand-crimson/50 shadow-[0_0_20px_rgba(255,59,92,0.2)]" :
              toast.type === "warning" ? "bg-brand-amber/10 border-brand-amber/50 shadow-[0_0_20px_rgba(255,183,3,0.2)]" :
              "bg-brand-cyan/10 border-brand-cyan/50 shadow-[0_0_20px_rgba(0,245,255,0.2)]"
            }`}
          >
            {toast.type === "success" && <CheckCircle className="w-5 h-5 text-brand-emerald" />}
            {toast.type === "critical" && <ShieldAlert className="w-5 h-5 text-brand-crimson" />}
            {toast.type === "warning" && <AlertTriangle className="w-5 h-5 text-brand-amber" />}
            {toast.type === "info" && <TerminalSquare className="w-5 h-5 text-brand-cyan" />}
            
            <div className="flex flex-col">
              <span className={`text-xs font-black tracking-widest uppercase ${
                toast.type === "success" ? "text-brand-emerald" :
                toast.type === "critical" ? "text-brand-crimson" :
                toast.type === "warning" ? "text-brand-amber" :
                "text-brand-cyan"
              }`}>
                {toast.type === "critical" ? "SYSTEM OVERRIDE" : "ACTION CONFIRMED"}
              </span>
              <span className="text-sm font-mono text-slate-200">{toast.message}</span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
