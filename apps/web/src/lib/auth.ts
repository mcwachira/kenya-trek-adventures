import * as z from "zod";

export const bookingSchema = z.object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.email({ pattern: z.regexes.html5Email }),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number is too long"),
    service: z.string().min(1, "Please select a service"),
    participants: z.string().min(1, "Please select number of participants"),
    date: z.string().min(1, "Please select a date"),
    message: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.html5Email }),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z
    .object({
        name: z
            .string()
            .min(1, "  Name is required")
            .min(3, "Name must be atleast 3 characters long")
            .max(50, "Name must be less than 50 characters"),

        // lastName: z
        //   .string()
        //   .min(1, "Last Name is required")
        //   .min(3, "Name must be atleast 3 characters long")
        //   .max(50, "Name must be less than 50 characters"),

        email: z.email({ pattern: z.regexes.html5Email }),

        password: z
            .string()
            .min(1, "Password is required")
            .min(6, "Password must be at least 8 characters long")
            .max(100, "Password must be less than than 100 characters"),

        confirmPassword: z.string().min(1, "please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    })

export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;

