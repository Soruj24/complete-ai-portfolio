"use client";

import { motion } from "framer-motion";
import { Phone, Wifi, WifiOff, Activity, Upload, Download, Signal } from "lucide-react";
import type { PeerConnection } from "../types";

const MOCK: PeerConnection[] = [
  { id: "peer-1", peer: "AI Model - GPT-4o", status: "connected", protocol: "WebRTC", latency: 45, bytesSent: 2450000, bytesReceived: 8900000, connectedAt: "2026-07-05 10:00" },
  { id: "peer-2", peer: "AI Model - Claude 3.5", status: "connected", protocol: "WebRTC", latency: 52, bytesSent: 1800000, bytesReceived: 6200000, connectedAt: "2026-07-05 10:00" },
  { id: "peer-3", peer: "Streaming Server", status: "connected", protocol: "WebSocket", latency: 12, bytesSent: 45000000, bytesReceived: 12000000, connectedAt: "2026-07-05 08:00" },
  { id: "peer-4", peer: "Collaboration Peer #1", status: "disconnected", protocol: "WebRTC", latency: 0, bytesSent: 890000, bytesReceived: 3200000, connectedAt: "2026-07-04 14:00" },
  { id: "peer-5", peer: "Collaboration Peer #2", status: "connecting", protocol: "WebRTC", latency: 0, bytesSent: 0, bytesReceived: 0, connectedAt: "-" },
];

const formatBytes = (b: number) => b > 1000000 ? `${(b / 1000000).toFixed(1)} MB` : `${(b / 1000).toFixed(1)} KB`;

export function WebRtcPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-text-primary">WebRTC</h1><p className="text-sm text-text-tertiary">Real-time communication connections</p></div>

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Active Peers", value: MOCK.filter((p) => p.status === "connected").length.toString(), icon: Phone, color: "text-success" },
          { label: "Total Peers", value: MOCK.length.toString(), icon: Signal, color: "text-accent" },
          { label: "Avg Latency", value: `${Math.round(MOCK.filter((p) => p.status === "connected").reduce((a, p) => a + p.latency, 0) / Math.max(1, MOCK.filter((p) => p.status === "connected").length))}ms`, icon: Activity, color: "text-warning" },
          { label: "Total Data", value: formatBytes(MOCK.reduce((a, p) => a + p.bytesSent + p.bytesReceived, 0)), icon: Activity, color: "text-accent" },
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

      <div className="rounded-xl border border-border-primary bg-surface-primary overflow-hidden">
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border-primary bg-surface-secondary text-left text-xs text-text-tertiary">
          <th className="p-3 font-medium">Peer</th><th className="p-3 font-medium">Status</th><th className="p-3 font-medium">Protocol</th><th className="p-3 font-medium">Latency</th><th className="p-3 font-medium">Sent</th><th className="p-3 font-medium">Received</th><th className="p-3 font-medium">Connected</th>
        </tr></thead><tbody>
          {MOCK.map((p, i) => (
            <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
              className="border-b border-border-primary last:border-0 hover:bg-surface-hover transition-colors">
              <td className="p-3 font-medium text-text-primary">{p.peer}</td>
              <td className="p-3">
                <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium capitalize ${p.status === "connected" ? "bg-success/10 text-success" : p.status === "connecting" ? "bg-warning/10 text-warning" : "bg-surface-hover text-text-tertiary"}`}>
                  {p.status === "connected" ? <Wifi size={10} /> : <WifiOff size={10} />}{p.status}
                </span>
              </td>
              <td className="p-3 text-xs text-text-secondary">{p.protocol}</td>
              <td className="p-3">{p.status === "connected" ? <span className="flex items-center gap-1 text-xs text-text-secondary"><Activity size={12} />{p.latency}ms</span> : <span className="text-xs text-text-tertiary">—</span>}</td>
              <td className="p-3 text-xs text-text-secondary"><Upload size={10} className="inline mr-1" />{formatBytes(p.bytesSent)}</td>
              <td className="p-3 text-xs text-text-secondary"><Download size={10} className="inline mr-1" />{formatBytes(p.bytesReceived)}</td>
              <td className="p-3 text-xs text-text-tertiary">{p.connectedAt}</td>
            </motion.tr>
          ))}
        </tbody></table></div>
      </div>
    </div>
  );
}
