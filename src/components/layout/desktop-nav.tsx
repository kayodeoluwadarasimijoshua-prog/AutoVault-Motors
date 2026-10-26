"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { NAV_LINKS } from "@/lib/config";

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
      {NAV_LINKS.map((link) => {
        const active = isActive(pathname, link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
              active ? "text-bone-50" : "text-ink-300 hover:text-bone-50",
            )}
          >
            {link.label}
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-x-3 -bottom-px h-px origin-left transition-transform duration-200",
                active ? "scale-x-100 bg-moss-400" : "scale-x-0 bg-transparent",
              )}
            />
          </Link>
        );
      })}
      <Link
        href="/compare"
        aria-current={isActive(pathname, "/compare") ? "page" : undefined}
        className={cn(
          "rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
          isActive(pathname, "/compare") ? "text-bone-50" : "text-ink-300 hover:text-bone-50",
        )}
      >
        Compare
      </Link>
    </nav>
  );
}
