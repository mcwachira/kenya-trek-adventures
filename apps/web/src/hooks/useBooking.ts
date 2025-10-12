// hooks/useBooking.ts
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

import { toast } from "sonner";
import { Database } from "@/types";

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];
export type BookingInsert = Database["public"]["Tables"]["bookings"]["Insert"];
export type BookingUpdate = Database["public"]["Tables"]["bookings"]["Update"];

const supabase = createClient();

// Fetch all bookings
export function useBookings() {
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Booking[];
    },
  });

  // Create booking mutation
  const createBooking = useMutation({
    mutationFn: async (booking: BookingInsert) => {
      const { data, error } = await supabase.from("bookings").insert(booking);
      // .select()
      // .single();

      if (error) throw error;

      // Send email notification (don't wait for it)
      fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }).catch((err) => console.error("Email notification failed:", err));

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully!");
    },
    onError: (error) => {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    },
  });

  // Update booking status
  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking status updated!");
    },
    onError: (error) => {
      console.error("Error updating booking:", error);
      toast.error("Failed to update booking status.");
    },
  });

  // Delete booking
  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting booking:", error);
      toast.error("Failed to delete booking.");
    },
  });

  return {
    bookings,
    isLoading,
    error,
    createBooking: createBooking.mutate,
    createBookingAsync: createBooking.mutateAsync,
    updateStatus: updateStatus.mutate,
    updateStatusAsync: updateStatus.mutateAsync,
    deleteBooking: deleteBooking.mutate,
    deleteBookingAsync: deleteBooking.mutateAsync,
  };
}

// Fetch booking statistics
export function useBookingStats() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["booking-stats"],
    queryFn: async () => {
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select("*");

      if (error) throw error;

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();

      const thisMonthBookings = bookings.filter((booking) => {
        const bookingDate = new Date(booking.created_at);
        return (
          bookingDate.getMonth() === currentMonth &&
          bookingDate.getFullYear() === currentYear
        );
      });

      const confirmedBookings = bookings.filter(
        (b) => b.status === "confirmed",
      );
      const pendingBookings = bookings.filter((b) => b.status === "pending");
      const cancelledBookings = bookings.filter(
        (b) => b.status === "cancelled",
      );

      const totalRevenue = confirmedBookings.length * 1500;

      const upcomingTrips = confirmedBookings.filter(
        (booking) => new Date(booking.date) > new Date(),
      );

      const popularTours = bookings.reduce(
        (acc: Record<string, number>, booking) => {
          acc[booking.service] = (acc[booking.service] || 0) + 1;
          return acc;
        },
        {},
      );

      const topTour = Object.entries(popularTours).sort(
        ([, a], [, b]) => (b as number) - (a as number),
      )[0];

      return {
        totalBookings: bookings.length,
        thisMonthBookings: thisMonthBookings.length,
        confirmedCount: confirmedBookings.length,
        pendingCount: pendingBookings.length,
        cancelledCount: cancelledBookings.length,
        totalRevenue,
        upcomingTripsCount: upcomingTrips.length,
        topTour,
        popularTours,
      };
    },
  });

  return { stats, isLoading };
}

// Fetch contacts
export function useContacts() {
  const queryClient = useQueryClient();

  const { data: contacts = [], isLoading } = useQuery({
    queryKey: ["contacts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contacts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const deleteContact = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contacts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
      toast.success("Contact deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting contact:", error);
      toast.error("Failed to delete contact.");
    },
  });

  return {
    contacts,
    isLoading,
    deleteContact: deleteContact.mutate,
  };
}
