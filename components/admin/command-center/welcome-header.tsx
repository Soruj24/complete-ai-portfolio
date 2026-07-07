"use client";

import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  name: string;
  unscheduledItems?: number;
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function getCurrentDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function WelcomeHeader({ name, unscheduledItems = 0 }: WelcomeHeaderProps) {
  const greeting = getGreeting();
  const date = getCurrentDate();

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-accent/5 via-surface to-surface p-6"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="relative z-10">
        <p className="text-xs font-medium text-accent uppercase tracking-wider">{greeting}</p>
        <h1 className="text-2xl font-bold text-text-primary mt-1">{name}</h1>
        <p className="text-sm text-text-tertiary mt-1">{date}</p>
        {unscheduledItems > 0 && (
          <p className="text-xs text-amber-500 mt-3 inline-flex items-center gap-1.5 bg-amber-500/10 rounded-full px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
            {unscheduledItems} unscheduled {unscheduledItems === 1 ? "item" : "items"} need attention
          </p>
        )}
      </div>
    </motion.div>
  );
}
