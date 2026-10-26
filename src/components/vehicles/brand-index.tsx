"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { VEHICLE_COUNT_BY_MAKE } from "@/data/vehicles";

interface BrandIndexProps {
  activeMake: string;
  onSelect: (make: string) => void;
  onShowAll: () => void;
}

/**
 * Quick brand switcher above the inventory results. Each brand has a deep
 * selection, so this is the fastest way into a specific marque and it keeps the
 * URL in sync through the same filter callback the panel uses.
 */
export function BrandIndex({ activeMake, onSelect, onShowAll }: BrandIndexProps) {
  const total = VEHICLE_COUNT_BY_MAKE.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <nav aria-label="Browse by brand" className="mt-6">
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <button
            type="button"
            onClick={onShowAll}
            aria-pressed={activeMake === ""}
            className={cn(
              "inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-[12.5px] font-medium transition-colors sm:h-9",
              activeMake === ""
                ? "border-ink-950 bg-ink-950 text-bone-50"
                : "border-bone-300 bg-white text-ink-700 hover:border-ink-400 hover:text-ink-950",
            )}
          >
            All brands
            <span
              className={cn(
                "rounded px-1 font-mono text-[10px]",
                activeMake === "" ? "bg-white/15 text-bone-50" : "bg-bone-100 text-ink-500",
              )}
            >
              {total}
            </span>
          </button>
        </li>

        {VEHICLE_COUNT_BY_MAKE.map((entry) => {
          const active = activeMake.toLowerCase() === entry.make.toLowerCase();
          return (
            <li key={entry.make}>
              <button
                type="button"
                onClick={() => onSelect(entry.make)}
                aria-pressed={active}
                className={cn(
                  "inline-flex h-10 items-center gap-1.5 rounded-md border px-3 text-[12.5px] font-medium transition-colors sm:h-9",
                  active
                    ? "border-moss-600 bg-moss-500 text-ink-950"
                    : "border-bone-300 bg-white text-ink-700 hover:border-ink-400 hover:text-ink-950",
                )}
              >
                {entry.make}
                <span
                  className={cn(
                    "rounded px-1 font-mono text-[10px]",
                    active ? "bg-ink-950/15 text-ink-950" : "bg-bone-100 text-ink-500",
                  )}
                >
                  {entry.count}
                </span>
              </button>
            </li>
          );
        })}

        <li className="ml-auto hidden sm:block">
          <Link
            href="/compare"
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-ink-600 transition-colors hover:text-ink-950"
          >
            Compare a shortlist
            <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}
