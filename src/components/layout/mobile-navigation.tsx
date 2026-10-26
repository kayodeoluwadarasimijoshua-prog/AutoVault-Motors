"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Logo } from "@/components/layout/logo";
import { WhatsAppCta } from "@/components/layout/whatsapp-cta";
import { cn } from "@/lib/cn";
import { DEMO_NOTICE_SHORT, NAV_LINKS } from "@/lib/config";

const menuLinks = [...NAV_LINKS, { href: "/compare", label: "Compare vehicles" }];

/**
 * Mobile menu built on the native <dialog> element: focus is trapped, Escape
 * closes it and the rest of the page is inert while it is open.
 */
export function MobileNavigation() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // The dialog is portalled after hydration only, so the server HTML and the
  // first client render always match.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Lock background scrolling while the sheet is open.
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  function closeMenu(returnFocus = true) {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center rounded-lg border border-ink-700 text-bone-50 transition-colors hover:border-ink-500 hover:bg-ink-900 lg:hidden"
      >
        <Menu aria-hidden="true" className="size-5" strokeWidth={1.8} />
      </button>

      {mounted
        ? createPortal(
            <dialog
              ref={dialogRef}
              aria-label="Site menu"
              onClose={() => closeMenu()}
              className="fixed inset-0 m-0 h-[100dvh] max-h-none w-full max-w-none overflow-y-auto bg-ink-950 p-0 text-ink-100 backdrop:bg-ink-950/80 lg:hidden"
            >
        <div className="flex min-h-[100dvh] flex-col">
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <Logo />
            <button
              type="button"
              onClick={() => closeMenu()}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-lg border border-ink-700 text-bone-50 transition-colors hover:border-ink-500 hover:bg-ink-900"
            >
              <X aria-hidden="true" className="size-5" strokeWidth={1.8} />
            </button>
          </div>

          <nav aria-label="Primary" className="flex-1 px-5 py-4">
            <ul className="divide-y divide-white/10">
              {menuLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center justify-between gap-4 py-4 text-[17px] font-medium transition-colors",
                        active ? "text-moss-300" : "text-ink-100 hover:text-moss-300",
                      )}
                    >
                      {link.label}
                      <ArrowUpRight
                        aria-hidden="true"
                        className={cn("size-4", active ? "text-moss-300" : "text-ink-500")}
                        strokeWidth={1.8}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-3 border-t border-white/10 px-5 py-5">
            <WhatsAppCta size="md" label="Talk to us on WhatsApp" context="header" className="w-full" />
            <p className="text-xs leading-relaxed text-ink-400">{DEMO_NOTICE_SHORT}</p>
          </div>
              </div>
            </dialog>,
            document.body,
          )
        : null}
    </>
  );
}
