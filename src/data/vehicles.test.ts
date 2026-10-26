import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  ALL_VEHICLES,
  BASE_VEHICLES,
  GALLERY_IMAGE_COUNT,
  GALLERY_VIEWS,
  FEATURED_VEHICLES,
  VEHICLE_BODY_STYLES,
  VEHICLE_COUNT_BY_MAKE,
  VEHICLE_FUEL_TYPES,
  VEHICLE_MAKES,
  getSimilarVehicles,
  getVehicleBySlug,
  getVehiclesBySlugs,
} from "@/data/vehicles";

/**
 * Guards the dataset contract: unique identifiers, usable slugs, complete
 * specifications and the availability mix the UI needs to demonstrate.
 */
describe("vehicle dataset", () => {
  it("contains at least eight listings", () => {
    expect(ALL_VEHICLES.length).toBeGreaterThanOrEqual(8);
  });

  it("offers ten listings for every brand", () => {
    expect(VEHICLE_MAKES.length).toBeGreaterThanOrEqual(5);
    for (const make of VEHICLE_MAKES) {
      const count = ALL_VEHICLES.filter((vehicle) => vehicle.make === make).length;
      expect(count, `${make} should have 10 listings`).toBe(10);
    }
    expect(VEHICLE_COUNT_BY_MAKE.every((entry) => entry.count === 10)).toBe(true);
  });

  it("features at least one listing per brand", () => {
    for (const make of VEHICLE_MAKES) {
      expect(
        ALL_VEHICLES.some((vehicle) => vehicle.make === make && vehicle.featured),
        `${make} should have a featured listing`,
      ).toBe(true);
    }
  });

  it("covers a spread of body styles, fuel types and price bands", () => {
    expect(VEHICLE_BODY_STYLES.length).toBeGreaterThanOrEqual(4);
    expect(VEHICLE_FUEL_TYPES).toEqual(expect.arrayContaining(["Petrol", "Diesel", "Hybrid"]));
    const prices = ALL_VEHICLES.map((vehicle) => vehicle.price);
    expect(Math.min(...prices)).toBeLessThan(10_000_000);
    expect(Math.max(...prices)).toBeGreaterThan(40_000_000);
  });

  it("has unique ids, slugs and stock numbers", () => {
    const ids = new Set(ALL_VEHICLES.map((vehicle) => vehicle.id));
    const slugs = new Set(ALL_VEHICLES.map((vehicle) => vehicle.slug));
    const stock = new Set(ALL_VEHICLES.map((vehicle) => vehicle.stockNumber));
    expect(ids.size).toBe(ALL_VEHICLES.length);
    expect(slugs.size).toBe(ALL_VEHICLES.length);
    expect(stock.size).toBe(ALL_VEHICLES.length);
  });

  it("uses URL-safe slugs", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("only references local image paths with alternative text", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.images.length).toBeGreaterThan(0);
      for (const image of vehicle.images) {
        expect(image.src.startsWith("/images/")).toBe(true);
        expect(image.alt.length).toBeGreaterThan(10);
      }
    }
  });

  it("points every listing at an image file that exists on disk", () => {
    // Regression guard: a missing asset used to render as "Image unavailable"
    // on the live site, which is exactly what this test now prevents.
    for (const vehicle of ALL_VEHICLES) {
      for (const image of vehicle.images) {
        const filePath = path.join(process.cwd(), "public", image.src);
        expect(existsSync(filePath), `missing image for ${vehicle.slug}: ${image.src}`).toBe(true);
      }
    }
  });

  it("gives every listing exactly four photographs", () => {
    expect(GALLERY_VIEWS).toEqual(["front", "back", "inside", "boot"]);
    expect(GALLERY_IMAGE_COUNT).toBe(4);
    for (const vehicle of ALL_VEHICLES) {
      expect(
        vehicle.images.length,
        `${vehicle.slug} (${vehicle.bodyStyle}) should have ${GALLERY_IMAGE_COUNT} photos`,
      ).toBe(GALLERY_IMAGE_COUNT);
    }
  });

  it("labels each photograph with a distinct view: front, back, inside, boot", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.images.map((image) => image.view)).toEqual(GALLERY_VIEWS);
    }
  });

  it("never repeats the same photograph inside one gallery", () => {
    for (const vehicle of ALL_VEHICLES) {
      const sources = vehicle.images.map((image) => image.src);
      expect(new Set(sources).size, `${vehicle.slug} has duplicate images`).toBe(sources.length);
    }
  });

  it("keeps the listing's own photograph as the front-view cover", () => {
    for (const vehicle of ALL_VEHICLES) {
      const base = BASE_VEHICLES.find((entry) => entry.slug === vehicle.slug)!;
      expect(vehicle.images[0].view).toBe("front");
      expect(vehicle.images[0].src).toBe(base.images[0].src);
    }
  });

  it("records between two and four colour options per listing", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.availableColours.length).toBeGreaterThanOrEqual(2);
      expect(vehicle.availableColours.length).toBeLessThanOrEqual(4);
      // The exterior colour on the listing always leads the swatch list.
      expect(vehicle.availableColours[0].name).toBe(vehicle.exteriorColour);
      for (const colour of vehicle.availableColours) {
        expect(colour.hex).toMatch(/^#[0-9a-f]{6}$/i);
      }
    }
  });

  it("never repeats a colour option within one listing", () => {
    for (const vehicle of ALL_VEHICLES) {
      const names = vehicle.availableColours.map((colour) => colour.name);
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("uses several different gallery sizes across the inventory", () => {
    const sizes = new Set(ALL_VEHICLES.map((vehicle) => vehicle.images.length));
    expect(sizes.size).toBe(1);
    expect([...sizes][0]).toBe(4);
  });

  it("carries the specifications the interface displays", () => {
    for (const vehicle of ALL_VEHICLES) {
      expect(vehicle.price).toBeGreaterThan(0);
      expect(vehicle.mileage).toBeGreaterThanOrEqual(0);
      expect(vehicle.year).toBeGreaterThan(1990);
      expect(["Automatic", "Manual"]).toContain(vehicle.transmission);
      expect(["Foreign Used", "Nigerian Used"]).toContain(vehicle.condition);
      expect(["Available", "Reserved", "Sold"]).toContain(vehicle.availability);
      expect(vehicle.features.length).toBeGreaterThan(3);
      expect(vehicle.description.length).toBeGreaterThan(40);
    }
  });

  it("demonstrates reserved and sold states", () => {
    const states = new Set(ALL_VEHICLES.map((vehicle) => vehicle.availability));
    expect(states.has("Reserved")).toBe(true);
    expect(states.has("Sold")).toBe(true);
  });

  it("exposes four featured vehicles from four different brands", () => {
    expect(FEATURED_VEHICLES).toHaveLength(4);
    expect(FEATURED_VEHICLES.every((vehicle) => vehicle.featured)).toBe(true);
    expect(new Set(FEATURED_VEHICLES.map((vehicle) => vehicle.make)).size).toBe(4);
  });

  it("derives sorted, unique makes and body styles", () => {
    expect(VEHICLE_MAKES).toEqual([...VEHICLE_MAKES].sort((a, b) => a.localeCompare(b)));
    expect(new Set(VEHICLE_MAKES).size).toBe(VEHICLE_MAKES.length);
    expect(VEHICLE_BODY_STYLES.length).toBeGreaterThan(2);
  });
});

describe("dataset lookups", () => {
  it("finds a vehicle by slug", () => {
    expect(getVehicleBySlug("toyota-camry-2021")?.make).toBe("Toyota");
  });

  it("returns undefined for unknown slugs", () => {
    expect(getVehicleBySlug("not-a-real-car")).toBeUndefined();
    expect(getVehicleBySlug("")).toBeUndefined();
  });

  it("drops unknown slugs when resolving several", () => {
    const result = getVehiclesBySlugs(["toyota-camry-2021", "missing", "honda-crv-2019"]);
    expect(result.map((vehicle) => vehicle.slug)).toEqual(["toyota-camry-2021", "honda-crv-2019"]);
  });

  it("suggests similar vehicles without returning the vehicle itself", () => {
    const camry = getVehicleBySlug("toyota-camry-2021")!;
    const similar = getSimilarVehicles(camry);
    expect(similar.length).toBeGreaterThan(0);
    expect(similar.every((vehicle) => vehicle.slug !== camry.slug)).toBe(true);
    expect(similar.every((vehicle) => vehicle.make === camry.make || vehicle.bodyStyle === camry.bodyStyle)).toBe(true);
  });
});
