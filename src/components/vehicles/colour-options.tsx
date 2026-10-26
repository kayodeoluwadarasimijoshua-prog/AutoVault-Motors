import { cn } from "@/lib/cn";
import type { ColourOption } from "@/types/vehicle";

interface ColourOptionsProps {
  colours: ColourOption[];
  className?: string;
  /** Compact variant used inside vehicle cards. */
  variant?: "full" | "compact";
}

/**
 * Shows the colour options recorded for a listing. Sample data on this concept
 * site, so the copy never implies the colours are confirmed stock.
 */
export function ColourOptions({ colours, className, variant = "full" }: ColourOptionsProps) {
  if (colours.length === 0) return null;

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <span aria-hidden="true" className="flex items-center gap-1">
          {colours.map((colour) => (
            <span
              key={colour.name}
              className="size-3 rounded-full border border-ink-950/15"
              style={{ backgroundColor: colour.hex }}
            />
          ))}
        </span>
        <span className="text-[11px] leading-none text-ink-500">
          {colours.length} colour{colours.length === 1 ? "" : "s"}
        </span>
      </div>
    );
  }

  return (
    <section
      aria-labelledby="colour-options-heading"
      className={cn("rounded-lg border border-bone-200 bg-bone-50 p-3.5", className)}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="colour-options-heading" className="text-[13px] font-medium text-ink-900">
          Colour options
        </h2>
        <span className="rounded border border-bone-300 bg-white px-1.5 py-0.5 font-mono text-[10px] tracking-[0.04em] text-ink-600">
          {colours.length} listed
        </span>
      </div>

      <ul className="mt-2.5 flex flex-wrap gap-x-3.5 gap-y-2">
        {colours.map((colour) => (
          <li key={colour.name} className="inline-flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="size-3.5 shrink-0 rounded-full border border-ink-950/20 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.25)]"
              style={{ backgroundColor: colour.hex }}
            />
            <span className="text-[12px] text-ink-700">{colour.name}</span>
          </li>
        ))}
      </ul>

      <p className="mt-2.5 text-[11px] leading-relaxed text-ink-500">
        Sample colour options for this demonstration listing — confirm the actual colours in stock with
        the dealership.
      </p>
    </section>
  );
}
