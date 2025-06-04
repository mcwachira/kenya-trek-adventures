import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Tour {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  difficulty: "Easy" | "Moderate" | "Challenging";
  image: string;
  category: "mount-kenya" | "safari" | "day-trip";
  highlights: string[];
  included: string[];
  location: string;
  maxParticipants: number;
  status: "active" | "inactive";
  createdAt: string;
}

const TOURS_STORAGE_KEY = "tours_data";

const getInitialTours = (): Tour[] => {
  const stored = localStorage.getItem(TOURS_STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }

  // Default data
  const defaultTours: Tour[] = [
    {
      id: 1,
      title: "Sirimon-Chogoria Route",
      description:
        "The most scenic route combining the best of both Sirimon and Chogoria paths",
      duration: "5 Days",
      difficulty: "Moderate",
      price: "$850",
      image:
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "mount-kenya",
      highlights: ["Point Lenana Summit", "Alpine Lakes", "Unique Vegetation"],
      included: [
        "Professional guide",
        "All meals",
        "Park fees",
        "Accommodation",
      ],
      location: "Mount Kenya National Park",
      maxParticipants: 8,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Maasai Mara Safari",
      description:
        "Experience the Great Migration and Big Five in Kenya's most famous park",
      duration: "3-7 Days",
      difficulty: "Easy",
      price: "From $450/day",
      image:
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "safari",
      highlights: [
        "Great Migration",
        "Big Five",
        "Maasai Culture",
        "Hot Air Balloons",
      ],
      included: [
        "Game drives",
        "Professional guide",
        "All meals",
        "Accommodation",
      ],
      location: "Maasai Mara National Reserve",
      maxParticipants: 6,
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: 3,
      title: "Hell's Gate National Park",
      description:
        "Unique park where you can walk, cycle and rock climb among wildlife",
      duration: "Full Day",
      difficulty: "Easy",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      category: "day-trip",
      highlights: [
        "Rock Climbing",
        "Cycling",
        "Gorge Walking",
        "Wildlife Viewing",
      ],
      included: ["Transport", "Guide", "Equipment", "Lunch"],
      location: "Hell's Gate National Park",
      maxParticipants: 12,
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];

  localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(defaultTours));
  return defaultTours;
};

export const useToursData = () => {
  const queryClient = useQueryClient();

  const {
    data: tours = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tours"],
    queryFn: () => getInitialTours(),
  });

  const addTourMutation = useMutation({
    mutationFn: (newTour: Omit<Tour, "id" | "createdAt">) => {
      const tours = getInitialTours();
      const tour: Tour = {
        ...newTour,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      };
      const updatedTours = [...tours, tour];
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      return Promise.resolve(tour);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });

  const updateTourMutation = useMutation({
    mutationFn: (updatedTour: Tour) => {
      const tours = getInitialTours();
      const updatedTours = tours.map((tour) =>
        tour.id === updatedTour.id ? updatedTour : tour,
      );
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      return Promise.resolve(updatedTour);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
    },
  });

  const deleteTourMutation = useMutation({
    mutationFn: (tourId: number) => {
      const tours = getInitialTours();
      const updatedTours = tours.filter((tour) => tour.id !== tourId);
      localStorage.setItem(TOURS_STORAGE_KEY, JSON.stringify(updatedTours));
      return Promise.resolve(tourId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tours"] });
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

export const useToursByCategory = (
  category: "mount-kenya" | "safari" | "day-trip",
) => {
  const { tours, isLoading, error } = useToursData();

  const filteredTours = tours.filter(
    (tour) => tour.category === category && tour.status === "active",
  );

  return {
    tours: filteredTours,
    isLoading,
    error,
  };
};
