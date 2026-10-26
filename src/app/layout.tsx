import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ComparisonProvider } from "@/components/vehicles/comparison-provider";
import { BUSINESS_NAME, getMetadataBase } from "@/lib/config";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: `${BUSINESS_NAME} — Automotive showroom concept`,
    template: `%s | ${BUSINESS_NAME}`,
  },
  description:
    "Browse a demonstration vehicle inventory with full specifications, side-by-side comparison and direct WhatsApp enquiries. A dealership website concept designed by Growthly for Nigerian car dealerships.",
  applicationName: BUSINESS_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "website",
    siteName: BUSINESS_NAME,
    locale: "en_NG",
    title: `${BUSINESS_NAME} — Automotive showroom concept`,
    description:
      "Browse a demonstration vehicle inventory with full specifications, side-by-side comparison and direct WhatsApp enquiries.",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BUSINESS_NAME} — Automotive showroom concept`,
    description:
      "Browse a demonstration vehicle inventory with full specifications, side-by-side comparison and direct WhatsApp enquiries.",
    images: [OG_IMAGE.url],
  },
  // No site-wide robots directive: index/follow is the default, and declaring it
  // here would contradict the noindex tag Next.js adds to the 404 route.
};

export const viewport: Viewport = {
  themeColor: "#101214",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NG" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-dvh flex-col bg-bone-50 text-ink-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-bone-50 focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-950 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <ComparisonProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ComparisonProvider>
      </body>
    </html>
  );
}
