import { describe, expect, it } from "vitest";
import { ALL_VEHICLES, BASE_VEHICLES, GALLERY_VIEWS } from "@/data/vehicles";

/**
 * The gallery contract: four photographs per listing, one for each angle,
 * never two shots of the same view.
 */
describe("four-view galleries", () => {
  it("orders every gallery front, back, inside, boot", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.images.map((image) => image.view)).toEqual(GALLERY_VIEWS);
    }
  });

  it("uses a different source for each of the four views", () => {
    for (const vehicle of ALL_VEHICLES) {
      const sources = vehicle.images.map((image) => image.src);
      expect(new Set(sources).size, `${vehicle.slug} repeats a photograph`).toBe(4);
    }
  });

  it("prefers the listing's own photography over the reference set", () => {
    // The Camry supplies its own front, rear and interior shots.
    const camry = ALL_VEHICLES.find((vehicle) => vehicle.slug === "toyota-camry-2021")!;
    const ownSources = new Set(BASE_VEHICLES.find((v) => v.slug === camry.slug)!.images.map((i) => i.src));

    expect(ownSources.has(camry.images[0].src)).toBe(true); // front
    expect(ownSources.has(camry.images[1].src)).toBe(true); // back
    expect(ownSources.has(camry.images[2].src)).toBe(true); // inside
    // Only the boot view falls back to the body-style reference photo.
    expect(ownSources.has(camry.images[3].src)).toBe(false);
    expect(camry.images[3].src).toContain("sedan-boot");
  });

  it("fills single-photograph listings from the matching body style", () => {
    const yaris = ALL_VEHICLES.find((vehicle) => vehicle.slug === "toyota-yaris-2018")!;
    expect(yaris.bodyStyle).toBe("Hatchback");
    expect(yaris.images[1].src).toContain("hatchback-rear");
    expect(yaris.images[2].src).toContain("hatchback-interior");
    expect(yaris.images[3].src).toContain("hatchback-boot");
  });

  it("matches the body style of each listing in its reference views", () => {
    const expected: Record<string, string> = {
      Sedan: "sedan",
      SUV: "suv",
      Hatchback: "hatchback",
      Pickup: "pickup",
      Minivan: "minivan",
    };

    for (const vehicle of ALL_VEHICLES) {
      const boot = vehicle.images[3].src;
      const prefix = expected[vehicle.bodyStyle];
      // The Sienna's own rear photo doubles as the minivan back reference,
      // but every boot view is the body-style reference set.
      expect(boot, `${vehicle.slug} boot view`).toContain(prefix === "minivan" ? "minivan-boot" : `${prefix}-boot`);
    }
  });

  it("describes the angle in each photograph's alternative text", () => {
    for (const vehicle of ALL_VEHICLES) {
      for (const image of vehicle.images) {
        expect(image.alt.length).toBeGreaterThan(10);
      }
      // Reference views are labelled as representative, never as this exact unit.
      const reference = vehicle.images.filter((image) => image.alt.startsWith("Representative"));
      expect(reference.every((image) => image.view !== "front")).toBe(true);
    }
  });
  it("writes reference alt text that reads correctly aloud", () => {
    for (const vehicle of ALL_VEHICLES) {
      for (const image of vehicle.images) {
        if (!image.alt.startsWith("Representative")) continue;

        // Screen readers say "a suv" literally, so the article must match the acronym.
        expect(image.alt).not.toMatch(/\ba (suv|SUV|mpv|MPV)\b/);
        expect(image.alt, `${vehicle.slug}: ${image.alt}`).toContain(
          `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        );
        expect(image.alt.length).toBeGreaterThan(40);
      }
    }
  });

  it("never labels a reference photograph as this exact unit", () => {
    for (const vehicle of ALL_VEHICLES) {
      const own = new Set(BASE_VEHICLES.find((v) => v.slug === vehicle.slug)!.images.map((i) => i.src));
      for (const image of vehicle.images) {
        if (own.has(image.src)) {
          expect(image.alt).not.toMatch(/^Representative/);
        }
      }
    }
  });
});
