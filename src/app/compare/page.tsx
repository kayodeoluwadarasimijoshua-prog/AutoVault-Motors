import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ComparisonView } from "@/components/vehicles/comparison-view";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Compare vehicles",
  description:
    "Compare up to three AutoVault Motors demonstration vehicles side by side: price, model year, mileage, transmission, fuel type, body style and condition.",
  path: "/compare",
});

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Comparison"
        title="Compare your shortlist"
        description="Up to three vehicles side by side, with the specifications that decide most purchases. Selections are stored in your browser only."
      />

      <section aria-label="Vehicle comparison" className="bg-bone-50 py-8 sm:py-10">
        <div className="container-page">
          <Link
            href="/inventory"
            className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-600 transition-colors hover:text-ink-950"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" strokeWidth={2} />
            Back to inventory
          </Link>

          <ComparisonView />
        </div>
      </section>
    </>
  );
}
