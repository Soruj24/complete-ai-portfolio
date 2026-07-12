export function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function getTypeColor(type: string): string {
  const colors: Record<string, string> = {
    image: "bg-accent/10 text-accent",
    video: "bg-purple-500/10 text-purple-500",
    pdf: "bg-error/10 text-error",
    document: "bg-info/10 text-info",
    icon: "bg-amber-500/10 text-amber-500",
    svg: "bg-amber-500/10 text-amber-500",
    audio: "bg-pink-500/10 text-pink-500",
  };
  return colors[type] || "bg-surface-hover text-text-tertiary";
}
