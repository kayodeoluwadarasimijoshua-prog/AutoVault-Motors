import { cn } from "@/lib/cn";
import type { VehicleAvailability } from "@/types/vehicle";

const tones: Record<VehicleAvailability, string> = {
  Available: "border-moss-200 bg-moss-50 text-moss-700",
  Reserved: "border-amber-200 bg-amber-50 text-amber-800",
  Sold: "border-bone-300 bg-bone-200 text-ink-700",
};

const overlayTones: Record<VehicleAvailability, string> = {
  Available: "bg-ink-950/85 text-bone-50 ring-1 ring-white/15",
  Reserved: "bg-ink-950/85 text-amber-200 ring-1 ring-white/15",
  Sold: "bg-ink-950/85 text-ink-200 ring-1 ring-white/15",
};

interface AvailabilityBadgeProps {
  availability: VehicleAvailability;
  variant?: "solid" | "overlay";
  className?: string;
}

export function AvailabilityBadge({ availability, variant = "solid", className }: AvailabilityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium tracking-[0.02em]",
        variant === "overlay" ? overlayTones[availability] : tones[availability],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          availability === "Available" && "bg-moss-500",
          availability === "Reserved" && "bg-amber-500",
          availability === "Sold" && "bg-ink-400",
        )}
      />
      {availability}
    </span>
  );
}
