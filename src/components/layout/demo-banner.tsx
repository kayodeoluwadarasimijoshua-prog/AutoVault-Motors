import { ArrowUpRight } from "lucide-react";

export function DemoBanner() {
  return (
    <aside
      aria-label="About this demo"
      className="border-b border-moss-200 bg-moss-50 text-ink-900"
    >
      <div className="container-page flex flex-wrap items-center justify-between gap-x-5 gap-y-1.5 py-2.5 text-xs leading-relaxed">
        <p>
          <strong className="font-semibold">A Growthly website demo.</strong> Sample vehicles, not
          for sale.
        </p>
        <a
          href="https://growthly.com.ng/request-a-quote?service=website-development"
          className="inline-flex items-center gap-1 font-semibold text-moss-800 underline underline-offset-4"
        >
          Get a website like this <ArrowUpRight aria-hidden="true" className="size-3.5" />
        </a>
      </div>
    </aside>
  );
}
