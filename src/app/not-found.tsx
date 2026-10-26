import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CarFront } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { VEHICLE_COUNT } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for is not part of the AutoVault Motors demonstration site.",
  // Next.js already emits <meta name="robots" content="noindex"> for this route.
};

export default function NotFound() {
  return (
    <section className="grain-dark flex min-h-[70vh] items-center bg-ink-950 py-16 text-bone-50">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-2.5 text-moss-300">
            <span aria-hidden="true" className="h-px w-7 bg-moss-500" />
            404 — page not found
          </p>

          <h1 className="display-xl mt-5 text-balance">This car isn&rsquo;t in the showroom.</h1>

          <p className="lede mt-4 max-w-xl text-ink-300">
            The page you asked for doesn&rsquo;t exist, or the listing has moved. The inventory is the
            best place to pick things up again — it currently holds {VEHICLE_COUNT} demonstration
            vehicles.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/inventory" size="lg" variant="primary">
              <CarFront aria-hidden="true" className="size-4" strokeWidth={1.8} />
              Browse the inventory
            </ButtonLink>
            <ButtonLink href="/" size="lg" variant="outlineDark">
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.8} />
              Back to the homepage
            </ButtonLink>
          </div>

          <p className="mt-8 text-sm text-ink-400">
            Need to speak to someone?{" "}
            <Link
              href="/contact"
              className="font-medium text-moss-300 underline decoration-moss-500/60 underline-offset-4 hover:text-moss-200"
            >
              Use the contact page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
