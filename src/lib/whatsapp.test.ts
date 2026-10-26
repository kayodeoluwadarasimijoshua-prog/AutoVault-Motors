import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Vehicle } from "@/types/vehicle";

const baseVehicle: Vehicle = {
  id: "av-test",
  slug: "toyota-camry-2021",
  make: "Toyota",
  model: "Camry",
  year: 2021,
  price: 22_500_000,
  mileage: 48_000,
  transmission: "Automatic",
  fuelType: "Petrol",
  bodyStyle: "Sedan",
  condition: "Foreign Used",
  engineCapacity: "2.5L",
  exteriorColour: "Silver",
  availableColours: [{ name: "Silver", hex: "#c9cdcf" }],
  description: "Test listing.",
  features: [],
  images: [],
  featured: false,
  availability: "Available",
  stockNumber: "AV-1001",
};

/**
 * The WhatsApp helpers read process.env through lib/config, which is evaluated
 * once at import time. Each case re-imports the modules with a stubbed
 * environment so the configuration branches are genuinely exercised.
 */
async function loadWhatsAppModule(env: Record<string, string | undefined>) {
  vi.resetModules();
  vi.stubEnv("NEXT_PUBLIC_WHATSAPP_NUMBER", env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "");
  return import("@/lib/whatsapp");
}

describe("WhatsApp helpers with no configured number", () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("reports the contact as unconfigured", async () => {
    const whatsapp = await loadWhatsAppModule({});
    expect(whatsapp.isWhatsAppConfigured()).toBe(false);
    expect(whatsapp.getWhatsAppNumber()).toBeNull();
  });

  it("returns null instead of a fabricated link", async () => {
    const whatsapp = await loadWhatsAppModule({});
    expect(whatsapp.buildWhatsAppUrl("Hello")).toBeNull();
    expect(whatsapp.buildWhatsAppUrl()).toBeNull();
  });
});

describe("WhatsApp helpers with a configured number", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("builds a general link with no message", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    expect(whatsapp.buildWhatsAppUrl()).toBe("https://wa.me/2348012345678");
  });

  it("encodes the message for a vehicle-specific enquiry", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    const message = whatsapp.buildVehicleEnquiryMessage(baseVehicle);
    const url = whatsapp.buildWhatsAppUrl(message);

    expect(message).toContain("2021 Toyota Camry");
    expect(message).toContain("AV-1001");
    expect(url).not.toBeNull();

    const parsed = new URL(url!);
    expect(parsed.origin + parsed.pathname).toBe("https://wa.me/2348012345678");
    expect(parsed.searchParams.get("text")).toBe(message);
    expect(url).not.toContain(" ");
    expect(url).not.toContain("\n");
  });

  it("normalises spaces, plus signs and punctuation in the number", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "+234 801-234-5678" });
    expect(whatsapp.getWhatsAppNumber()).toBe("2348012345678");
  });

  it("strips the international 00 prefix", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "002348012345678" });
    expect(whatsapp.getWhatsAppNumber()).toBe("2348012345678");
  });

  it("rejects numbers that are too short or too long", async () => {
    const short = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "12345" });
    expect(short.getWhatsAppNumber()).toBeNull();

    const long = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "1234567890123456" });
    expect(long.getWhatsAppNumber()).toBeNull();
  });
});

describe("enquiry copy by availability", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("asks for details when the vehicle is available", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    const message = whatsapp.buildVehicleEnquiryMessage(baseVehicle);
    expect(message).toBe(
      "Hello AutoVault Motors, I am interested in the 2021 Toyota Camry (ref. AV-1001). Could you please provide more information about this vehicle?",
    );
  });

  it("does not imply a reserved vehicle is buyable now", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    const message = whatsapp.buildVehicleEnquiryMessage({ ...baseVehicle, availability: "Reserved" });
    expect(message).toContain("reserved");
    expect(message).not.toContain("I am interested in");
  });

  it("offers similar vehicles when the listing is sold", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    const message = whatsapp.buildVehicleEnquiryMessage({ ...baseVehicle, availability: "Sold" });
    expect(message).toContain("marked as sold");
    expect(message).toContain("similar vehicles");
  });

  it("uses a general message for non-vehicle enquiries", async () => {
    const whatsapp = await loadWhatsAppModule({ NEXT_PUBLIC_WHATSAPP_NUMBER: "2348012345678" });
    expect(whatsapp.buildGeneralEnquiryMessage("contact")).toContain("speak with someone");
    expect(whatsapp.buildGeneralEnquiryMessage()).toContain("enquiry about a vehicle");
  });
});
