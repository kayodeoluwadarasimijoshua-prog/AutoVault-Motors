import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  href?: string;
  label: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  tone?: "light" | "dark";
}

export function Breadcrumbs({ items, tone = "light" }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={
                    tone === "dark"
                      ? "text-ink-300 transition-colors hover:text-bone-50"
                      : "text-ink-500 transition-colors hover:text-ink-900"
                  }
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={tone === "dark" ? "text-bone-50" : "text-ink-900"}
                >
                  {item.label}
                </span>
              )}
              {!isLast ? (
                <ChevronRight
                  aria-hidden="true"
                  className={tone === "dark" ? "size-3 text-ink-500" : "size-3 text-ink-400"}
                  strokeWidth={2}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
