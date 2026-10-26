import { describe, expect, it } from "vitest";
import {
  MAX_COMPARISON_ITEMS,
  parseStoredComparison,
  sanitiseComparisonSlugs,
  toggleComparisonSlug,
} from "@/lib/comparison";

describe("sanitiseComparisonSlugs", () => {
  it("keeps only unique, non-empty strings", () => {
    expect(sanitiseComparisonSlugs(["a", "a", "", "  ", "b", 42, null])).toEqual(["a", "b"]);
  });

  it("caps the list at three vehicles", () => {
    expect(sanitiseComparisonSlugs(["a", "b", "c", "d"])).toHaveLength(MAX_COMPARISON_ITEMS);
  });

  it("returns an empty array for non-array input", () => {
    expect(sanitiseComparisonSlugs("not-an-array")).toEqual([]);
    expect(sanitiseComparisonSlugs(null)).toEqual([]);
  });
});

describe("toggleComparisonSlug", () => {
  it("adds a vehicle", () => {
    const result = toggleComparisonSlug([], "camry");
    expect(result).toMatchObject({ slugs: ["camry"], added: true, limitReached: false });
  });

  it("removes a vehicle that is already selected", () => {
    const result = toggleComparisonSlug(["camry", "rav4"], "camry");
    expect(result).toMatchObject({ slugs: ["rav4"], added: false, limitReached: false });
  });

  it("refuses a fourth vehicle and reports the limit", () => {
    const result = toggleComparisonSlug(["a", "b", "c"], "d");
    expect(result.slugs).toEqual(["a", "b", "c"]);
    expect(result.added).toBe(false);
    expect(result.limitReached).toBe(true);
  });
});

describe("parseStoredComparison", () => {
  it("reads valid JSON", () => {
    expect(parseStoredComparison('["camry","rav4"]')).toEqual(["camry", "rav4"]);
  });

  it("survives corrupt or missing storage values", () => {
    expect(parseStoredComparison("{not json")).toEqual([]);
    expect(parseStoredComparison(null)).toEqual([]);
    expect(parseStoredComparison('{"slug":"camry"}')).toEqual([]);
  });
});
