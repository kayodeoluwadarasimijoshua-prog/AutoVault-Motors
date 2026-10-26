"use client";

import { GitCompareArrows } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatVehicleName } from "@/lib/formatters";
import { useComparison } from "@/components/vehicles/comparison-provider";
import type { Vehicle } from "@/types/vehicle";

interface CompareToggleProps {
  vehicle: Vehicle;
  variant?: "overlay" | "inline";
}

/** Adds or removes a vehicle from the comparison list (maximum three). */
export function CompareToggle({ vehicle, variant = "overlay" }: CompareToggleProps) {
  const { isSelected, toggle, isFull } = useComparison();
  const selected = isSelected(vehicle.slug);
  const blocked = isFull && !selected;
  const name = formatVehicleName(vehicle);

  const label = selected
    ? `Remove ${name} from comparison`
    : blocked
      ? `Comparison list is full — remove a vehicle before adding ${name}`
      : `Add ${name} to comparison`;

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={label}
      title={label}
      aria-disabled={blocked || undefined}
      onClick={() => toggle(vehicle.slug)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md text-[11px] font-medium transition-colors",
        variant === "overlay" &&
          "size-10 bg-ink-950/75 text-bone-50 ring-1 ring-white/20 backdrop-blur-sm hover:bg-ink-950/95 sm:size-8",
        variant === "overlay" && selected && "bg-moss-500 text-ink-950 ring-moss-300 hover:bg-moss-400",
        variant === "overlay" && blocked && "text-ink-200/70 ring-white/10 hover:bg-ink-950/75",
        variant === "inline" &&
          "h-10 border px-3 text-xs sm:h-9",
        variant === "inline" && selected
          ? "border-moss-300 bg-moss-50 text-moss-700"
          : variant === "inline"
            ? "border-bone-300 bg-white text-ink-700 hover:border-ink-400"
            : "",
      )}
    >
      <GitCompareArrows aria-hidden="true" className="size-3.5" strokeWidth={1.9} />
      {variant === "inline" ? (selected ? "In comparison" : "Compare") : null}
    </button>
  );
}
