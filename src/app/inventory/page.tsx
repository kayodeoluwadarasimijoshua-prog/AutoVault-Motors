import type { Metadata } from "next";
import { Suspense } from "react";
import { Info } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { InventoryBrowser } from "@/components/vehicles/inventory-browser";
import { InventorySkeleton } from "@/components/vehicles/inventory-skeleton";
import { ALL_VEHICLES, VEHICLE_COUNT } from "@/data/vehicles";
import { DEMO_NOTICE_SHORT } from "@/lib/config";
import { pluralise } from "@/lib/formatters";
import { createPageMetadata } from "@/lib/seo";
import {
  filtersToQueryString,
  parseVehicleFilters,
} from "@/lib/vehicle-filters";

export const metadata: Metadata = createPageMetadata({
  title: "Vehicle inventory",
  description:
    "Browse the AutoVault Motors demonstration inventory: filter by make, price, year, transmission, body style and condition, then enquire on WhatsApp.",
  path: "/inventory",
});

type SearchParams = Record<string, string | string[] | undefined>;

export default function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="Every vehicle in the AutoVault collection"
        description="Search the demonstration inventory, combine filters to narrow the list, and open any vehicle for full specifications and a prepared WhatsApp enquiry."
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-[13px] text-ink-300">
          <span className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-ink-900/70 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-moss-400" aria-hidden="true" />
            {pluralise(VEHICLE_COUNT, "vehicle")} in this sample dataset
          </span>
          <span className="inline-flex items-center gap-2">
            <Info aria-hidden="true" className="size-3.5 text-ink-400" strokeWidth={1.8} />
            {DEMO_NOTICE_SHORT}
          </span>
        </div>
      </PageHeader>

      <section aria-label="Vehicle results" className="bg-bone-50 py-8 sm:py-10">
        <div className="container-page">
          <Suspense fallback={<InventorySkeleton />}>
            <InventoryResults searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </>
  );
}

/**
 * Reads the URL query on the server so that a shared or refreshed link renders
 * the correct filtered inventory in the first response.
 */
async function InventoryResults({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const filters = parseVehicleFilters(params);

  return (
    <InventoryBrowser
      vehicles={ALL_VEHICLES}
      initialFilters={filters}
      initialQuery={filtersToQueryString(filters)}
    />
  );
}
