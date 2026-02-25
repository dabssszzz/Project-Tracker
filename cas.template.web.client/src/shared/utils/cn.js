/**
 * Class name utility using tailwind-merge and clsx
 * DRY: Reusable className helper
 */
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
