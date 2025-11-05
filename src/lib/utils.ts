/**
 * @title Utility Functions
 * @description Helper functions for the application
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * @title cn
 * @description Merge Tailwind CSS classes with clsx
 *
 * @param {ClassValue[]} inputs - Class values to merge
 * @returns {string} Merged class string
 *
 * @example
 * ```typescript
 * cn("px-2 py-1", isActive && "bg-blue-500")
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * @title formatPrice
 * @description Format price to currency string
 *
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 *
 * @example
 * ```typescript
 * formatPrice(2999.99) // Returns: "$2,999.99"
 * ```
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

/**
 * @title formatDate
 * @description Format date to readable string
 *
 * @param {string | Date} date - Date to format
 * @returns {string} Formatted date string
 *
 * @example
 * ```typescript
 * formatDate(new Date()) // Returns: "Nov 3, 2025"
 * ```
 */
export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * @title slugify
 * @description Convert string to URL-friendly slug
 *
 * @param {string} text - Text to slugify
 * @returns {string} Slugified string
 *
 * @example
 * ```typescript
 * slugify("Diamond Ring") // Returns: "diamond-ring"
 * ```
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
