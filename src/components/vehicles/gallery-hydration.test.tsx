// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "react";
import { renderToString } from "react-dom/server";
import { hydrateRoot } from "react-dom/client";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { getVehicleBySlug } from "@/data/vehicles";

/**
 * The gallery is the one component on a vehicle page that holds client state,
 * so it is the one place where server markup and the first client render could
 * disagree. This test renders its real server output, then hydrates that exact
 * HTML and fails on any mismatch or recovery warning.
 */
const camry = getVehicleBySlug("toyota-camry-2021")!;

afterEach(() => {
  document.body.innerHTML = "";
  vi.restoreAllMocks();
});

describe("VehicleGallery hydration", () => {
  it("hydrates its server-rendered markup without mismatches", async () => {
    const element = <VehicleGallery images={camry.images} vehicleName="2021 Toyota Camry" />;
    // renderToString keeps React's text-boundary comments, so hydration compares like for like.
    const html = renderToString(element);

    // Server markup must already carry the selected view and all four thumbnails.
    expect(html).toContain("Front view");
    expect(html).toContain('aria-pressed="true"');
    expect(html.match(/view — photograph/g)?.length).toBe(4);

    const container = document.createElement("div");
    document.body.appendChild(container);
    container.innerHTML = html;

    const recovered: string[] = [];
    let root: ReturnType<typeof hydrateRoot> | undefined;
    await act(async () => {
      root = hydrateRoot(container, element, {
        onRecoverableError: (error) => recovered.push(String(error)),
      });
    });

    expect(recovered).toEqual([]);

    // The control is interactive after hydration, not just visually present.
    const next = container.querySelector<HTMLButtonElement>('[aria-label="Show next photograph"]');
    expect(next).not.toBeNull();
    await act(async () => {
      next!.click();
    });
    expect(container.textContent).toContain("Back view");

    await act(async () => {
      root?.unmount();
    });
  });
});
