"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Cpu, DollarSign, Clock, AlertTriangle, Zap } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import type { AiMetric, AiDailyUsage } from "../types";

const DAILY: AiDailyUsage[] = Array.from({ length: 14 }, (_, i) => ({
  date: new Date(2026, 6, i + 1).toISOString().slice(0, 10),
  calls: 80 + Math.floor(Math.random() * 200),
  tokens: 15000 + Math.floor(Math.random() * 50000),
}));

const MODELS: AiMetric[] = [
  { model: "GPT-4o", provider: "OpenAI", totalCalls: 12450, totalTokens: 2850000, avgLatency: 1240, cost: 285.40, errorRate: 0.8, color: "#10a37f" },
  { model: "Claude 3.5 Sonnet", provider: "Anthropic", totalCalls: 8320, totalTokens: 1980000, avgLatency: 980, cost: 198.20, errorRate: 0.5, color: "#d97706" },
  { model: "Gemini Pro", provider: "Google", totalCalls: 5610, totalTokens: 1420000, avgLatency: 1520, cost: 112.80, errorRate: 1.2, color: "#4285f4" },
  { model: "Llama 3.1 70B", provider: "Meta", totalCalls: 3480, totalTokens: 890000, avgLatency: 2100, cost: 52.20, errorRate: 2.1, color: "#6b7280" },
  { model: "Mistral Large", provider: "Mistral AI", totalCalls: 2150, totalTokens: 520000, avgLatency: 880, cost: 32.25, errorRate: 0.3, color: "#7c3aed" },
];

const totalCalls = MODELS.reduce((a, m) => a + m.totalCalls, 0);
const totalCost = MODELS.reduce((a, m) => a + m.cost, 0);

export function AiAnalyticsPage() {
  const [chart, setChart] = useState<"calls" | "tokens">("calls");

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">AI Analytics</h1><p className="text-sm text-text-tertiary">AI model usage, cost, and performance metrics</p></div>

      <div className="grid gap-4 sm:grid-cols-5">
        {[
          { label: "Total Calls", value: totalCalls.toLocaleString(), icon: Brain, color: "text-accent" },
          { label: "Total Tokens", value: `${(MODELS.reduce((a, m) => a + m.totalTokens, 0) / 1000000).toFixed(1)}M`, icon: Cpu, color: "text-accent" },
          { label: "Total Cost", value: `$${totalCost.toFixed(0)}`, icon: DollarSign, color: "text-success" },
          { label: "Avg Latency", value: `${Math.round(MODELS.reduce((a, m) => a + m.avgLatency, 0) / MODELS.length)}ms`, icon: Clock, color: "text-warning" },
          { label: "Avg Error Rate", value: `${(MODELS.reduce((a, m) => a + m.errorRate, 0) / MODELS.length).toFixed(1)}%`, icon: AlertTriangle, color: "text-error" },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
            className="rounded-xl border border-border-primary bg-surface-primary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg bg-surface-hover ${s.color}`}><s.icon size={18} /></div>
              <div><p className="text-xs text-text-tertiary">{s.label}</p><p className="text-lg font-semibold text-text-primary">{s.value}</p></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-text-primary">Daily Usage (14 days)</h3>
          <div className="flex gap-1 rounded-lg border border-border-primary bg-surface-primary p-0.5">
            {(["calls", "tokens"] as const).map((c) => (
              <button key={c} onClick={() => setChart(c)}
                className={`rounded-md px-3 py-1 text-[10px] font-medium capitalize ${chart === c ? "bg-accent text-white" : "text-text-secondary hover:text-text-primary"}`}>{c}</button>
            ))}
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chart === "calls" ? (
              <AreaChart data={DAILY}>
                <defs><linearGradient id="aiCallsGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" /><stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-surface-primary)", border: "1px solid var(--color-border-primary)", borderRadius: 8, fontSize: 12 }} />
                <Area type="monotone" dataKey="calls" stroke="var(--color-accent)" fill="url(#aiCallsGrad)" strokeWidth={2} />
              </AreaChart>
            ) : (
              <BarChart data={DAILY}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} tickFormatter={(v) => new Date(v).toLocaleDateString("en-US", { month: "short", day: "numeric" })} />
                <YAxis tick={{ fontSize: 11, fill: "var(--color-text-tertiary)" }} />
                <Tooltip contentStyle={{ backgroundColor: "var(--color-surface-primary)", border: "1px solid var(--color-border-primary)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="tokens" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">Model</th><th className="p-3 font-medium">Provider</th><th className="p-3 font-medium">Calls</th><th className="p-3 font-medium">Tokens</th><th className="p-3 font-medium">Avg Latency</th><th className="p-3 font-medium">Cost</th><th className="p-3 font-medium">Error Rate</th>
        </tr></thead><tbody>
          {MODELS.map((m, i) => (
            <motion.tr key={m.model} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
              <td className="p-3"><div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: m.color }} />
                <span className="font-medium text-text-primary">{m.model}</span>
              </div></td>
              <td className="p-3 text-text-secondary text-xs">{m.provider}</td>
              <td className="p-3 text-text-secondary">{m.totalCalls.toLocaleString()}</td>
              <td className="p-3 text-text-secondary">{(m.totalTokens / 1000000).toFixed(1)}M</td>
              <td className="p-3"><span className="flex items-center gap-1 text-text-secondary"><Clock size={12} />{m.avgLatency}ms</span></td>
              <td className="p-3 font-medium text-text-primary">${m.cost.toFixed(2)}</td>
              <td className="p-3"><span className={`rounded-md px-2 py-0.5 text-[10px] font-medium ${m.errorRate < 1 ? "bg-success/10 text-success" : m.errorRate < 2 ? "bg-warning/10 text-warning" : "bg-error/10 text-error"}`}>{m.errorRate}%</span></td>
            </motion.tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}
