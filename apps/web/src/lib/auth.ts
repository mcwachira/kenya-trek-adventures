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
  category: z
    .enum(["mount-kenya", "day-trip", "safaris"], {
      message: "Invalid category",
    })
    .or(z.undefined())
    .refine((val) => val !== undefined, {
      message: "Please select a category",
    }),
  description: z.string().min(10, "Description must be at least 10 characters"),
  duration: z.number().min(1, "Duration must be at least 1 day"),
  price: z.number().min(0, "Price must be positive"),
  difficulty: z.enum(["Easy", "Moderate", "Challenging"]),
  location: z.string().min(2, "Location is required"),
  elevation: z.string().optional(),
  route: z.string().optional(),
  highlights: z.string().optional(),
  included: z.string().optional(),
  excluded: z.string().optional(),
});

export const companySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.email({ pattern: z.regexes.html5Email }),
  phone: z.string().min(10, "Phone number is required"),
});

export const regionalSchema = z.object({
  currency: z.string().min(1, "Please select a currency"),
  timezone: z.string().min(1, "Please select a timezone"),
});

export const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  author: z.string().optional(), // This will be the author _id
  tags: z.string().optional(),
  status: z.enum(["draft", "published", "scheduled"]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type TourFormValues = z.infer<typeof tourSchema>;
export type CompanyFormValues = z.infer<typeof companySchema>;
export type RegionalFormValues = z.infer<typeof regionalSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type BookingFormData = z.infer<typeof bookingSchema>;
export type BlogFormValues = z.infer<typeof blogSchema>;
