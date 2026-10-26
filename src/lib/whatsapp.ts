/**
 * WhatsApp link helpers.
 *
 * The number is never hardcoded in a component: it is read once from the public
 * configuration in lib/config.ts. When it is missing or invalid every helper
 * returns null so callers can disable the action and explain why.
 */

import { getConfiguredWhatsAppNumber } from "@/lib/config";
import { formatVehicleName } from "@/lib/formatters";
import type { Vehicle } from "@/types/vehicle";

const WHATSAPP_BASE_URL = "https://wa.me";

/**
 * Normalises a phone number to the digits-only international format WhatsApp
 * expects. Returns null for anything that cannot be a usable WhatsApp number.
 */
export function normaliseWhatsAppNumber(raw: string): string | null {
  const withoutPrefix = raw.trim().replace(/^\+/, "");
  const digits = withoutPrefix.replace(/[^\d]/g, "");
  // Accept "00" international dialling prefix.
  const normalised = digits.startsWith("00") ? digits.slice(2) : digits;
  if (normalised.length < 10 || normalised.length > 15) return null;
  return normalised;
}

/** The configured WhatsApp number, or null when it is not usable. */
export function getWhatsAppNumber(): string | null {
  return getConfiguredWhatsAppNumber();
}

/** True when WhatsApp actions can be enabled. */
export function isWhatsAppConfigured(): boolean {
  return getWhatsAppNumber() !== null;
}

/**
 * Builds a wa.me link with an optional, correctly encoded message.
 * Returns null when no valid number is configured.
 */
export function buildWhatsAppUrl(message?: string): string | null {
  const number = getWhatsAppNumber();
  if (!number) return null;

  const trimmed = message?.trim();
  if (!trimmed) return `${WHATSAPP_BASE_URL}/${number}`;

  const params = new URLSearchParams({ text: trimmed });
  return `${WHATSAPP_BASE_URL}/${number}?${params.toString()}`;
}

/** General enquiry copy shared by header, footer and contact page. */
export function buildGeneralEnquiryMessage(
  context?: "header" | "contact" | "inventory" | "footer",
): string {
  switch (context) {
    case "contact":
      return "Hello AutoVault Motors, I would like to speak with someone about a vehicle enquiry.";
    case "inventory":
      return "Hello AutoVault Motors, I am browsing your vehicle list and would like help choosing a car.";
    case "footer":
      return "Hello AutoVault Motors, I would like more information about your vehicle list.";
    default:
      return "Hello AutoVault Motors, I would like to make an enquiry about a vehicle.";
  }
}

/**
 * Vehicle-specific enquiry, adjusted for availability so the message never
 * implies that a reserved or sold vehicle can be bought immediately.
 */
export function buildVehicleEnquiryMessage(vehicle: Vehicle): string {
  const name = formatVehicleName(vehicle);
  const reference = `ref. ${vehicle.stockNumber}`;

  if (vehicle.availability === "Reserved") {
    return `Hello AutoVault Motors, I understand the ${name} (${reference}) is currently reserved. Could you let me know if it becomes available again, or suggest a similar vehicle?`;
  }

  if (vehicle.availability === "Sold") {
    return `Hello AutoVault Motors, I can see the ${name} (${reference}) is marked as sold. Could you let me know about similar vehicles in your list?`;
  }

  return `Hello AutoVault Motors, I am interested in the ${name} (${reference}). Could you please provide more information about this vehicle?`;
}
