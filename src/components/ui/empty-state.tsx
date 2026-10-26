import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-[var(--radius-panel)] border border-bone-300 bg-white px-6 py-16 text-center",
        className,
      )}
    >
      {icon ? (
        <span
          aria-hidden="true"
          className="flex size-12 items-center justify-center rounded-full bg-moss-50 text-moss-700"
        >
          {icon}
        </span>
      ) : null}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold tracking-[-0.01em] text-ink-900">{title}</h3>
        <p className="mx-auto max-w-md text-sm leading-relaxed text-ink-500">{description}</p>
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
