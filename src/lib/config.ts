/**
 * Central site + contact configuration.
 *
 * Everything public and deployment-specific lives here so that components never
 * hardcode a phone number, email address or domain. Values come from public
 * environment variables (see .env.example); nothing here is secret.
 */

/** Public display name of the dealership. */
export const BUSINESS_NAME = "AutoVault Motors";

/** Who built the concept — shown in the footer and on the about page. */
export const STUDIO_NAME = "Growthly";

/**
 * WhatsApp number in international format, digits only (e.g. "2348012345678").
 * Intentionally empty by default: this project must never send enquiries to a
 * number that was not supplied by the dealership. Set
 * NEXT_PUBLIC_WHATSAPP_NUMBER to enable every WhatsApp action on the site.
 */
export const WHATSAPP_NUMBER = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").trim();

/** Optional public contact email. Empty by default (no address is invented). */
export const CONTACT_EMAIL = (process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "").trim();

/**
 * Optional public site URL used for canonical links, sitemap and social images.
 * Empty by default so no unverified domain is ever published. Read through
 * getSiteUrl(), which validates the value before anything uses it.
 */

/** Footer copyright year — update when the concept is next revised. */
export const COPYRIGHT_YEAR = 2026;

/** This build is a portfolio concept, not a trading dealership. */
export const IS_CONCEPT_PROJECT = true;

/** Short, reusable notice about the demonstration inventory. */
export const DEMO_NOTICE =
  "AutoVault Motors is a demonstration dealership concept built by Growthly. Every vehicle, price and specification on this site is sample data for portfolio purposes — not live inventory for sale.";

/** Shorter version for compact placements such as cards and detail pages. */
export const DEMO_NOTICE_SHORT =
  "Sample listing — demonstration data only. Prices are illustrative.";

/**
 * Resolved, validated WhatsApp number (digits only), or null when the contact
 * is not configured correctly. See lib/whatsapp.ts for the validation rules.
 */
export function getConfiguredWhatsAppNumber(): string | null {
  const digits = WHATSAPP_NUMBER.replace(/[^\d]/g, "");
  const trimmed = digits.startsWith("00") ? digits.slice(2) : digits;
  if (trimmed.length < 10 || trimmed.length > 15) return null;
  return trimmed;
}

/** True when a usable WhatsApp number is configured. */
export function isWhatsAppConfigured(): boolean {
  return getConfiguredWhatsAppNumber() !== null;
}

/** True when a contact email is configured. */
export function isEmailConfigured(): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(CONTACT_EMAIL);
}

/** Configured site URL without a trailing slash, or null when unset/invalid. */
export function getSiteUrl(): string | null {
  const configured = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim();
  if (!configured) return null;
  try {
    const url = new URL(configured);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.origin + (url.pathname === "/" ? "" : url.pathname.replace(/\/$/, ""));
  } catch {
    return null;
  }
}

/**
 * Host URL supplied by the hosting platform, when running on one.
 *
 * Vercel and Netlify both expose the current deployment's own hostname, which is
 * the correct base for Open Graph images on a preview URL. Reading it means a
 * deployment without NEXT_PUBLIC_SITE_URL still produces working social cards
 * instead of pointing at localhost.
 */
function getPlatformUrl(): string | null {
  // Checked in order of preference. Empty strings are skipped rather than
  // treated as configured, because CI and host dashboards often set a variable
  // to "" when it does not apply.
  const candidates = [
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
    process.env.DEPLOY_PRIME_URL,
    process.env.URL,
  ];
  const host = candidates.find((value) => value && value.trim().length > 0)?.trim();
  if (!host) return null;
  const trimmed = host.replace(/\/$/, "");
  return /^https?:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
}

/**
 * Base URL used for metadata resolution: the configured site URL, else the
 * hosting platform's deployment URL, else localhost for local development.
 *
 * Canonical tags are still only emitted when NEXT_PUBLIC_SITE_URL is explicitly
 * set, so this fallback never publishes an unverified domain as canonical.
 */
export function getMetadataBase(): URL {
  const url = getSiteUrl() ?? getPlatformUrl();
  try {
    return new URL(url ?? "http://localhost:3000");
  } catch {
    return new URL("http://localhost:3000");
  }
}

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Browse inventory" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;
