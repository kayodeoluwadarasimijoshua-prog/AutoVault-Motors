// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComparisonProvider } from "@/components/vehicles/comparison-provider";
import { ComparisonView } from "@/components/vehicles/comparison-view";
import { CompareToggle } from "@/components/vehicles/compare-toggle";
import { getVehicleBySlug } from "@/data/vehicles";

// Tests only need the rendered <img>; Next's optimiser does not run in jsdom.
vi.mock("next/image", () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt, src }: { alt: string; src: string }) => <img alt={alt} src={src} />,
}));

const vehicles = [
  getVehicleBySlug("toyota-camry-2021")!,
  getVehicleBySlug("toyota-rav4-2020")!,
  getVehicleBySlug("lexus-rx-350-2018")!,
  getVehicleBySlug("honda-accord-2017")!,
];

function Toggles() {
  return (
    <div>
      {vehicles.map((vehicle) => (
        <CompareToggle key={vehicle.slug} vehicle={vehicle} variant="inline" />
      ))}
      <ComparisonView />
    </div>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  cleanup();
});

describe("comparison flow", () => {
  it("starts with an empty comparison", () => {
    render(
      <ComparisonProvider>
        <ComparisonView />
      </ComparisonProvider>,
    );
    expect(screen.getByText(/No vehicles selected yet/i)).toBeDefined();
  });

  it("adds vehicles and shows them in the comparison table", async () => {
    const user = userEvent.setup();
    render(
      <ComparisonProvider>
        <Toggles />
      </ComparisonProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);
    await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);

    expect(screen.getByRole("table")).toBeDefined();
    expect(screen.getAllByRole("rowheader").length).toBeGreaterThan(0);
    expect(screen.getByText(/2 vehicles selected/i)).toBeDefined();
  });

  it("never allows more than three vehicles", async () => {
    const user = userEvent.setup();
    render(
      <ComparisonProvider>
        <Toggles />
      </ComparisonProvider>,
    );

    for (let index = 0; index < 3; index += 1) {
      await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);
    }

    expect(screen.getByText(/3 vehicles selected/i)).toBeDefined();

    // The fourth vehicle is still listed but its toggle reports the limit.
    const lastAdd = screen.queryByRole("button", { name: /Add 2017 Honda Accord to comparison/i });
    if (lastAdd) {
      await user.click(lastAdd);
      expect(screen.getByText(/up to 3 vehicles/i)).toBeDefined();
    }
    expect(screen.getByText(/3 vehicles selected/i)).toBeDefined();
  });

  it("removes a vehicle from the comparison", async () => {
    const user = userEvent.setup();
    render(
      <ComparisonProvider>
        <Toggles />
      </ComparisonProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);
    await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);

    await user.click(screen.getAllByRole("button", { name: /Remove .* from comparison/i })[0]);
    expect(screen.getByText(/1 vehicle selected/i)).toBeDefined();
  });

  it("clears the whole comparison", async () => {
    const user = userEvent.setup();
    render(
      <ComparisonProvider>
        <Toggles />
      </ComparisonProvider>,
    );

    await user.click(screen.getAllByRole("button", { name: /Add .* to comparison/i })[0]);
    await user.click(screen.getByRole("button", { name: /Clear comparison/i }));

    expect(screen.getByText(/No vehicles selected yet/i)).toBeDefined();
  });

  it("restores a saved comparison from localStorage", () => {
    window.localStorage.setItem("autovault:comparison:v1", JSON.stringify(["toyota-camry-2021"]));

    render(
      <ComparisonProvider>
        <ComparisonView />
      </ComparisonProvider>,
    );

    expect(screen.getByText(/1 vehicle selected/i)).toBeDefined();
  });

  it("survives corrupt localStorage data", () => {
    window.localStorage.setItem("autovault:comparison:v1", "{broken");

    render(
      <ComparisonProvider>
        <ComparisonView />
      </ComparisonProvider>,
    );

    expect(screen.getByText(/No vehicles selected yet/i)).toBeDefined();
  });
});
