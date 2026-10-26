// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComparisonProvider } from "@/components/vehicles/comparison-provider";
import { InventoryBrowser } from "@/components/vehicles/inventory-browser";
import { ALL_VEHICLES } from "@/data/vehicles";
import { DEFAULT_FILTERS, applyVehicleFilters } from "@/lib/vehicle-filters";

vi.mock("next/navigation", () => ({
  usePathname: () => "/inventory",
}));

function renderInventory(overrides: Partial<typeof DEFAULT_FILTERS> = {}) {
  const filters = { ...DEFAULT_FILTERS, ...overrides };
  return render(
    <ComparisonProvider>
      <InventoryBrowser vehicles={ALL_VEHICLES} initialFilters={filters} initialQuery="" />
    </ComparisonProvider>,
  );
}

function visibleCards() {
  return screen.queryAllByRole("article");
}

/** Expected result count for a filter state, derived from the dataset itself. */
function expectedCount(overrides: Partial<typeof DEFAULT_FILTERS> = {}) {
  return applyVehicleFilters(ALL_VEHICLES, { ...DEFAULT_FILTERS, ...overrides }).length;
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("InventoryBrowser", () => {
  it("renders the full dataset by default", () => {
    renderInventory();
    expect(visibleCards()).toHaveLength(ALL_VEHICLES.length);
    expect(screen.getByText(/Showing/)).toBeDefined();
  });

  it("filters as the visitor types and reports no matches", async () => {
    const user = userEvent.setup();
    renderInventory();

    const search = screen.getByRole("searchbox", { name: /search vehicles/i });
    await user.type(search, "camry");

    // "camry" also appears in the description of a Hyundai Sonata listing,
    // which is intentional: search covers descriptions as well as names.
    expect(visibleCards()).toHaveLength(expectedCount({ query: "camry" }));
    expect(screen.getAllByText("2021 Toyota Camry").length).toBeGreaterThan(0);

    await user.clear(search);
    await user.type(search, "aeroplane");

    expect(visibleCards()).toHaveLength(0);
    expect(screen.getByText(/No vehicles match these filters/i)).toBeDefined();
  });

  it("combines make, price and transmission filters", async () => {
    const user = userEvent.setup();
    renderInventory();

    await user.selectOptions(screen.getByLabelText("Make"), "Toyota");
    await user.selectOptions(screen.getByLabelText("Transmission"), "Automatic");
    await user.selectOptions(screen.getByLabelText("Max price"), "25000000");

    const cards = visibleCards();
    expect(cards.length).toBeGreaterThan(0);

    const titles = cards.map((card) => card.querySelector("h3")?.textContent ?? "");
    expect(titles.every((title) => title.includes("Toyota"))).toBe(true);
    expect(titles).toContain("2021 Toyota Camry");
    expect(titles).not.toContain("2018 Hyundai Tucson");
  });

  it("shows an empty state with a working reset action", async () => {
    const user = userEvent.setup();
    renderInventory();

    await user.selectOptions(screen.getByLabelText("Make"), "Lexus");
    await user.selectOptions(screen.getByLabelText("Max price"), "10000000");
    expect(visibleCards()).toHaveLength(0);

    await user.click(screen.getByRole("button", { name: /Reset all filters/i }));
    expect(visibleCards()).toHaveLength(ALL_VEHICLES.length);
  });

  it("sorts by price from low to high", async () => {
    const user = userEvent.setup();
    renderInventory();

    await user.selectOptions(screen.getByLabelText("Sort by"), "price-asc");

    const prices = visibleCards().map((card) => {
      const text = card.querySelector("span.tabular-nums")?.textContent ?? "";
      return Number(text.replace(/[^0-9]/g, ""));
    });

    expect(prices.length).toBeGreaterThan(5);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("reflects the active filters in the address bar", async () => {
    const user = userEvent.setup();
    renderInventory();

    await user.selectOptions(screen.getByLabelText("Make"), "Honda");
    // The URL write is debounced by 200ms.
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(window.location.search).toContain("make=Honda");

    await user.selectOptions(screen.getByLabelText("Condition"), "Nigerian Used");
    await new Promise((resolve) => setTimeout(resolve, 300));

    expect(window.location.search).toContain("make=Honda");
    expect(window.location.search).toContain("condition=Nigerian+Used");
  });

  it("adds vehicles to the comparison tray", async () => {
    const user = userEvent.setup();
    renderInventory();

    const addButtons = screen.getAllByRole("button", { name: /Add .* to comparison/i });
    await user.click(addButtons[0]);

    // The card toggle and the sticky tray both expose a remove action.
    expect(screen.getAllByRole("button", { name: /Remove .* from comparison/i }).length).toBeGreaterThan(0);
    expect(screen.getByText(/Compare 1\/3/i)).toBeDefined();
    expect(window.localStorage.getItem("autovault:comparison:v1")).toContain("toyota-camry-2021");
  });

  it("keeps the mobile filter panel hidden until requested", async () => {
    const user = userEvent.setup();
    renderInventory();

    expect(screen.queryByRole("heading", { name: "Filters", level: 2 })).toBeDefined();
    const toggle = screen.getByRole("button", { name: /Filters/i });
    expect(toggle.getAttribute("aria-expanded")).toBe("false");

    await user.click(toggle);
    expect(toggle.getAttribute("aria-expanded")).toBe("true");

    // The mobile panel exposes a second, prefixed set of controls.
    expect(document.querySelector("#mobile-make")).not.toBeNull();
    expect(screen.getAllByLabelText("Make").length).toBe(2);
  });

  it("renders filter chips that remove a single filter", async () => {
    const user = userEvent.setup();
    const initial = { make: "Lexus", maxPrice: 40_000_000 };
    renderInventory(initial);

    const chip = screen.getByRole("button", { name: "Remove Lexus filter" });
    const withMake = expectedCount(initial);
    expect(visibleCards()).toHaveLength(withMake);

    await user.click(chip);
    expect(visibleCards()).toHaveLength(expectedCount({ maxPrice: initial.maxPrice }));
    expect(visibleCards().length).toBeGreaterThan(withMake);
  });

  it("filters the inventory down to one brand from the brand index", async () => {
    const user = userEvent.setup();
    renderInventory();

    await user.click(screen.getByRole("button", { name: /^Hyundai\s*10$/ }));

    expect(visibleCards()).toHaveLength(expectedCount({ make: "Hyundai" }));
    const titles = visibleCards().map((card) => card.querySelector("h3")?.textContent ?? "");
    expect(titles.every((title) => title.includes("Hyundai"))).toBe(true);
  });
});
