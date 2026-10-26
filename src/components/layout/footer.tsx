import Link from "next/link";
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { VEHICLE_COUNT, VEHICLE_COUNT_BY_MAKE } from "@/data/vehicles";
import {
  BUSINESS_NAME,
  CONTACT_EMAIL,
  COPYRIGHT_YEAR,
  DEMO_NOTICE,
  NAV_LINKS,
  STUDIO_NAME,
  isEmailConfigured,
} from "@/lib/config";
import { buildGeneralEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

const inventoryLinks = [
  { href: "/inventory", label: `All vehicles (${VEHICLE_COUNT})` },
  ...VEHICLE_COUNT_BY_MAKE.map((entry) => ({
    href: `/inventory?make=${encodeURIComponent(entry.make)}`,
    label: `${entry.make} (${entry.count})`,
  })),
];

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(buildGeneralEnquiryMessage("footer"));

  return (
    <footer className="border-t border-white/10 bg-ink-950 text-ink-200">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.1fr] lg:gap-12">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-300">
              A modern showroom concept for browsing vehicles, comparing specifications, and starting
              a conversation with the dealership on WhatsApp.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-ink-400">
              {VEHICLE_COUNT} demonstration listings · Nigerian naira pricing · Built for mobile
              browsing.
            </p>
          </div>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="eyebrow text-ink-400">
              Explore
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-200 transition-colors hover:text-bone-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/compare"
                  className="text-sm text-ink-200 transition-colors hover:text-bone-50"
                >
                  Compare vehicles
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-inventory">
            <h2 id="footer-inventory" className="eyebrow text-ink-400">
              Shop by brand
            </h2>
            <ul className="mt-4 space-y-2.5">
              {inventoryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-200 transition-colors hover:text-bone-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-ink-400">Contact</h2>
            <ul className="mt-4 space-y-3">
              {whatsappUrl ? (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm text-ink-200 transition-colors hover:text-bone-50"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-moss-400"
                      strokeWidth={1.8}
                    />
                    <span>
                      WhatsApp enquiries
                      <span className="block text-xs text-ink-400">Opens in a new tab</span>
                    </span>
                  </a>
                </li>
              ) : (
                <li className="flex items-start gap-2 text-sm text-ink-300">
                  <MessageCircle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-ink-500"
                    strokeWidth={1.8}
                  />
                  <span>
                    WhatsApp number not yet configured
                    <Link
                      href="/contact"
                      className="mt-1 block text-xs text-moss-300 underline underline-offset-2 hover:text-moss-200"
                    >
                      Use the contact page to reach the team
                    </Link>
                  </span>
                </li>
              )}

              {isEmailConfigured() ? (
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex items-start gap-2 text-sm text-ink-200 transition-colors hover:text-bone-50"
                  >
                    <Mail
                      aria-hidden="true"
                      className="mt-0.5 size-4 shrink-0 text-moss-400"
                      strokeWidth={1.8}
                    />
                    {CONTACT_EMAIL}
                  </a>
                </li>
              ) : null}

              <li>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-sm text-ink-200 transition-colors hover:text-bone-50"
                >
                  Contact the team
                  <ArrowUpRight aria-hidden="true" className="size-3.5" strokeWidth={1.8} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 rounded-[var(--radius-card)] border border-white/10 bg-ink-900/60 p-5">
          <p className="eyebrow text-moss-300">Demonstration project</p>
          <p className="mt-2 max-w-4xl text-xs leading-relaxed text-ink-300">{DEMO_NOTICE}</p>
          <p className="mt-2 text-xs leading-relaxed text-ink-400">
            No showroom address, business registration number or telephone line is published because
            this concept does not represent a trading business.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {COPYRIGHT_YEAR} {BUSINESS_NAME}. All rights reserved.
          </p>
          <p>
            Concept and design by{" "}
            <span className="font-medium text-ink-200">{STUDIO_NAME}</span> · Portfolio
            demonstration
          </p>
        </div>
      </div>
    </footer>
  );
}
