/**
 * Metadata helpers.
 *
 * Canonical URLs are only emitted when NEXT_PUBLIC_SITE_URL is configured, so
 * the project never publishes an unverified production domain.
 */

import type { Metadata } from "next";
import { BUSINESS_NAME, getSiteUrl } from "@/lib/config";

export const OG_IMAGE = {
  url: "/images/og-autovault.jpg",
  width: 1200,
  height: 630,
  alt: "AutoVault Motors — automotive showroom concept",
};

interface PageMetadataOptions {
  /** Page title without the brand suffix. */
  title: string;
  description: string;
  /** Route path, e.g. "/inventory". Used for canonical and og:url. */
  path: string;
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
  /** Set for pages that should not append the brand suffix to the title. */
  absoluteTitle?: string;
  noIndex?: boolean;
}

export function createPageMetadata({
  title,
  description,
  path,
  image = OG_IMAGE,
  type = "website",
  absoluteTitle,
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const siteUrl = getSiteUrl();
  const fullTitle = absoluteTitle ?? `${title} | ${BUSINESS_NAME}`;

  return {
    title: absoluteTitle ? { absolute: absoluteTitle } : title,
    description,
    ...(siteUrl ? { alternates: { canonical: path } } : {}),
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type,
      title: fullTitle,
      description,
      siteName: BUSINESS_NAME,
      locale: "en_NG",
      url: path,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
  };
}
