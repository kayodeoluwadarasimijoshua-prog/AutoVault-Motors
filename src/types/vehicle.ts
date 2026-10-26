/**
 * Shared vehicle types.
 *
 * The dataset is intentionally a plain, typed module so that server components,
 * client components and unit tests can all consume the same shapes.
 */

export type Transmission = "Automatic" | "Manual";

export type VehicleCondition = "Foreign Used" | "Nigerian Used";

export interface ColourOption {
  /** Display name, e.g. "Graphite Grey". */
  name: string;
  /** Swatch colour for the interface. */
  hex: string;
}

export type VehicleAvailability = "Available" | "Reserved" | "Sold";

/** The four gallery angles every listing presents. */
export type GalleryView = "front" | "back" | "inside" | "boot";

export interface VehicleImage {
  /** Path relative to /public, e.g. "/images/vehicles/toyota-camry-2021-1.jpg". */
  src: string;
  /** Meaningful alternative text. Empty string marks a decorative image. */
  alt: string;
  /**
   * Which angle the photograph shows. Set explicitly on listings that supply
   * their own multi-angle photography; otherwise the gallery composition fills
   * the missing views from the body-style reference set.
   */
  view?: GalleryView;
}

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  /** Price in Nigerian naira, as a whole number. */
  price: number;
  /** Mileage in kilometres. */
  mileage: number;
  transmission: Transmission;
  fuelType: string;
  bodyStyle: string;
  condition: VehicleCondition;
  /** e.g. "2.5L". Optional because not every listing records it. */
  engineCapacity?: string;
  exteriorColour: string;
  /**
   * Colour options recorded for the listing. The first entry matches
   * `exteriorColour`. Sample data on this concept site.
   */
  availableColours: ColourOption[];
  /** Short marketing-free description of the listing. */
  description: string;
  features: string[];
  images: VehicleImage[];
  featured: boolean;
  availability: VehicleAvailability;
  /** Internal reference shown on cards and detail pages, e.g. "AV-1042". */
  stockNumber: string;
}

export type SortKey =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "year-desc"
  | "year-asc";
