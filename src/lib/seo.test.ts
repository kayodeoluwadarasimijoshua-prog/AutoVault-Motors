import { afterEach, describe, expect, it, vi } from "vitest";
import { getMetadataBase } from "@/lib/config";

const PLATFORM_VARS = ["VERCEL_PROJECT_PRODUCTION_URL", "VERCEL_URL", "DEPLOY_PRIME_URL", "URL"] as const;

function clearPlatformVars() {
  for (const key of PLATFORM_VARS) vi.stubEnv(key, "");
  vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("getMetadataBase", () => {
  it("uses the configured public site URL when present", () => {
    clearPlatformVars();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://autovault.example");
    vi.stubEnv("VERCEL_URL", "ignored.vercel.app");

    expect(getMetadataBase().toString()).toBe("https://autovault.example/");
  });

  it("falls back to the deployment host so social cards never point at localhost", () => {
    clearPlatformVars();
    vi.stubEnv("VERCEL_URL", "autovault-abc.vercel.app");

    expect(getMetadataBase().toString()).toBe("https://autovault-abc.vercel.app/");
  });

  it("prefers the stable production host over the per-deployment host", () => {
    clearPlatformVars();
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "autovault.vercel.app");
    vi.stubEnv("VERCEL_URL", "autovault-git-branch.vercel.app");

    expect(getMetadataBase().hostname).toBe("autovault.vercel.app");
  });

  it("accepts Netlify's bare hostname and leaves http(s) values untouched", () => {
    clearPlatformVars();
    vi.stubEnv("DEPLOY_PRIME_URL", "autovault.netlify.app");
    expect(getMetadataBase().protocol).toBe("https:");

    clearPlatformVars();
    vi.stubEnv("URL", "http://localhost:8888");
    expect(getMetadataBase().toString()).toBe("http://localhost:8888/");
  });

  it("falls back to localhost when nothing is configured", () => {
    clearPlatformVars();
    expect(getMetadataBase().toString()).toBe("http://localhost:3000/");
  });

  it("ignores an unparseable site URL instead of throwing", () => {
    clearPlatformVars();
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not a url");
    vi.stubEnv("VERCEL_URL", "autovault-abc.vercel.app");

    expect(getMetadataBase().hostname).toBe("autovault-abc.vercel.app");
  });
});
