export interface PeerConnection {
  id: string;
  peer: string;
  status: "connected" | "disconnected" | "connecting";
  protocol: string;
  latency: number;
  bytesSent: number;
  bytesReceived: number;
  connectedAt: string;
}
