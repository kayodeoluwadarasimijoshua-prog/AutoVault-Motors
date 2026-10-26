// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { VehicleGallery } from "@/components/vehicles/vehicle-gallery";
import { getVehicleBySlug } from "@/data/vehicles";

afterEach(() => {
  cleanup();
});

const camry = getVehicleBySlug("toyota-camry-2021")!;
const gallerySize = camry.images.length;

/** A deliberately single-image listing, to exercise the fallback layout. */
const singleImage = [
  { src: "/images/vehicles/test-single.jpg", alt: "Single photograph of a test vehicle" },
];

describe("VehicleGallery", () => {
  it("shows the first photograph by default", () => {
    render(<VehicleGallery images={camry.images} vehicleName="2021 Toyota Camry" />);
    const main = screen.getAllByRole("img")[0];
    expect(main.getAttribute("src")).toContain("toyota-camry-2021-1.jpg");
  });

  it("switches the main image when a thumbnail is chosen", async () => {
    const user = userEvent.setup();
    render(<VehicleGallery images={camry.images} vehicleName="2021 Toyota Camry" />);

    const thumbnails = screen.getAllByRole("button", {
      name: /photograph \d of \d/i,
    });
    expect(thumbnails).toHaveLength(gallerySize);
    expect(thumbnails[0].getAttribute("aria-pressed")).toBe("true");

    const last = thumbnails[gallerySize - 1];
    await user.click(last);

    expect(last.getAttribute("aria-pressed")).toBe("true");
    expect(thumbnails[0].getAttribute("aria-pressed")).toBe("false");

    // Next serves the optimiser URL (/ _next/image?url=…), so decode before comparing.
    const main = screen.getAllByRole("img")[0];
    const mainSrc = decodeURIComponent(main.getAttribute("src") ?? "");
    expect(mainSrc).toContain(camry.images[gallerySize - 1].src);
    expect(screen.getByRole("status").textContent).toContain(
      `photograph ${gallerySize} of ${gallerySize}`,
    );
  });

  it("cycles with the previous and next controls", async () => {
    const user = userEvent.setup();
    render(<VehicleGallery images={camry.images} vehicleName="2021 Toyota Camry" />);

    await user.click(screen.getByRole("button", { name: /next photograph/i }));
    expect(screen.getAllByRole("img")[0].getAttribute("src")).toContain("toyota-camry-2021-2.jpg");

    await user.click(screen.getByRole("button", { name: /previous photograph/i }));
    expect(screen.getAllByRole("img")[0].getAttribute("src")).toContain("toyota-camry-2021-1.jpg");
  });

  it("wraps from the last photograph to the first", async () => {
    const user = userEvent.setup();
    render(<VehicleGallery images={camry.images} vehicleName="2021 Toyota Camry" />);

    const thumbnails = screen.getAllByRole("button", { name: /photograph \d of/i });
    await user.click(thumbnails[thumbnails.length - 1]);
    await user.click(screen.getByRole("button", { name: /next photograph/i }));

    expect(screen.getAllByRole("img")[0].getAttribute("src")).toContain("toyota-camry-2021-1.jpg");
  });

  it("uses a single-image layout when only one photograph exists", () => {
    render(<VehicleGallery images={singleImage} vehicleName="Test Vehicle" />);

    expect(screen.queryByRole("button", { name: /next photograph/i })).toBeNull();
    expect(screen.queryAllByRole("button", { name: /photograph \d+ of/i })).toHaveLength(0);
    expect(screen.getAllByRole("img")).toHaveLength(1);
  });

  it("degrades gracefully with no photographs", () => {
    render(<VehicleGallery images={[]} vehicleName="Test Vehicle" />);
    expect(screen.getByText(/No photographs are available/i)).toBeDefined();
  });
});
