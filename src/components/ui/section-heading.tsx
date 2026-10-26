import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "light" | "dark";
  headingId?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  headingId,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className={cn("eyebrow", tone === "light" ? "text-moss-700" : "text-moss-300")}>
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className={cn(
            "display-md mt-3 text-balance",
            tone === "light" ? "text-ink-950" : "text-bone-50",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-xl text-[15px] leading-relaxed",
              tone === "light" ? "text-ink-600" : "text-ink-300",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
