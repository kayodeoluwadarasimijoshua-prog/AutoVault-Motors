import { describe, expect, it } from "vitest";
import { ALL_VEHICLES } from "@/data/vehicles";
import {
  DEFAULT_FILTERS,
  applyVehicleFilters,
  countActiveFilters,
  filterVehicles,
  filtersToQueryString,
  matchesSearch,
  parseVehicleFilters,
  sortVehicles,
} from "@/lib/vehicle-filters";

const filters = (overrides: Partial<typeof DEFAULT_FILTERS> = {}) => ({
  ...DEFAULT_FILTERS,
  ...overrides,
});

describe("parseVehicleFilters", () => {
  it("returns defaults for an empty query", () => {
    expect(parseVehicleFilters({})).toEqual(DEFAULT_FILTERS);
  });

  it("reads every supported parameter", () => {
    const result = parseVehicleFilters({
      q: "camry",
      make: "Toyota",
      minPrice: "10000000",
      maxPrice: "20000000",
      minYear: "2018",
      maxYear: "2021",
      transmission: "Automatic",
      bodyStyle: "Sedan",
      condition: "Foreign Used",
      fuelType: "Petrol",
      sort: "price-asc",
    });

    expect(result).toMatchObject({
      query: "camry",
      make: "Toyota",
      minPrice: 10_000_000,
      maxPrice: 20_000_000,
      minYear: 2018,
      maxYear: 2021,
      transmission: "Automatic",
      bodyStyle: "Sedan",
      condition: "Foreign Used",
      fuelType: "Petrol",
      sort: "price-asc",
    });
  });

  it("ignores invalid numbers, unknown values and array noise", () => {
    const result = parseVehicleFilters({
      maxPrice: "not-a-number",
      minYear: "1200",
      transmission: "CVT",
      condition: "Brand New",
      sort: "cheapest",
      make: ["Honda", "Toyota"],
    });

    expect(result.maxPrice).toBeNull();
    expect(result.minYear).toBeNull();
    expect(result.transmission).toBe("");
    expect(result.condition).toBe("");
    expect(result.sort).toBe("featured");
    expect(result.make).toBe("Honda");
  });

  it("corrects reversed price and year ranges", () => {
    const result = parseVehicleFilters({
      minPrice: "30000000",
      maxPrice: "10000000",
      minYear: "2022",
      maxYear: "2016",
    });

    expect(result.minPrice).toBe(10_000_000);
    expect(result.maxPrice).toBe(30_000_000);
    expect(result.minYear).toBe(2016);
    expect(result.maxYear).toBe(2022);
  });

  it("accepts huge prices only within bounds", () => {
    expect(parseVehicleFilters({ maxPrice: "999999999999" }).maxPrice).toBeNull();
  });
});

describe("filtersToQueryString", () => {
  it("returns an empty string when nothing is set", () => {
    expect(filtersToQueryString(DEFAULT_FILTERS)).toBe("");
  });

  it("omits default sort but keeps real filters", () => {
    const query = filtersToQueryString(
      filters({ make: "Toyota", maxPrice: 15_000_000, sort: "featured" }),
    );
    expect(query).toBe("?make=Toyota&maxPrice=15000000");
  });

  it("round-trips through the parser", () => {
    const original = filters({
      query: "rav4",
      make: "Toyota",
      minYear: 2018,
      transmission: "Automatic",
      bodyStyle: "SUV",
      sort: "price-desc",
    });
    const query = filtersToQueryString(original).replace(/^\?/, "");
    const params = Object.fromEntries(new URLSearchParams(query));
    expect(parseVehicleFilters(params)).toEqual(original);
  });
});

describe("matchesSearch", () => {
  const camry = ALL_VEHICLES.find((vehicle) => vehicle.slug === "toyota-camry-2021")!;

  it("matches make, model and description case-insensitively", () => {
    expect(matchesSearch(camry, "camry")).toBe(true);
    expect(matchesSearch(camry, "CAMRY")).toBe(true);
    expect(matchesSearch(camry, "toyota camry")).toBe(true);
    expect(matchesSearch(camry, "leather")).toBe(true);
  });

  it("requires every token to match", () => {
    expect(matchesSearch(camry, "toyota lexus")).toBe(false);
  });

  it("treats an empty query as a match", () => {
    expect(matchesSearch(camry, "   ")).toBe(true);
  });
});

describe("filterVehicles", () => {
  it("returns the full dataset when no filters are active", () => {
    expect(filterVehicles(ALL_VEHICLES, DEFAULT_FILTERS)).toHaveLength(ALL_VEHICLES.length);
  });

  it("combines make, price and transmission", () => {
    const results = filterVehicles(
      ALL_VEHICLES,
      filters({ make: "Toyota", maxPrice: 25_000_000, transmission: "Automatic" }),
    );

    expect(results.length).toBeGreaterThan(0);
    for (const vehicle of results) {
      expect(vehicle.make).toBe("Toyota");
      expect(vehicle.price).toBeLessThanOrEqual(25_000_000);
      expect(vehicle.transmission).toBe("Automatic");
    }
  });

  it("respects inclusive price and year boundaries", () => {
    const camry = ALL_VEHICLES.find((vehicle) => vehicle.slug === "toyota-camry-2021")!;
    const results = filterVehicles(
      ALL_VEHICLES,
      filters({ minPrice: camry.price, maxPrice: camry.price, minYear: camry.year, maxYear: camry.year }),
    );
    expect(results.map((vehicle) => vehicle.slug)).toContain(camry.slug);
  });

  it("filters by fuel type, case-insensitively", () => {
    const hybrids = filterVehicles(ALL_VEHICLES, filters({ fuelType: "hybrid" }));
    expect(hybrids.length).toBeGreaterThan(0);
    expect(hybrids.every((vehicle) => vehicle.fuelType === "Hybrid")).toBe(true);
  });

  it("combines a brand filter with fuel type and price", () => {
    const results = filterVehicles(
      ALL_VEHICLES,
      filters({ make: "Mercedes-Benz", fuelType: "Diesel", maxPrice: 25_000_000 }),
    );
    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every((v) => v.make === "Mercedes-Benz" && v.fuelType === "Diesel" && v.price <= 25_000_000),
    ).toBe(true);
  });

  it("filters by body style and condition together", () => {
    const results = filterVehicles(
      ALL_VEHICLES,
      filters({ bodyStyle: "SUV", condition: "Nigerian Used" }),
    );
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((v) => v.bodyStyle === "SUV" && v.condition === "Nigerian Used")).toBe(true);
  });

  it("can return an empty list for impossible combinations", () => {
    const results = filterVehicles(
      ALL_VEHICLES,
      filters({ make: "Lexus", maxPrice: 1_000_000 }),
    );
    expect(results).toEqual([]);
  });
});

describe("sortVehicles", () => {
  it("does not mutate the input array", () => {
    const input = [...ALL_VEHICLES];
    sortVehicles(input, "price-asc");
    expect(input).toEqual(ALL_VEHICLES);
  });

  it("sorts by price ascending and descending", () => {
    const ascending = sortVehicles(ALL_VEHICLES, "price-asc").map((v) => v.price);
    const descending = sortVehicles(ALL_VEHICLES, "price-desc").map((v) => v.price);
    expect(ascending).toEqual([...ascending].sort((a, b) => a - b));
    expect(descending).toEqual([...descending].sort((a, b) => b - a));
  });

  it("sorts by model year in both directions", () => {
    const newest = sortVehicles(ALL_VEHICLES, "year-desc").map((v) => v.year);
    const oldest = sortVehicles(ALL_VEHICLES, "year-asc").map((v) => v.year);
    expect(newest).toEqual([...newest].sort((a, b) => b - a));
    expect(oldest).toEqual([...oldest].sort((a, b) => a - b));
  });

  it("puts featured vehicles first by default", () => {
    const sorted = sortVehicles(ALL_VEHICLES, "featured");
    const firstUnfeatured = sorted.findIndex((vehicle) => !vehicle.featured);
    expect(firstUnfeatured).toBeGreaterThan(0);
    expect(sorted.slice(firstUnfeatured).every((vehicle) => !vehicle.featured)).toBe(true);
  });
});

describe("applyVehicleFilters", () => {
  it("filters and sorts in one pass", () => {
    const results = applyVehicleFilters(ALL_VEHICLES, filters({ make: "Toyota", sort: "price-asc" }));
    expect(results.length).toBeGreaterThan(1);
    expect(results.every((vehicle) => vehicle.make === "Toyota")).toBe(true);
    for (let index = 1; index < results.length; index += 1) {
      expect(results[index].price).toBeGreaterThanOrEqual(results[index - 1].price);
    }
  });
});

describe("countActiveFilters", () => {
  it("counts filters but not sort order", () => {
    expect(countActiveFilters(DEFAULT_FILTERS)).toBe(0);
    expect(countActiveFilters(filters({ sort: "price-asc" }))).toBe(0);
    expect(countActiveFilters(filters({ make: "Toyota", maxPrice: 1, query: " x " }))).toBe(3);
  });
});
