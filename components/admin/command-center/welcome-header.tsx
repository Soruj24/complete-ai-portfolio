"use client";

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
    <div>
      <p className="text-[12px] font-medium text-text-tertiary">{greeting}</p>
      <h1 className="text-[20px] font-semibold text-text-primary tracking-[-0.02em] mt-0.5">{name}</h1>
      <p className="text-[12px] text-text-tertiary mt-0.5">{date}</p>
      {unscheduledItems > 0 && (
        <p className="text-[11px] text-amber-500 mt-2 inline-flex items-center gap-1.5 bg-amber-500/10 rounded px-2 py-0.5 font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          {unscheduledItems} unscheduled {unscheduledItems === 1 ? "item" : "items"} need attention
        </p>
      )}
    </div>
  );
}
