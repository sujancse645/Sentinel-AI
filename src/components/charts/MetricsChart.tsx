"use client";

import { useGlobalState } from "@/lib/store/GlobalStateProvider";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

interface MetricsChartProps {
  dataKey: "cpu_usage" | "requests_per_sec" | "system_health" | "latency_ms";
  color: string;
  name: string;
}

export function MetricsChart({ dataKey, color, name }: MetricsChartProps) {
  const { metricsHistory } = useGlobalState();

  const data = metricsHistory.map((m, i) => ({
    time: i,
    value: typeof m[dataKey] === "number" ? m[dataKey] : 0,
  }));

  return (
    <div className="w-full h-[180px] min-h-[180px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.35} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(51, 65, 85, 0.4)"
            vertical={false}
          />

          <XAxis dataKey="time" hide />

          <YAxis
            domain={["auto", "auto"]}
            stroke="#475569"
            fontSize={10}
            tickFormatter={(val: number) => {
              if (dataKey === "latency_ms") return `${val}ms`;
              if (
                dataKey === "cpu_usage" ||
                dataKey === "system_health"
              ) {
                return `${val}%`;
              }
              return String(val);
            }}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(5, 8, 22, 0.95)",
              borderColor: color,
              borderRadius: "8px",
              backdropFilter: "blur(10px)",
            }}
            itemStyle={{ color }}
            labelStyle={{ display: "none" }}
            formatter={(value: unknown) => {
              const num =
                typeof value === "number"
                  ? value
                  : Number(value ?? 0);

              return [`${num.toFixed(1)}`, name];
            }}
          />

          <Area
            type={dataKey === "latency_ms" ? "stepAfter" : "monotone"}
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#color-${dataKey})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}