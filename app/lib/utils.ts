import { round, type Dimensions } from "@floating-ui/utils";
import { getComputedStyle, isHTMLElement } from "@floating-ui/utils/dom";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function capitalize(id: string) {
  const tokens = id.split("-");
  return tokens
    .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
    .join(" ");
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCssDimensions(element: Element): Dimensions {
  const css = getComputedStyle(element);
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback =
    round(width) !== offsetWidth || round(height) !== offsetHeight;

  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }

  return {
    width,
    height,
  };
}
