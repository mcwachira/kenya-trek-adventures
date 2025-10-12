// hooks/useTour.ts
import { useQuery } from "@tanstack/react-query";
import { Tour } from "@/types";
import { useCurrency } from "@/hooks/useCurrency";

// Fetch single tour by ID or slug
const fetchTour = async (id: string): Promise<Tour> => {
  const response = await fetch(`/api/tour/${id}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch tour");
  }
  return data.tour;
};

// Fetch related tours
const fetchRelatedTours = async (
  tourId: string,
  difficulty?: string,
  limit: number = 3,
): Promise<Tour[]> => {
  const params = new URLSearchParams({
    tourId,
    limit: limit.toString(),
  });

  if (difficulty) {
    params.append("difficulty", difficulty);
  }

  const response = await fetch(`/api/tours/related?${params.toString()}`);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch related tours");
  }
  return data.tours || [];
};

// Hook to fetch a single tour
export const useTour = (id: string | undefined) => {
  const { getConvertedAmount, currency } = useCurrency();

  return useQuery({
    queryKey: ["tour", id, currency],
    queryFn: async () => {
      const tour = await fetchTour(id!);
      return {
        ...tour,
        originalPrice: tour.price,
        displayPrice: getConvertedAmount(tour.price),
      };
    },
    enabled: !!id,
  });
};

// Hook to fetch related tours with currency conversion
export const useRelatedTours = (
  tourId: string | undefined,
  difficulty?: string,
  limit: number = 3,
) => {
  const { getConvertedAmount, currency } = useCurrency();

  return useQuery({
    queryKey: ["related-tours", tourId, difficulty, limit, currency],
    queryFn: async () => {
      const tours = await fetchRelatedTours(tourId!, difficulty, limit);
      return tours.map((tour) => ({
        ...tour,
        originalPrice: tour.price,
        displayPrice: getConvertedAmount(tour.price),
      }));
    },
    enabled: !!tourId,
  });
};
