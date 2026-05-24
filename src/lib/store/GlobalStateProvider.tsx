"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

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
    cpu_usage: 24,
    memory_usage: 41,
    latency_ms: 18,
    requests_per_sec: 1420,
    system_health: 98,
  },

  metricsHistory: [],

  incidents: [
    {
      id: "1",
      service: "Auth Gateway",
      region: "US-EAST-1",
      severity: "CRITICAL",
      title: "Ransomware Activity Detected",
      ai_summary:
        "AI detected abnormal encryption patterns and lateral movement attempts.",
      suggested_action: "Immediate node isolation initiated.",
      confidence_score: 0.97,
      affected_users: 12840,
      timestamp: Math.floor(Date.now() / 1000),
    },

    {
      id: "2",
      service: "Payments API",
      region: "EU-WEST-2",
      severity: "WARNING",
      title: "Suspicious API Traffic Spike",
      ai_summary:
        "Unusual request bursts detected from rotating IP addresses.",
      suggested_action: "Traffic throttling enabled.",
      confidence_score: 0.83,
      affected_users: 3100,
      timestamp: Math.floor(Date.now() / 1000),
    },

    {
      id: "3",
      service: "Monitoring Core",
      region: "AP-SOUTH-1",
      severity: "SAFE",
      title: "System Stabilized",
      ai_summary:
        "Previous service instability resolved autonomously.",
      suggested_action: "Monitoring resumed.",
      confidence_score: 0.99,
      affected_users: 0,
      timestamp: Math.floor(Date.now() / 1000),
    },
  ],

  aiAgents: {
    Sentinel: {
      state: "Monitoring",
      confidence: 98,
      active: true,
    },

    Guardian: {
      state: "Analyzing",
      confidence: 92,
      active: true,
    },

    Watchtower: {
      state: "Scanning",
      confidence: 95,
      active: true,
    },
  },

  latestAILog:
    "[AI_CORE] Autonomous security orchestration initialized.",

  securityThreatLevel: 72,

  isConnected: false,
};

const GlobalStateContext =
  createContext<GlobalState>(initialState);

export const GlobalStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] =
    useState<GlobalState>(initialState);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectInterval: NodeJS.Timeout;

    const connect = () => {
      try {
        ws = new WebSocket("ws://127.0.0.1:8000/ws");

        ws.onopen = () => {
          setState((prev) => ({
            ...prev,
            isConnected: true,
          }));

          clearInterval(reconnectInterval);
        };

        ws.onmessage = (event) => {
          try {
            const payload = JSON.parse(event.data);

            if (payload.type === "metrics") {
              setState((prev) => {
                const newHistory = [
                  ...prev.metricsHistory,
                  payload.data,
                ].slice(-60);

                return {
                  ...prev,
                  metrics: payload.data,
                  metricsHistory: newHistory,
                };
              });
            }

            else if (payload.type === "incident") {
              setState((prev) => ({
                ...prev,
                incidents: [
                  payload.data,
                  ...prev.incidents,
                ].slice(0, 50),
              }));
            }

            else if (payload.type === "ai_agents") {
              setState((prev) => ({
                ...prev,
                aiAgents: payload.data.states,
                latestAILog:
                  payload.data.latest_log ||
                  prev.latestAILog,
              }));
            }

            else if (payload.type === "security") {
              setState((prev) => ({
                ...prev,
                securityThreatLevel:
                  payload.data.threat_level,
              }));
            }
          } catch (e) {
            console.error(
              "Failed to parse websocket message",
              e
            );
          }
        };

        ws.onclose = () => {
          setState((prev) => ({
            ...prev,
            isConnected: false,
          }));

          reconnectInterval = setInterval(
            connect,
            3000
          );
        };
      } catch (err) {
        console.error("WebSocket failed", err);
      }
    };

    connect();

    return () => {
      clearInterval(reconnectInterval);

      if (ws) ws.close();
    };
  }, []);

  /* ============================= */
  /* FALLBACK LIVE MOCK SIMULATION */
  /* ============================= */

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const severities = [
          "SAFE",
          "WARNING",
          "CRITICAL",
        ] as const;

        const titles = [
          "Unauthorized Access Attempt",
          "Suspicious Traffic Spike",
          "AI Threat Detection",
          "DNS Anomaly Detected",
          "Firewall Breach Attempt",
          "Lateral Movement Suspected",
        ];

        const services = [
          "Gateway",
          "Database",
          "Payments API",
          "Firewall",
          "Core AI",
        ];

        const regions = [
          "US-EAST-1",
          "EU-WEST-2",
          "AP-SOUTH-1",
        ];

        const severity =
          severities[
          Math.floor(
            Math.random() * severities.length
          )
          ];

        const newIncident: Incident = {
          id: Date.now().toString(),

          severity,

          timestamp: Math.floor(Date.now() / 1000),

          region:
            regions[
            Math.floor(
              Math.random() * regions.length
            )
            ],

          title:
            titles[
            Math.floor(
              Math.random() * titles.length
            )
            ],

          service:
            services[
            Math.floor(
              Math.random() * services.length
            )
            ],

          confidence_score:
            Math.random() * 0.3 + 0.7,

          affected_users:
            Math.floor(Math.random() * 25000),

          suggested_action:
            "Autonomous AI mitigation enabled.",

          ai_summary:
            "Behavioral anomaly detected by Sentinel AI. Threat intelligence correlation active.",
        };

        const nextThreat =
          severity === "CRITICAL"
            ? Math.min(
              prev.securityThreatLevel + 4,
              100
            )
            : Math.max(
              prev.securityThreatLevel - 1,
              15
            );

        return {
          ...prev,

          incidents: [
            newIncident,
            ...prev.incidents,
          ].slice(0, 20),

          securityThreatLevel: nextThreat,

          latestAILog: `[AI_CORE] ${newIncident.title} detected in ${newIncident.region}`,

          metrics: {
            cpu_usage:
              20 + Math.random() * 70,

            memory_usage:
              30 + Math.random() * 50,

            latency_ms:
              10 + Math.random() * 120,

            requests_per_sec:
              1200 + Math.random() * 800,

            system_health:
              70 + Math.random() * 30,
          },

          metricsHistory: [
            ...prev.metricsHistory,
            {
              cpu_usage:
                20 + Math.random() * 70,

              memory_usage:
                30 + Math.random() * 50,

              latency_ms:
                10 + Math.random() * 120,

              requests_per_sec:
                1200 + Math.random() * 800,

              system_health:
                70 + Math.random() * 30,
            },
          ].slice(-60),
        };
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <GlobalStateContext.Provider value={state}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () =>
  useContext(GlobalStateContext);