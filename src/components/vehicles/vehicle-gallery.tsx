"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { VehiclePhoto } from "@/components/vehicles/vehicle-photo";
import { cn } from "@/lib/cn";
import type { GalleryView, VehicleImage } from "@/types/vehicle";

interface VehicleGalleryProps {
  images: VehicleImage[];
  vehicleName: string;
}

/** Human labels for the four gallery angles. */
const VIEW_LABELS: Record<GalleryView, string> = {
  front: "Front",
  back: "Back",
  inside: "Inside",
  boot: "Boot",
};

function labelFor(image: VehicleImage, index: number): string {
  return image.view ? VIEW_LABELS[image.view] : `Photo ${index + 1}`;
}

export function VehicleGallery({ images, vehicleName }: VehicleGalleryProps) {
  const [selected, setSelected] = useState(0);
  const main = images[selected] ?? images[0];
  const hasMultiple = images.length > 1;

  if (!main) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-panel)] border border-bone-200 bg-white text-sm text-ink-500">
        No photographs are available for this listing.
      </div>
    );
  }

  function show(index: number) {
    const total = images.length;
    setSelected(((index % total) + total) % total);
  }

  const mainLabel = labelFor(main, selected);

  return (
    <section aria-label={`${vehicleName} photographs`}>
      <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-bone-200 bg-white">
        <VehiclePhoto
          key={main.src}
          src={main.src}
          alt={main.alt}
          aspect="aspect-[4/3]"
          sizes="(min-width: 1024px) 58vw, 92vw"
          priority
        />

        <p className="absolute left-3 top-3 rounded bg-ink-950/80 px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-bone-50">
          {mainLabel} view
        </p>

        {hasMultiple ? (
          <>
            <button
              type="button"
              onClick={() => show(selected - 1)}
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-bone-50 ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-ink-950/90"
              aria-label="Show previous photograph"
            >
              <ChevronLeft aria-hidden="true" className="size-5" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={() => show(selected + 1)}
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-bone-50 ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-ink-950/90"
              aria-label="Show next photograph"
            >
              <ChevronRight aria-hidden="true" className="size-5" strokeWidth={2} />
            </button>
            <p className="absolute bottom-3 right-3 rounded bg-ink-950/75 px-2 py-1 font-mono text-[11px] tracking-[0.08em] text-bone-50">
              {selected + 1} / {images.length}
            </p>
          </>
        ) : null}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        {`${mainLabel} view shown — photograph ${selected + 1} of ${images.length}`}
      </p>

      {hasMultiple ? (
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {images.map((image, index) => {
            const isSelected = index === selected;
            const label = labelFor(image, index);
            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setSelected(index)}
                  aria-pressed={isSelected}
                  aria-label={`Show ${label.toLowerCase()} view — photograph ${index + 1} of ${images.length}`}
                  className={cn(
                    "block w-full overflow-hidden rounded-md border text-left transition-colors",
                    isSelected
                      ? "border-moss-600 ring-2 ring-moss-500/40"
                      : "border-bone-200 hover:border-ink-300",
                  )}
                >
                  <VehiclePhoto
                    src={image.src}
                    alt=""
                    aspect="aspect-[4/3]"
                    sizes="(min-width: 640px) 14vw, 44vw"
                    imageClassName={isSelected ? "opacity-100" : "opacity-85"}
                  />
                  <span
                    className={cn(
                      "flex items-center justify-between gap-1 px-2 py-1.5 text-[11px] font-medium",
                      isSelected ? "bg-moss-50 text-moss-800" : "bg-white text-ink-600",
                    )}
                  >
                    {label}
                    <span className="font-mono text-[10px] text-ink-500">{index + 1}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
}
