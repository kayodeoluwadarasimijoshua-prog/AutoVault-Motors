# AutoVault portfolio refinement

AutoVault remains a self-initiated Growthly dealership website demo. It is not a trading dealership, live stock catalogue or paid client project. Its vehicles, prices, specifications and colours are sample data; vehicle artwork is AI-generated. No sales or conversion results are claimed.

## Changes

- Added a compact site-wide demo notice and a direct **Get a website like this** link to Growthly's website enquiry page. The footer also links to Growthly.
- Put the mobile headline and browsing action before the large hero image. At 390px width, the heading begins about 212px down the page, compared with 452px in the baseline.
- Reworded the homepage action and introduction around trying the sample inventory. Corrected the featured-listing description to match the five represented makes.
- Made the hero's AI-generated image provenance explicit in both its caption and alt text.
- Explained that demo contact handoffs reach Growthly. Prepared WhatsApp messages carry a demo notice while preserving vehicle and availability context; email form subjects also identify the demo. No message was sent during testing.
- Protected the enquiry form before hydration: personal-data controls are hidden and disabled until the JavaScript handler can run, the native method is POST, and a no-JavaScript notice points to explicit contact links. This avoids a native GET submission containing personal details. No backend lead collection was added.
- Increased contrast for the header wordmark subtitle and footer disclosure after browser accessibility findings.

## Evidence

| Check | Result |
| --- | --- |
| Baseline lint, types, tests and production build | Passed; 118 tests |
| Refined lint, types, tests and production build | Passed; 119 tests |
| Final lint and build after contrast fixes | Passed |
| Browser route/layout inspection | Six routes × four widths (360, 390, 768, 1440); HTTP 200, no detected horizontal overflow, broken loaded images or uncaught page errors |
| Interactions at all four widths | Toyota brand filter returns ten listings; two-vehicle comparison persists after reload; next gallery view selects the rear image; WhatsApp links identify the demo |
| No-JavaScript contact | Form controls disabled/hidden; POST fallback; direct contact guidance available |
| Unknown vehicle | Actual HTTP 404 |
| Final automated accessibility | Home and Contact at 390px and 1440px: zero detected WCAG A/AA rule violations in the selected scans |

These are local checks, not a guarantee of accessibility or hosted delivery. The 24 route/layout checks preceded the final contrast-only changes; the four accessibility scans and final screenshots were then repeated against the final build. An existing gallery hydration unit test emits React act-environment warnings but passes; no assertions were disabled.

Local evidence lives in ignored `artifacts/refinement/`. Production provider tools were unavailable; no hosted promotion or real message receipt was verified.

## Add this demo to Growthly

The corresponding Growthly branch `improvement/autovault-demo` adds an **Add AutoVault demo draft** action to its Projects editor, factual case-study copy and a genuine 1440×900 browser screenshot of this refined build. It preserves an existing stored publication and adds nothing publicly until the owner publishes the reviewed draft.

Deploy the desired AutoVault version and verify the existing public demo URL first. Then follow Growthly's `docs/AUTOVAULT-PORTFOLIO.md`: add the private template, upload the supplied screenshot through the existing private-media workflow, review project/image permissions and publish. The screenshot is a real capture of the application; its car illustration remains AI-generated.
