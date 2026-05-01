import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── Appended from NAVICA ────────────────────────────────────────────────────

export function normalizeText(input: string): string {
  let normalized = input.replace(/\s+/g, ' ');
  normalized = normalized.replace(/\n+/g, '\n');
  return normalized.trim();
}
