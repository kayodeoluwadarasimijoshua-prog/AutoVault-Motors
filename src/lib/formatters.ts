/**
 * Display formatters.
 *
 * Number formatting uses an explicit locale so that server-rendered HTML and
 * client rendering always produce identical strings (no hydration mismatches).
 */

const GROUPING = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  useGrouping: true,
});

/** ₦22,500,000 — the primary price format used across the site. */
export function formatNaira(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `₦${GROUPING.format(Math.round(value))}`;
}

/** ₦22.5m — compact price for dense layouts and chart-like labels. */
export function formatNairaCompact(value: number): string {
  if (!Number.isFinite(value)) return "—";
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const digits = Number.isInteger(millions) ? 0 : 1;
    return `₦${millions.toFixed(digits)}m`;
  }
  return formatNaira(value);
}

/** 48,000 km */
export function formatMileage(mileage: number): string {
  if (!Number.isFinite(mileage)) return "—";
  return `${GROUPING.format(Math.round(mileage))} km`;
}

/** 2021 Toyota Camry */
export function formatVehicleName(vehicle: {
  year: number;
  make: string;
  model: string;
}): string {
  return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
}

/** "2.5L" from "2.5" or "2500cc" style input, leaving already-formatted values alone. */
export function formatEngineCapacity(engineCapacity?: string): string | null {
  if (!engineCapacity) return null;
  const value = engineCapacity.trim();
  if (!value) return null;
  return value;
}

/** 1 vehicle / 3 vehicles */
export function pluralise(count: number, singular: string, plural?: string): string {
  return `${count} ${count === 1 ? singular : (plural ?? `${singular}s`)}`;
}

/** Trims long copy to a sentence-safe length for cards and meta descriptions. */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 40 ? lastSpace : maxLength).trimEnd()}…`;
}
