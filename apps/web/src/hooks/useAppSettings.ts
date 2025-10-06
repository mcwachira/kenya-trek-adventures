import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {toast} from "sonner";

export interface AppSettings {
    id: string;
    key: string;
    value: any;
    updated_by: string | null;
    created_at: string;
    updated_at: string;
}



export function useAppSettings() {

    const queryClient = useQueryClient();

    const { data: settings = [], isLoading, error } = useQuery({
        queryKey: ['app-settings'],
        // queryFn: async () => {
        //     const { data, error } = await supabase
        //         .from('app_settings')
        //         .select('*');
        //
        //     if (error) throw error;
        //     return data as AppSetting[];
        // },
    });

    const updateSettingMutation = useMutation({
        // mutationFn: async ({ key, value }: { key: string; value: any }) => {
        //     const { data: { user } } = await supabase.auth.getUser();
        //
        //     const { data, error } = await supabase
        //         .from('app_settings')
        //         .upsert({
        //             key,
        //             value,
        //             updated_by: user?.id,
        //         })
        //         .eq('key', key)
        //         .select()
        //         .single();
        //
        //     if (error) throw error;
        //     return data;
        // },
        // onSuccess: () => {
        //     queryClient.invalidateQueries({ queryKey: ['app-settings'] });
        //     toast({ title: 'Success', description: 'Settings updated successfully' });
        // },
        // onError: (error: any) => {
        //     toast({
        //         title: 'Error',
        //         description: error.message || 'Failed to update settings',
        //         variant: 'destructive'
        //     });
        // },
    });

    const getSetting = (key: string) => {
        return settings.find(s => s.key === key)?.value;
    };

    return {
        settings,
        isLoading,
        error,
        updateSetting: updateSettingMutation.mutate,
        isUpdating: updateSettingMutation.isPending,
        getSetting,
    };
}
