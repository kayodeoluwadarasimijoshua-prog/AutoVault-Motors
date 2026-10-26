"use client";

import Link from "next/link";
import { Check, Copy, MessageCircle, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { ButtonAnchor } from "@/components/ui/button";
import { buildVehicleEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Vehicle } from "@/types/vehicle";

interface WhatsAppEnquiryProps {
  vehicle: Vehicle;
}

const ctaLabels: Record<Vehicle["availability"], string> = {
  Available: "Enquire on WhatsApp",
  Reserved: "Ask about availability",
  Sold: "Ask about similar vehicles",
};

const availabilityNotes: Record<Vehicle["availability"], string | null> = {
  Available: null,
  Reserved:
    "This listing is marked reserved, so it is not presented as available for immediate purchase.",
  Sold: "This listing is marked sold. The dealership can tell you about similar vehicles instead.",
};

/** Vehicle-specific WhatsApp action, including an honest preview of the message. */
export function WhatsAppEnquiry({ vehicle }: WhatsAppEnquiryProps) {
  const message = buildVehicleEnquiryMessage(vehicle);
  const url = buildWhatsAppUrl(message);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const note = availabilityNotes[vehicle.availability];

  async function copyMessage() {
    setCopyError(false);
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 4000);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <div className="rounded-[var(--radius-panel)] border border-bone-200 bg-white p-5">
      <h2 className="text-sm font-semibold tracking-[-0.01em] text-ink-950">Enquire about this vehicle</h2>

      {note ? (
        <p className="mt-3 flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900">
          <TriangleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" strokeWidth={1.9} />
          {note}
        </p>
      ) : null}

      {url ? (
        <ButtonAnchor
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="lg"
          className="mt-4 w-full"
        >
          <MessageCircle aria-hidden="true" className="size-4" strokeWidth={1.9} />
          {ctaLabels[vehicle.availability]}
          <span className="sr-only">(opens WhatsApp in a new tab with a prepared message)</span>
        </ButtonAnchor>
      ) : (
        <div className="mt-4 rounded-md border border-bone-300 bg-bone-100 p-4">
          <p className="text-sm font-medium text-ink-900">WhatsApp contact is not configured</p>
          <p className="mt-1.5 text-xs leading-relaxed text-ink-600">
            This demonstration build has no WhatsApp number connected, so the enquiry cannot be sent
            from here. The message that would be sent is shown below, and the{" "}
            <Link href="/contact" className="font-medium text-moss-700 underline underline-offset-2">
              contact page
            </Link>{" "}
            explains the other options.
          </p>
        </div>
      )}

      <details className="mt-4 rounded-md border border-bone-200 bg-bone-50">
        <summary className="cursor-pointer rounded-md px-3.5 py-3 text-[13px] font-medium text-ink-800 hover:text-ink-950">
          Preview the enquiry message
        </summary>
        <div className="border-t border-bone-200 px-3.5 py-3">
          <p className="text-[13px] leading-relaxed text-ink-700">{message}</p>
          <button
            type="button"
            onClick={copyMessage}
            className="mt-3 inline-flex items-center gap-1.5 rounded-md border border-bone-300 bg-white px-2.5 py-1.5 text-[12px] font-medium text-ink-800 transition-colors hover:border-ink-400"
          >
            {copied ? (
              <Check aria-hidden="true" className="size-3.5 text-moss-700" strokeWidth={2.2} />
            ) : (
              <Copy aria-hidden="true" className="size-3.5" strokeWidth={1.9} />
            )}
            {copied ? "Copied" : "Copy message"}
          </button>
          <span role="status" aria-live="polite" className="sr-only">
            {copied ? "Enquiry message copied to the clipboard." : ""}
            {copyError ? "The message could not be copied. You can select the text manually." : ""}
          </span>
        </div>
      </details>

      <p className="mt-3 text-[11px] leading-relaxed text-ink-500">
        Your message is not sent automatically — WhatsApp opens with the text ready for you to review
        and send. Demonstration listings are sample data, so any reply depends on the dealership
        being configured.
      </p>
    </div>
  );
}
