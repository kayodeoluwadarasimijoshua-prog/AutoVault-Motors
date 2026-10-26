import { NextResponse, type NextRequest } from "next/server";
import { getVehicleSlugs } from "@/data/vehicles";

/**
 * Vehicle detail pages are streamed by the App Shell, which would otherwise
 * answer an unknown slug with a 200 status plus a streamed "not found" UI.
 * Checking the slug here keeps the HTTP status honest (a real 404) and keeps
 * crawlers away from URLs that never existed.
 *
 * The check only touches the in-memory dataset, so it stays fast. The list is
 * built once per server process.
 */
const vehicleSlugs = new Set(getVehicleSlugs());

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const match = /^\/inventory\/([^/]+)\/?$/.exec(pathname);

  if (!match) return NextResponse.next();

  let slug = match[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    // Malformed percent-encoding: treat it as an unmatched route.
    slug = "";
  }

  if (vehicleSlugs.has(slug)) return NextResponse.next();

  // Rewrite to an unmatched path so the branded not-found route renders with a
  // genuine 404 status.
  return NextResponse.rewrite(new URL("/vehicle-not-found", request.url));
}

export const config = {
  matcher: ["/inventory/:path*"],
};
