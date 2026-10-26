import { describe, expect, it } from "vitest";
import {
  formatMileage,
  formatNaira,
  formatNairaCompact,
  formatVehicleName,
  pluralise,
  truncate,
} from "@/lib/formatters";

describe("formatNaira", () => {
  it("groups thousands and prefixes the naira symbol", () => {
    expect(formatNaira(22_500_000)).toBe("₦22,500,000");
    expect(formatNaira(0)).toBe("₦0");
    expect(formatNaira(950)).toBe("₦950");
  });

  it("rounds fractional values", () => {
    expect(formatNaira(1_234_567.6)).toBe("₦1,234,568");
  });

  it("returns a dash for unusable input", () => {
    expect(formatNaira(Number.NaN)).toBe("—");
    expect(formatNaira(Number.POSITIVE_INFINITY)).toBe("—");
  });
});

describe("formatNairaCompact", () => {
  it("compacts millions and keeps smaller values exact", () => {
    expect(formatNairaCompact(15_000_000)).toBe("₦15m");
    expect(formatNairaCompact(7_500_000)).toBe("₦7.5m");
    expect(formatNairaCompact(850_000)).toBe("₦850,000");
  });
});

describe("formatMileage", () => {
  it("adds the km unit and grouping", () => {
    expect(formatMileage(48_000)).toBe("48,000 km");
    expect(formatMileage(0)).toBe("0 km");
  });
});

describe("formatVehicleName", () => {
  it("builds year, make and model", () => {
    expect(formatVehicleName({ year: 2021, make: "Toyota", model: "Camry" })).toBe("2021 Toyota Camry");
  });
});

describe("pluralise", () => {
  it("handles singular and plural counts", () => {
    expect(pluralise(1, "vehicle")).toBe("1 vehicle");
    expect(pluralise(3, "vehicle")).toBe("3 vehicles");
    expect(pluralise(2, "match", "matches")).toBe("2 matches");
  });
});

describe("truncate", () => {
  it("leaves short copy untouched", () => {
    expect(truncate("Short copy", 40)).toBe("Short copy");
  });

  it("cuts on a word boundary and adds an ellipsis", () => {
    const result = truncate("The quick brown fox jumps over the lazy dog repeatedly", 30);
    expect(result.endsWith("…")).toBe(true);
    expect(result.length).toBeLessThanOrEqual(31);
  });
});
