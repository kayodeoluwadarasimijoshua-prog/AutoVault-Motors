import Link from "next/link";
import { cn } from "@/lib/cn";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
  /** Hides the wordmark on very small screens when space is tight. */
  compact?: boolean;
}

export function Logo({ className, tone = "light", compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="AutoVault Motors — home"
      className={cn("group inline-flex items-center gap-2.5 rounded-sm", className)}
    >
      <span
        aria-hidden="true"
        className={cn(
          "flex size-9 items-center justify-center rounded-[10px] border",
          tone === "light" ? "border-white/15 bg-ink-900" : "border-ink-300/40 bg-ink-950",
        )}
      >
        <svg viewBox="0 0 32 32" className="size-[22px]" fill="none" aria-hidden="true">
          <path
            d="M6.4 25.4 16 6.6l9.6 18.8"
            stroke="var(--color-moss-400)"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10.9 19.6h10.2"
            stroke="var(--color-bone-50)"
            strokeWidth="1.9"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      </span>
      <span className={cn("flex flex-col leading-none", compact && "hidden xs:flex")}>
        <span
          className={cn(
            "text-[15px] font-semibold tracking-[-0.015em]",
            tone === "light" ? "text-bone-50" : "text-ink-950",
          )}
        >
          AUTOVAULT
        </span>
        <span
          className={cn(
            "mt-1 text-[9px] font-medium uppercase tracking-[0.34em]",
            tone === "light" ? "text-ink-400" : "text-ink-500",
          )}
        >
          Motors
        </span>
      </span>
    </Link>
  );
}
