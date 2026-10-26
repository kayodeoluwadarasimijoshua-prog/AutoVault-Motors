/**
 * Vehicle comparison helpers.
 *
 * Kept free of React so the selection rules (maximum three, de-duplicated,
 * deterministic order) can be unit tested and reused by the localStorage
 * provider.
 */

export const MAX_COMPARISON_ITEMS = 3;

/** Removes duplicates and enforces the three-vehicle limit, keeping order. */
export function sanitiseComparisonSlugs(input: unknown): string[] {
  if (!Array.isArray(input)) return [];
  const seen = new Set<string>();
  const result: string[] = [];
  for (const value of input) {
    if (typeof value !== "string") continue;
    const slug = value.trim();
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    result.push(slug);
    if (result.length === MAX_COMPARISON_ITEMS) break;
  }
  return result;
}

/**
 * Adds a vehicle to the comparison list, or removes it when already present.
 * Returns the new list and whether the change was accepted.
 */
export function toggleComparisonSlug(
  slugs: string[],
  slug: string,
): { slugs: string[]; added: boolean; limitReached: boolean } {
  const current = sanitiseComparisonSlugs(slugs);
  if (current.includes(slug)) {
    return { slugs: current.filter((item) => item !== slug), added: false, limitReached: false };
  }
  if (current.length >= MAX_COMPARISON_ITEMS) {
    return { slugs: current, added: false, limitReached: true };
  }
  return { slugs: [...current, slug], added: true, limitReached: false };
}

/** Safely parses persisted comparison data (localStorage may hold anything). */
export function parseStoredComparison(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    return sanitiseComparisonSlugs(parsed);
  } catch {
    return [];
  }
}
