import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function capitalize(id: string) {
  const tokens = id.split("-")
  return tokens.map((t) => t.charAt(0).toUpperCase() + t.substring(1)).join(" ")
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// @floating-ui/utils/dom
export function getComputedStyle(element: Element): CSSStyleDeclaration {
  return getWindow(element).getComputedStyle(element)
}

export function getWindow(node: any): typeof window {
  return node?.ownerDocument?.defaultView || window
}

function hasWindow() {
  return typeof window !== "undefined"
}

export function isHTMLElement(value: unknown): value is HTMLElement {
  if (!hasWindow()) {
    return false
  }

  return (
    value instanceof HTMLElement ||
    value instanceof getWindow(value).HTMLElement
  )
}

export function getCssDimensions(element: Element) {
  const css = getComputedStyle(element)
  // In testing environments, the `width` and `height` properties are empty
  // strings for SVG elements, returning NaN. Fallback to `0` in this case.
  let width = parseFloat(css.width) || 0
  let height = parseFloat(css.height) || 0
  const hasOffset = isHTMLElement(element)
  const offsetWidth = hasOffset ? element.offsetWidth : width
  const offsetHeight = hasOffset ? element.offsetHeight : height
  const shouldFallback =
    Math.round(width) !== offsetWidth || Math.round(height) !== offsetHeight

  if (shouldFallback) {
    width = offsetWidth
    height = offsetHeight
  }

  return {
    width,
    height,
  }
}

export function isNumber(value: any) {
  return !isNaN(parseFloat(value as any)) && !isNaN(Number(value))
}
