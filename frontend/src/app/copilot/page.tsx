"use client";

import { HoloCard } from "@/components/ui/HoloCard";
import { MessageSquare, Bot, Terminal, Send, Command } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CopilotPage() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "SENTINEL AI Copilot online. How can I assist with your infrastructure today?", time: "10:00:00" },
    { role: "user", content: "Show me the root cause analysis for the latest API Gateway latency spike.", time: "10:01:23" },
    { role: "assistant", content: "Analyzing... The latency spike correlates with a 400% increase in traffic from EU-Central-1. The Auth Service memory leak identified by the Correlation Agent caused a bottleneck. I've already initiated a rolling restart of the Auth pods.", time: "10:01:45" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input, time: new Date().toLocaleTimeString() }]);
    setInput("");
    
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Understood. Executing diagnostic scans on the specified node group. Stand by for telemetry.", 
        time: new Date().toLocaleTimeString() 
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <MessageSquare className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">AI COPILOT CHAT</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Conversational infrastructure intelligence</p>
          </div>
        </div>
      </div>

      <HoloCard className="flex-1 flex flex-col p-0 overflow-hidden" glowColor="cyan">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.03),transparent_70%)] pointer-events-none"></div>
          
          <AnimatePresence>
            {messages.map((msg, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${
                  msg.role === "assistant" 
                    ? "bg-brand-cyan/10 border-brand-cyan/30 shadow-[0_0_10px_rgba(0,245,255,0.2)]" 
                    : "bg-slate-800 border-slate-700"
                }`}>
                  {msg.role === "assistant" ? <Bot className="w-5 h-5 text-brand-cyan" /> : <Terminal className="w-5 h-5 text-slate-400" />}
                </div>
                <div className={`max-w-[70%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div className={`p-4 rounded-2xl border backdrop-blur-sm text-sm font-mono leading-relaxed ${
                    msg.role === "assistant"
                      ? "bg-brand-cyan/5 border-brand-cyan/20 text-brand-cyan/90"
                      : "bg-slate-800/80 border-slate-700 text-slate-300"
                  }`}>
                    {msg.content}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono px-2">{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background-dark/80 border-t border-slate-800/50 backdrop-blur-xl">
          <div className="relative flex items-center">
            <div className="absolute left-4 w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-slate-400">
               <Command className="w-3 h-3" />
            </div>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask Copilot to analyze, predict, or recover..."
              className="w-full bg-slate-900/50 border border-slate-700/50 rounded-xl py-4 pl-14 pr-16 text-sm font-mono text-foreground placeholder:text-slate-600 focus:outline-none focus:border-brand-cyan/50 focus:shadow-[0_0_15px_rgba(0,245,255,0.2)] transition-all"
            />
            <button 
              onClick={handleSend}
              className="absolute right-2 p-3 bg-brand-cyan/20 hover:bg-brand-cyan/30 text-brand-cyan rounded-lg border border-brand-cyan/30 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </HoloCard>
    </div>
  );
}
