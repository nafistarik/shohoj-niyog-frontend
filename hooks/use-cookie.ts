import { useSyncExternalStore } from "react";
import { getCookie } from "@/lib/utils";

const subscribe = () => () => {};

/**
 * Reads a cookie during render without a hydration mismatch: the server and the
 * first client render both see `null`, then React re-renders with the real value.
 */
export function useCookie(name: string): string | null {
  return useSyncExternalStore(
    subscribe,
    () => getCookie(name),
    () => null
  );
}
