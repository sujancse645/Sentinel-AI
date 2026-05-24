"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import { HoloCard } from "@/components/ui/HoloCard";
import { Network } from "lucide-react";
import ReactFlow, { Background, Controls, Edge, Node } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  { id: "frontend", data: { label: "Frontend (Next.js)" }, position: { x: 250, y: 50 }, type: "input" },
  { id: "gateway", data: { label: "API Gateway" }, position: { x: 250, y: 150 } },
  { id: "auth", data: { label: "Auth Service" }, position: { x: 100, y: 250 } },
  { id: "payment", data: { label: "Payment Service" }, position: { x: 250, y: 250 } },
  { id: "notification", data: { label: "Notification Service" }, position: { x: 400, y: 250 } },
  { id: "redis", data: { label: "Redis Cache" }, position: { x: 100, y: 350 } },
  { id: "postgres", data: { label: "PostgreSQL DB" }, position: { x: 250, y: 350 } },
  { id: "k8s", data: { label: "Kubernetes Cluster" }, position: { x: 250, y: 450 }, type: "output" },
];

const initialEdges: Edge[] = [
  { id: "e1-2", source: "frontend", target: "gateway", animated: true, style: { stroke: "#00F5FF", strokeWidth: 2 } },
  { id: "e2-3", source: "gateway", target: "auth", animated: true, style: { stroke: "#00F5FF", strokeWidth: 2 } },
  { id: "e2-4", source: "gateway", target: "payment", animated: true, style: { stroke: "#00F5FF", strokeWidth: 2 } },
  { id: "e2-5", source: "gateway", target: "notification", animated: true, style: { stroke: "#00F5FF", strokeWidth: 2 } },
  { id: "e3-6", source: "auth", target: "redis", animated: true, style: { stroke: "#00FF9D", strokeWidth: 2 } },
  { id: "e4-7", source: "payment", target: "postgres", animated: true, style: { stroke: "#00FF9D", strokeWidth: 2 } },
  { id: "e6-8", source: "redis", target: "k8s", style: { stroke: "#334155" } },
  { id: "e7-8", source: "postgres", target: "k8s", style: { stroke: "#334155" } },
];

export default function InfrastructureMap() {
  const { incidents } = useGlobalState();
  
  // Highlight nodes based on incidents
  const nodes = initialNodes.map((node) => {
    const isAffected = incidents.some(i => i.severity !== "SAFE" && i.service === node.data.label);
    return {
      ...node,
      style: {
        background: isAffected ? "rgba(255, 59, 92, 0.15)" : "rgba(10, 15, 35, 0.8)",
        color: "#F8FAFC",
        border: isAffected ? "1px solid rgba(255, 59, 92, 0.8)" : "1px solid rgba(0, 245, 255, 0.3)",
        borderRadius: "12px",
        padding: "12px",
        boxShadow: isAffected ? "0 0 20px rgba(255, 59, 92, 0.5)" : "0 0 10px rgba(0, 245, 255, 0.1)",
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: "12px"
      }
    };
  });

  return (
    <div className="flex flex-col gap-6 h-full p-6 relative">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 flex items-center justify-center border border-brand-cyan/30 shadow-[0_0_20px_rgba(0,245,255,0.2)]">
            <Network className="w-6 h-6 text-brand-cyan" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-foreground text-glow-cyan">INFRASTRUCTURE INTELLIGENCE MAP</h1>
            <p className="text-xs font-mono tracking-widest text-brand-cyan/60 uppercase">Live service topology and dependency mapping</p>
          </div>
        </div>
      </div>

      <HoloCard className="flex-1 overflow-hidden" glowColor="cyan">
        <div style={{ width: "100%", height: "100%" }} className="bg-background-dark/50">
          <ReactFlow 
            nodes={nodes} 
            edges={initialEdges} 
            fitView 
            proOptions={{ hideAttribution: true }}
          >
            <Background color="#334155" gap={24} size={1} />
            <Controls className="bg-slate-900 border border-slate-800 fill-slate-300" />
          </ReactFlow>
        </div>
      </HoloCard>
    </div>
  );
}
