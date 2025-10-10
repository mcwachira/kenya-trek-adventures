// hooks/useAuth.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const supabase = createClient();

interface SignUpData {
  email: string;
  password: string;
  fullName: string;
}

interface SignInData {
  email: string;
  password: string;
}

export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Get current user
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw error;

      if (user) {
        // Fetch admin user details
        const { data: adminUser } = await supabase
          .from("admin_users")
          .select("*")
          .eq("id", user.id)
          .single();

        return { ...user, adminDetails: adminUser };
      }

      return null;
    },
    retry: false,
  });

  // Sign up mutation
  const signUp = useMutation({
    mutationFn: async ({ email, password, fullName }: SignUpData) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success(
        "Account created successfully! Please check your email to verify your account.",
      );
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("Sign up error:", error);
      toast.error(error.message || "Failed to create account");
    },
  });

  // Sign in mutation
  const signIn = useMutation({
    mutationFn: async ({ email, password }: SignInData) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Welcome back!");
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error("Sign in error:", error);
      toast.error(error.message || "Invalid email or password");
    },
  });

  // Sign out mutation
  const signOut = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.clear();
      toast.success("Signed out successfully");
      router.push("/auth/login");
    },
    onError: (error: any) => {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    },
  });

  // Reset password
  const resetPassword = useMutation({
    mutationFn: async (email: string) => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Password reset email sent! Check your inbox.");
    },
    onError: (error: any) => {
      console.error("Reset password error:", error);
      toast.error("Failed to send reset email");
    },
  });

  return {
    user,
    isLoadingUser,
    signUp: signUp.mutate,
    signUpAsync: signUp.mutateAsync,
    isSigningUp: signUp.isPending,
    signIn: signIn.mutate,
    signInAsync: signIn.mutateAsync,
    isSigningIn: signIn.isPending,
    signOut: signOut.mutate,
    isSigningOut: signOut.isPending,
    resetPassword: resetPassword.mutate,
    isResettingPassword: resetPassword.isPending,
  };
}
