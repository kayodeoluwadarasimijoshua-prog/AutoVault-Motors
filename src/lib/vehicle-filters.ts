/**
 * Inventory filtering, sorting and URL serialisation.
 *
 * These functions are pure so they can be used by server components (initial
 * render), client components (live filtering) and unit tests without change.
 */

import type { SortKey, Transmission, Vehicle, VehicleCondition } from "@/types/vehicle";

export interface VehicleFilters {
  query: string;
  make: string;
  maxPrice: number | null;
  minPrice: number | null;
  minYear: number | null;
  maxYear: number | null;
  transmission: Transmission | "";
  bodyStyle: string;
  condition: VehicleCondition | "";
  fuelType: string;
  sort: SortKey;
}

export const DEFAULT_FILTERS: VehicleFilters = {
  query: "",
  make: "",
  maxPrice: null,
  minPrice: null,
  minYear: null,
  maxYear: null,
  transmission: "",
  bodyStyle: "",
  condition: "",
  fuelType: "",
  sort: "featured",
};

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured first" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "year-desc", label: "Newest model year" },
  { value: "year-asc", label: "Oldest model year" },
];

const SORT_KEYS = SORT_OPTIONS.map((option) => option.value);

export const TRANSMISSION_OPTIONS: Transmission[] = ["Automatic", "Manual"];

export const CONDITION_OPTIONS: VehicleCondition[] = ["Foreign Used", "Nigerian Used"];

/** Price bands offered in the search and filter controls (naira). */
export const PRICE_STEPS = [
  10_000_000, 15_000_000, 20_000_000, 25_000_000, 30_000_000, 40_000_000,
] as const;

const MAX_PRICE_BOUND = 1_000_000_000;
const MIN_YEAR_BOUND = 1980;
const MAX_YEAR_BOUND = 2100;

type QueryValue = string | string[] | undefined;
type QueryRecord = Record<string, QueryValue>;

function firstValue(value: QueryValue): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

function parseNumber(value: QueryValue, min: number, max: number): number | null {
  const raw = firstValue(value).trim();
  if (!raw) return null;
  const parsed = Number(raw.replace(/[,\s₦]/g, ""));
  if (!Number.isFinite(parsed)) return null;
  const rounded = Math.round(parsed);
  if (rounded < min || rounded > max) return null;
  return rounded;
}

function parseEnum<T extends string>(value: QueryValue, allowed: readonly T[]): T | "" {
  const raw = firstValue(value).trim();
  if (!raw) return "";
  const match = allowed.find((option) => option.toLowerCase() === raw.toLowerCase());
  return match ?? "";
}

/**
 * Parses untrusted URL query parameters into a validated filter state.
 * Unknown keys, repeated values and out-of-range numbers are ignored rather
 * than thrown, and reversed price/year ranges are corrected.
 */
export function parseVehicleFilters(input: QueryRecord = {}): VehicleFilters {
  const filters: VehicleFilters = {
    query: firstValue(input.q ?? input.search ?? input.query).trim().slice(0, 80),
    make: firstValue(input.make).trim().slice(0, 40),
    maxPrice: parseNumber(input.maxPrice, 0, MAX_PRICE_BOUND),
    minPrice: parseNumber(input.minPrice, 0, MAX_PRICE_BOUND),
    minYear: parseNumber(input.minYear, MIN_YEAR_BOUND, MAX_YEAR_BOUND),
    maxYear: parseNumber(input.maxYear, MIN_YEAR_BOUND, MAX_YEAR_BOUND),
    transmission: parseEnum(input.transmission, TRANSMISSION_OPTIONS),
    bodyStyle: firstValue(input.bodyStyle).trim().slice(0, 40),
    condition: parseEnum(input.condition, CONDITION_OPTIONS),
    fuelType: firstValue(input.fuelType).trim().slice(0, 20),
    sort: parseEnum(input.sort, SORT_KEYS) || DEFAULT_FILTERS.sort,
  };

  if (filters.minPrice !== null && filters.maxPrice !== null && filters.minPrice > filters.maxPrice) {
    [filters.minPrice, filters.maxPrice] = [filters.maxPrice, filters.minPrice];
  }
  if (filters.minYear !== null && filters.maxYear !== null && filters.minYear > filters.maxYear) {
    [filters.minYear, filters.maxYear] = [filters.maxYear, filters.minYear];
  }

  return filters;
}

/** Serialises filters to query parameters, omitting defaults for tidy URLs. */
export function filtersToSearchParams(filters: VehicleFilters): URLSearchParams {
  const params = new URLSearchParams();
  const query = filters.query.trim();
  if (query) params.set("q", query);
  if (filters.make) params.set("make", filters.make);
  if (filters.minPrice !== null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.minYear !== null) params.set("minYear", String(filters.minYear));
  if (filters.maxYear !== null) params.set("maxYear", String(filters.maxYear));
  if (filters.transmission) params.set("transmission", filters.transmission);
  if (filters.bodyStyle) params.set("bodyStyle", filters.bodyStyle);
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.fuelType) params.set("fuelType", filters.fuelType);
  if (filters.sort !== DEFAULT_FILTERS.sort) params.set("sort", filters.sort);
  return params;
}

/** "?make=Toyota&maxPrice=15000000", or "" when no filters are active. */
export function filtersToQueryString(filters: VehicleFilters): string {
  const query = filtersToSearchParams(filters).toString();
  return query ? `?${query}` : "";
}

/** Number of active filters, excluding sort (used for the "Filters (2)" badge). */
export function countActiveFilters(filters: VehicleFilters): number {
  const candidates = [
    filters.query.trim(),
    filters.make,
    filters.minPrice,
    filters.maxPrice,
    filters.minYear,
    filters.maxYear,
    filters.transmission,
    filters.bodyStyle,
    filters.condition,
    filters.fuelType,
  ];
  return candidates.filter((value) => value !== "" && value !== null).length;
}

export function hasActiveFilters(filters: VehicleFilters): boolean {
  return countActiveFilters(filters) > 0;
}

/** Case-insensitive multi-token search across the fields shoppers actually type. */
export function matchesSearch(vehicle: Vehicle, query: string): boolean {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return true;

  const haystack = [
    vehicle.make,
    vehicle.model,
    String(vehicle.year),
    vehicle.description,
    vehicle.bodyStyle,
    vehicle.condition,
    vehicle.exteriorColour,
    vehicle.fuelType,
    vehicle.transmission,
    vehicle.stockNumber,
  ]
    .join(" ")
    .toLowerCase();

  return tokens.every((token) => haystack.includes(token));
}

/** Applies every active filter. An empty result set is a valid outcome. */
export function filterVehicles(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
  return vehicles.filter((vehicle) => {
    if (!matchesSearch(vehicle, filters.query)) return false;
    if (filters.make && vehicle.make.toLowerCase() !== filters.make.toLowerCase()) return false;
    if (filters.minPrice !== null && vehicle.price < filters.minPrice) return false;
    if (filters.maxPrice !== null && vehicle.price > filters.maxPrice) return false;
    if (filters.minYear !== null && vehicle.year < filters.minYear) return false;
    if (filters.maxYear !== null && vehicle.year > filters.maxYear) return false;
    if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
    if (filters.bodyStyle && vehicle.bodyStyle.toLowerCase() !== filters.bodyStyle.toLowerCase()) {
      return false;
    }
    if (filters.condition && vehicle.condition !== filters.condition) return false;
    if (filters.fuelType && vehicle.fuelType.toLowerCase() !== filters.fuelType.toLowerCase()) {
      return false;
    }
    return true;
  });
}

/** Sorts a copy of the list so callers never mutate shared state. */
export function sortVehicles(vehicles: Vehicle[], sort: SortKey): Vehicle[] {
  const sorted = [...vehicles];
  switch (sort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price || a.year - b.year);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price || b.year - a.year);
      break;
    case "year-desc":
      sorted.sort((a, b) => b.year - a.year || a.price - b.price);
      break;
    case "year-asc":
      sorted.sort((a, b) => a.year - b.year || a.price - b.price);
      break;
    case "featured":
    default:
      sorted.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        if (a.year !== b.year) return b.year - a.year;
        return a.price - b.price;
      });
      break;
  }
  return sorted;
}

/** Filter + sort in one call — the single entry point used by the UI. */
export function applyVehicleFilters(vehicles: Vehicle[], filters: VehicleFilters): Vehicle[] {
  return sortVehicles(filterVehicles(vehicles, filters), filters.sort);
}
