import type { Metadata } from "next";
import { DiscoveryCta } from "@/components/home/discovery-cta";
import { FaqSection } from "@/components/home/faq-section";
import { FeaturedVehicles } from "@/components/home/featured-vehicles";
import { HeroSection } from "@/components/home/hero-section";
import { VehicleSearch } from "@/components/home/vehicle-search";
import { WhyAutoVault } from "@/components/home/why-autovault";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home",
  absoluteTitle: "AutoVault Motors | Dealership concept by Growthly",
  description:
    "A dealership website concept by Growthly: browse demo inventory, compare specifications and send a vehicle-specific WhatsApp enquiry.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VehicleSearch />
      <FeaturedVehicles />
      <WhyAutoVault />
      <DiscoveryCta />
      <FaqSection />
    </>
  );
}
