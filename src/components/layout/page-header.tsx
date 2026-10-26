import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

/** Shared dark page introduction used by inventory, about, contact and compare. */
export function PageHeader({ eyebrow, title, description, children, className }: PageHeaderProps) {
  return (
    <section className={cn("grain-dark border-b border-white/10 bg-ink-950 text-bone-50", className)}>
      <div className="container-page py-11 sm:py-14">
        <div className="max-w-3xl">
          {eyebrow ? <p className="eyebrow text-moss-300">{eyebrow}</p> : null}
          <h1 className="display-lg mt-3 text-balance text-bone-50">{title}</h1>
          {description ? (
            <p className="lede mt-4 max-w-2xl text-ink-300">{description}</p>
          ) : null}
        </div>
        {children ? <div className="mt-7">{children}</div> : null}
      </div>
    </section>
  );
}
