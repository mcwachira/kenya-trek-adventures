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
  });

export const tourSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  duration: z.string().min(1, "Duration is required"),
  price: z.string().min(1, "Price is required"),
  difficulty: z.enum(["Easy", "Moderate", "Challenging"]),
  category: z.enum(["mount-kenya", "safari", "day-trip"]),
  location: z.string().min(2, "Location is required"),
  maxParticipants: z.number().min(1, "Must have at least 1 participant"),
  status: z.enum(["active", "inactive"]),
  highlights: z.string().min(5, "Add at least one highlight"),
  included: z.string().min(5, "Add at least one included item"),
});

export const companySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
});

export const regionalSchema = z.object({
  currency: z.string().min(1, "Please select a currency"),
  timezone: z.string().min(1, "Please select a timezone"),
});

export const blogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  author_name: z.string().min(2, "Author name is required"),
  tags: z.string().min(2, "Add at least one tag"),
  status: z.enum(["draft", "published", "scheduled"]),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
});

export type TourFormValues = z.infer<typeof tourSchema>;
export type CompanyFormValues = z.infer<typeof companySchema>;
export type RegionalFormValues = z.infer<typeof regionalSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type BlogFormValues = z.infer<typeof blogSchema>;
