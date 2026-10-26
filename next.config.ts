import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js 16 defaults used by this project: Cache Components and Partial
  // Prefetching keep pages static while allowing request-time data (the
  // inventory query string) to stream in behind a Suspense boundary.
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  // Allow the sandboxed preview host (and any tunnel) to load dev assets.
  allowedDevOrigins: ["*.e2b.app", "*.e2b.dev", "*.vercel.app", "*.netlify.app"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        // Basic hardening. No frame-ancestors/X-Frame-Options is set so the
        // site can be embedded in a client's preview pane or pitch page.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
};

export default nextConfig;
