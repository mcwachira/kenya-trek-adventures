// hooks/useToursByCategory.ts

import { useQuery } from "@tanstack/react-query";
import { Tour, TourCategory } from "@/types/";
import { useCurrency } from "@/hooks/useCurrency";

interface UseToursByCategoryOptions {
  category: TourCategory;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}

// Fetch tours by category
const fetchToursByCategory = async (
  category: TourCategory,
  filters?: {
    difficulty?: string;
    minPrice?: number;
    maxPrice?: number;
  },
): Promise<Tour[]> => {
  const params = new URLSearchParams();
  params.append("category", category);
  if (filters?.difficulty) params.append("difficulty", filters.difficulty);
  if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());

  const url = `/api/tour/list${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || `Failed to fetch ${category} tours`);
  }
  return data.tours || [];
};

/**
 * Hook to fetch tours by category with currency conversion
 * @param options - Category and optional filters
 * @returns Tours data, loading state, and error
 */
export const useToursByCategory = ({
  category,
  difficulty,
  minPrice,
  maxPrice,
}: UseToursByCategoryOptions) => {
  const { getConvertedAmount, currency } = useCurrency();

  const {
    data: rawTours = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tours", category, { difficulty, minPrice, maxPrice }, currency],
    queryFn: () =>
      fetchToursByCategory(category, { difficulty, minPrice, maxPrice }),
    enabled: !!category,
  });

  // Add converted prices to tours
  const tours = rawTours.map((tour) => ({
    ...tour,
    originalPrice: tour.price,
    displayPrice: getConvertedAmount(tour.price),
  }));

  return {
    tours,
    isLoading,
    error,
    refetch,
  };
};

/**
 * Specialized hooks for each category
 */

// Mount Kenya tours
export const useMountKenyaTours = (filters?: {
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useToursByCategory({
    category: "mount-kenya",
    ...filters,
  });
};

// Day trip tours
export const useDayTripTours = (filters?: {
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useToursByCategory({
    category: "day-trip",
    ...filters,
  });
};

// Safari tours
export const useSafariTours = (filters?: {
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  return useToursByCategory({
    category: "safaris",
    ...filters,
  });
};
