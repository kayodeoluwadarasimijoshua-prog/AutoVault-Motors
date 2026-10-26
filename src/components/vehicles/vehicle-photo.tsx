"use client";

import Image from "next/image";
import { CarFront } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

interface VehiclePhotoProps {
  src: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}

/**
 * Vehicle image with a fixed aspect ratio (no layout shift) and a graceful
 * fallback panel if the asset is missing or fails to load.
 */
export function VehiclePhoto({
  src,
  alt,
  aspect = "aspect-[4/3]",
  sizes,
  priority = false,
  className,
  imageClassName,
}: VehiclePhotoProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={cn("relative w-full overflow-hidden bg-bone-100", aspect, className)}>
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#e8e8e2_0%,#f4f4f0_55%,#e2e5e1_100%)] text-ink-500"
        >
          <CarFront aria-hidden="true" className="size-7" strokeWidth={1.4} />
          <span className="text-xs font-medium">Image unavailable</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imageClassName)}
        />
      )}
    </div>
  );
}
