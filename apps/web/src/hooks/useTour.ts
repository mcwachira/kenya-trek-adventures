// hooks/useTour.ts
import { useQuery } from "@tanstack/react-query";
import { Tour } from "@/types";

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
  return useQuery({
    queryKey: ["tour", id],
    queryFn: () => fetchTour(id!),
    enabled: !!id, // Only run if id is provided
  });
};

// Hook to fetch related tours
export const useRelatedTours = (
  tourId: string | undefined,
  difficulty?: string,
  limit: number = 3,
) => {
  return useQuery({
    queryKey: ["related-tours", tourId, difficulty, limit],
    queryFn: () => fetchRelatedTours(tourId!, difficulty, limit),
    enabled: !!tourId, // Only run if tourId is provided
  });
};
