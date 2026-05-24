"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Metrics = {
  cpu_usage: number;
  memory_usage: number;
  latency_ms: number;
  requests_per_sec: number;
  system_health: number;
};

type Incident = {
  id: string;
  service: string;
  region: string;
  severity: "SAFE" | "WARNING" | "CRITICAL";
  title: string;
  ai_summary: string;
  suggested_action: string;
  confidence_score: number;
  affected_users: number;
  timestamp: number;
};

type AIAgentState = {
  state: string;
  confidence: number;
  active: boolean;
};

type GlobalState = {
  metrics: Metrics;
  metricsHistory: Metrics[];
  incidents: Incident[];
  aiAgents: Record<string, AIAgentState>;
  latestAILog: string | null;
  securityThreatLevel: number;
  isConnected: boolean;
};

const initialState: GlobalState = {
  metrics: {
    cpu_usage: 0,
    memory_usage: 0,
    latency_ms: 0,
    requests_per_sec: 0,
    system_health: 100,
  },
  metricsHistory: [],
  incidents: [],
  aiAgents: {},
  latestAILog: null,
  securityThreatLevel: 12, // Default low threat
  isConnected: false,
};

const GlobalStateContext = createContext<GlobalState>(initialState);

export const GlobalStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<GlobalState>(initialState);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectInterval: NodeJS.Timeout;

    const connect = () => {
      ws = new WebSocket("ws://127.0.0.1:8000/ws");

      ws.onopen = () => {
        setState((prev) => ({ ...prev, isConnected: true }));
        clearInterval(reconnectInterval);
      };

      ws.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload.type === "metrics") {
            setState((prev) => {
              const newHistory = [...prev.metricsHistory, payload.data].slice(-60); // keep last 60 ticks
              return { ...prev, metrics: payload.data, metricsHistory: newHistory };
            });
          } else if (payload.type === "incident") {
            setState((prev) => ({
              ...prev,
              incidents: [payload.data, ...prev.incidents].slice(0, 50),
            }));
          } else if (payload.type === "ai_agents") {
            setState((prev) => ({
              ...prev,
              aiAgents: payload.data.states,
              latestAILog: payload.data.latest_log || prev.latestAILog,
            }));
          } else if (payload.type === "security") {
            setState((prev) => ({
              ...prev,
              securityThreatLevel: payload.data.threat_level
            }));
          }
        } catch (e) {
          console.error("Failed to parse websocket message", e);
        }
      };

      ws.onclose = () => {
        setState((prev) => ({ ...prev, isConnected: false }));
        reconnectInterval = setInterval(connect, 3000);
      };
    };

    connect();

    return () => {
      clearInterval(reconnectInterval);
      if (ws) ws.close();
    };
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
