/**
 * Safe JSON storage helpers. Storage can be unavailable (private mode,
 * blocked cookies), so every call is guarded and failures are ignored.
 */
type StorageKind = "session" | "local";

function getStorage(kind: StorageKind): Storage | null {
  try {
    return kind === "session" ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export function readStored(kind: StorageKind, key: string): unknown {
  try {
    const raw = getStorage(kind)?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeStored(kind: StorageKind, key: string, value: unknown): void {
  try {
    getStorage(kind)?.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota/availability errors — state just won't persist.
  }
}

export const STORAGE_KEYS = {
  finder: "midnight-citrus:finder:v1",
  menu: "midnight-citrus:menu:v1",
  shopping: "midnight-citrus:shopping:v1",
  checklist: "midnight-citrus:checklist:v1",
} as const;
