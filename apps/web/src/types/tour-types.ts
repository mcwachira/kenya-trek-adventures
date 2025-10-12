// Add this to your existing types file or create a new one

import { Tour as BaseTour } from "@/types";

/**
 * Extended Tour type with currency conversion support
 */
export interface TourWithCurrency extends BaseTour {
  originalPrice: number; // Original USD price from Sanity
  displayPrice: number; // Converted price based on selected currency
}

/**
 * Helper function to extend tour with currency data
 * @param tour - Base tour object
 * @param convertedPrice - Price converted to selected currency
 */
export function addCurrencyToTour(
  tour: BaseTour,
  convertedPrice: number,
): TourWithCurrency {
  return {
    ...tour,
    originalPrice: tour.price,
    displayPrice: convertedPrice,
  };
}

/**
 * Type guard to check if tour has currency data
 */
export function hasCurrencyData(
  tour: BaseTour | TourWithCurrency,
): tour is TourWithCurrency {
  return "displayPrice" in tour && "originalPrice" in tour;
}
