import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Tour, TourCategory, TourFormData } from "@/types/";
import { toast } from "sonner";
import { useCurrency } from "@/hooks/useCurrency";

//Helper function to convert file to base64

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

//Fetch all tours
const fetchTours = async (filters?: {
  category?: TourCategory;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Tour[]> => {
  const params = new URLSearchParams();
  if (filters?.category) params.append("category", filters.category);
  if (filters?.difficulty) params.append("difficulty", filters.difficulty);
  if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
  if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());

  const url = `/api/tour/list${params.toString() ? `?${params.toString()}` : ""}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch tours");
  }
  return data.tours || [];
};

//Create a new tour

const createTour = async (tourData: TourFormData): Promise<Tour> => {
  const payload: any = { ...tourData };
  // Handle image upload
  if (tourData.image && tourData.image instanceof File) {
    const base64 = await fileToBase64(tourData.image);
    payload.imageBase64 = base64;
    payload.imageName = tourData.image.name;
    payload.imageAlt = tourData.title;
    delete payload.image;
  }

  const response = await fetch("/api/tour/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to create tour");
  }
  return data.tour;
};

// Update a tour
const updateTour = async (
  tourData: Tour & Partial<TourFormData>,
): Promise<Tour> => {
  const payload: any = { ...tourData };

  // Handle image upload
  if (tourData.image && tourData.image instanceof File) {
    const base64 = await fileToBase64(tourData.image);
    payload.imageBase64 = base64;
    payload.imageName = tourData.image.name;
    payload.imageAlt = tourData.title;
    delete payload.image;
  }

  const response = await fetch("/api/tour/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to update tour");
  }
  return data.tour;
};

// Delete a tour
const deleteTour = async (tourId: string): Promise<void> => {
  const url = `/api/tour/delete?_id=${encodeURIComponent(tourId)}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || "Failed to delete tour");
  }
};

export const useToursData = (filters?: {
  category?: TourCategory;
  difficulty?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  const queryClient = useQueryClient();
  const { getConvertedAmount, currency } = useCurrency();

  // Fetch tours with currency conversion
  const {
    data: rawTours = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours", filters, currency], // Include currency in query key for auto-refresh
    queryFn: () => fetchTours(filters),
  });

  // Add converted prices to tours
  const tours = rawTours.map((tour) => ({
    ...tour,
    originalPrice: tour.price, // Keep original USD price
    displayPrice: getConvertedAmount(tour.price), // Converted price
  }));

  // Create tour mutation
  const addTourMutation = useMutation({
    mutationFn: createTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("Tour created successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create tour");
    },
  });

  // Update tour mutation
  const updateTourMutation = useMutation({
    mutationFn: updateTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      queryClient.invalidateQueries({ queryKey: ["tour"] });
      toast.success("Tour updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update tour");
    },
  });

  // Delete tour mutation
  const deleteTourMutation = useMutation({
    mutationFn: deleteTour,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
      toast.success("Tour deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete tour");
    },
  });

  return {
    tours,
    isLoading,
    error,
    addTour: addTourMutation.mutate,
    updateTour: updateTourMutation.mutate,
    deleteTour: deleteTourMutation.mutate,
    isAddingTour: addTourMutation.isPending,
    isUpdatingTour: updateTourMutation.isPending,
    isDeletingTour: deleteTourMutation.isPending,
  };
};
