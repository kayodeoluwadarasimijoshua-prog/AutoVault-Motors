"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/button";

/**
 * Route-level error boundary. Visitors see a calm explanation; the technical
 * detail stays in the browser console and server logs.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the detail available for developers without printing it on the page.
    console.error("AutoVault Motors route error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center bg-bone-50 py-16">
      <div className="container-page">
        <div className="max-w-xl">
          <p className="eyebrow text-moss-700">Something went wrong</p>
          <h1 className="display-md mt-3 text-ink-950">This page could not be loaded</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            An unexpected error interrupted the request. You can try again, or head back to the
            inventory to keep browsing.
          </p>
          {error.digest ? (
            <p className="mt-3 font-mono text-[11px] text-ink-500">Reference: {error.digest}</p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button variant="dark" size="lg" onClick={reset}>
              <RotateCcw aria-hidden="true" className="size-4" strokeWidth={1.9} />
              Try again
            </Button>
            <ButtonLink href="/inventory" variant="outline" size="lg">
              Browse inventory
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ink-500">
            Still stuck?{" "}
            <Link href="/contact" className="font-medium text-moss-700 underline underline-offset-4">
              Contact the team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
