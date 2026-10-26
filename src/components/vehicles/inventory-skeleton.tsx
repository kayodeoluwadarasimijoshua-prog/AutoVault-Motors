/**
 * Fallback shown while the inventory reads the current URL on the server.
 * It mirrors the real layout so nothing jumps when the results stream in.
 */
export function InventorySkeleton() {
  return (
    <div aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading the vehicle inventory…</span>
      <div className="flex flex-col gap-3 border-b border-bone-200 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="h-11 w-full max-w-md rounded-lg bg-bone-200/70 lg:w-96" />
        <div className="h-11 w-full rounded-lg bg-bone-200/70 sm:w-56" />
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)] lg:gap-10">
        <div className="hidden lg:block">
          <div className="h-[26rem] rounded-[var(--radius-card)] border border-bone-200 bg-white" />
        </div>
        <div>
          <div className="h-4 w-48 rounded bg-bone-200/70" />
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <li
                key={item}
                className="overflow-hidden rounded-[var(--radius-card)] border border-bone-200 bg-white"
              >
                <div className="aspect-[4/3] w-full bg-bone-200/60" />
                <div className="space-y-3 p-4">
                  <div className="h-3 w-16 rounded bg-bone-200/70" />
                  <div className="h-4 w-3/4 rounded bg-bone-200/70" />
                  <div className="h-5 w-28 rounded bg-bone-200/70" />
                  <div className="h-3 w-full rounded bg-bone-200/50" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
