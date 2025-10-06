import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Booking {
    id: string;
    user_id: string;
    name: string;
    email: string;
    phone: string | null;
    service: string;
    date: string;
    guests: number;
    status: string;
    payment_status: string;
    special_requests: string | null;
    created_at: string;
    updated_at: string;
}


export function useBookings() {

    const queryClient = useQueryClient();

    const { data: bookings = [], isLoading, error } = useQuery({
        queryKey: ['admin-bookings'],
        // queryFn: async () => {
        //     const { data, error } = await supabase
        //         .from('tour_bookings')
        //         .select('*')
        //         .order('created_at', { ascending: false });
        //
        //     if (error) throw error;
        //     return data as Booking[];
        // },
    });

    const updateStatusMutation = useMutation({
        // mutationFn: async ({ id, status }: { id: string; status: string }) => {
        //     const { error } = await supabase
        //         .from('tour_bookings')
        //         .update({ status })
        //         .eq('id', id);
        //
        //     if (error) throw error;
        // },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        //     toast({ title: 'Success', description: 'Booking status updated' });
        // },
        // onError: (error: any) => {
        //     toast({
        //         title: 'Error',
        //         description: error.message || 'Failed to update booking',
        //         variant: 'destructive'
        //     });
        // },
    });

    const deleteBookingMutation = useMutation({
        // mutationFn: async (id: string) => {
        //     const { error } = await supabase
        //         .from('tour_bookings')
        //         .delete()
        //         .eq('id', id);
        //
        //     if (error) throw error;
        // },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['admin-bookings'] });
        //     toast({ title: 'Success', description: 'Booking deleted successfully' });
        // },
        // onError: (error: any) => {
        //     toast({
        //         title: 'Error',
        //         description: error.message || 'Failed to delete booking',
        //         variant: 'destructive'
        //     });
        // },
    });

    return {
        bookings,
        isLoading,
        error,
        updateStatus: updateStatusMutation.mutate,
        deleteBooking: deleteBookingMutation.mutate,
    };
}


