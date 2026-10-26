"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  MAX_COMPARISON_ITEMS,
  parseStoredComparison,
  toggleComparisonSlug,
} from "@/lib/comparison";

const STORAGE_KEY = "autovault:comparison:v1";

/**
 * localStorage is treated as an external store and read through
 * useSyncExternalStore. React renders the server snapshot while hydrating and
 * then re-renders with the stored value, so the static HTML never mismatches and
 * no state is set from inside an effect.
 */
const EMPTY: string[] = [];
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function readFromStorage(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    return parseStoredComparison(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage can be blocked (private mode, disabled site data). Comparison then
    // works for the current page view without persisting between visits.
    return EMPTY;
  }
}

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  // Another tab may change the selection.
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = readFromStorage();
      emit();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function sameSlugs(a: string[], b: string[]): boolean {
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

/**
 * Reads storage on each snapshot but returns the previous array when the
 * contents are unchanged, so React sees a stable reference. This keeps the
 * selection correct after storage is cleared or changed in another tab.
 */
function getSnapshot(): string[] {
  const stored = readFromStorage();
  if (cache === null || !sameSlugs(cache, stored)) cache = stored;
  return cache;
}

function getServerSnapshot(): string[] {
  return EMPTY;
}

function writeSlugs(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Ignore write failures; the in-memory selection still works.
  }
  emit();
}

const noopSubscribe = () => () => {};

interface ComparisonContextValue {
  slugs: string[];
  hydrated: boolean;
  isSelected: (slug: string) => boolean;
  isFull: boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
  statusMessage: string;
  limit: number;
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const slugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  // false during SSR and hydration, true once the browser has taken over.
  const hydrated = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const [statusMessage, setStatusMessage] = useState("");
  const statusTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimeout.current) clearTimeout(statusTimeout.current);
    };
  }, []);

  const announce = useCallback((message: string) => {
    setStatusMessage(message);
    if (statusTimeout.current) clearTimeout(statusTimeout.current);
    statusTimeout.current = setTimeout(() => setStatusMessage(""), 4000);
  }, []);

  const toggle = useCallback(
    (slug: string) => {
      const result = toggleComparisonSlug(getSnapshot(), slug);
      if (result.limitReached) {
        announce(`You can compare up to ${MAX_COMPARISON_ITEMS} vehicles. Remove one to add another.`);
        return;
      }
      writeSlugs(result.slugs);
      announce(result.added ? "Added to comparison." : "Removed from comparison.");
    },
    [announce],
  );

  const remove = useCallback(
    (slug: string) => {
      writeSlugs(getSnapshot().filter((item) => item !== slug));
      announce("Removed from comparison.");
    },
    [announce],
  );

  const clear = useCallback(() => {
    writeSlugs([]);
    announce("Comparison cleared.");
  }, [announce]);

  const value = useMemo<ComparisonContextValue>(
    () => ({
      slugs,
      hydrated,
      isSelected: (slug: string) => slugs.includes(slug),
      isFull: slugs.length >= MAX_COMPARISON_ITEMS,
      toggle,
      remove,
      clear,
      statusMessage,
      limit: MAX_COMPARISON_ITEMS,
    }),
    [slugs, hydrated, toggle, remove, clear, statusMessage],
  );

  return (
    <ComparisonContext.Provider value={value}>
      {children}
      <p role="status" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
    </ComparisonContext.Provider>
  );
}

export function useComparison(): ComparisonContextValue {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error("useComparison must be used inside <ComparisonProvider>.");
  }
  return context;
}
