// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
// import { X } from "lucide-react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {BookingFormData, bookingSchema} from "@/lib/auth";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";

// interface BookingFormProps {
//     onClose: () => void;
//     serviceType?: string;
//     serviceName?: string;
// }

// const BookingForm = ({
//                          onClose,
//                          serviceType = "",
//                          serviceName = "",
//                      }: BookingFormProps) => {
//     const form = useForm<BookingFormData>({
//         resolver: zodResolver(bookingSchema),
//         defaultValues: {
//             name: "",
//             email: "",
//             phone: "",
//             service: serviceName || serviceType,
//             participants: "1",
//             date: "",
//             message: "",
//         },
//     });

//     const onSubmit = (data: BookingFormData) => {
//         const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
//         const newBooking = {
//             id: Date.now(),
//             ...data,
//             status: "pending",
//             createdAt: new Date().toISOString(),
//         };
//         bookings.push(newBooking);
//         localStorage.setItem("bookings", JSON.stringify(bookings));

//         alert("Booking request submitted successfully!");
//         form.reset();
//         onClose();
//     };

//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-green-800">Book Your Adventure</CardTitle>
//                     <Button variant="ghost" size="icon" onClick={onClose}>
//                         <X className="h-4 w-4" />
//                     </Button>
//                 </CardHeader>
//                 <CardContent>
//                     <Form {...form}>
//                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//                             {/* Name */}
//                             <FormField
//                                 control={form.control}
//                                 name="name"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Full Name</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="John Doe" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Email */}
//                             <FormField
//                                 control={form.control}
//                                 name="email"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Email</FormLabel>
//                                         <FormControl>
//                                             <Input type="email" placeholder="you@example.com" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Phone */}
//                             <FormField
//                                 control={form.control}
//                                 name="phone"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Phone</FormLabel>
//                                         <FormControl>
//                                             <Input placeholder="+254 700 000000" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Service */}
//                             <FormField
//                                 control={form.control}
//                                 name="service"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Service</FormLabel>
//                                         <FormControl>
//                                             <Select value={field.value} onValueChange={field.onChange}>
//                                                 <SelectTrigger>
//                                                     <SelectValue placeholder="Select a service" />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     <SelectItem value="Mount Kenya Expedition">
//                                                         Mount Kenya Expedition
//                                                     </SelectItem>
//                                                     <SelectItem value="Maasai Mara Safari">
//                                                         Maasai Mara Safari
//                                                     </SelectItem>
//                                                     <SelectItem value="Amboseli Safari">
//                                                         Amboseli Safari
//                                                     </SelectItem>
//                                                     <SelectItem value="Tsavo Safari">Tsavo Safari</SelectItem>
//                                                     <SelectItem value="Lake Nakuru Safari">
//                                                         Lake Nakuru Safari
//                                                     </SelectItem>
//                                                     <SelectItem value="Hell's Gate Day Trip">
//                                                         Hell&apos;s Gate Day Trip
//                                                     </SelectItem>
//                                                     <SelectItem value="Nairobi National Park">
//                                                         Nairobi National Park
//                                                     </SelectItem>
//                                                     <SelectItem value="Lake Naivasha">
//                                                         Lake Naivasha
//                                                     </SelectItem>
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Participants */}
//                             <FormField
//                                 control={form.control}
//                                 name="participants"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Number of Participants</FormLabel>
//                                         <FormControl>
//                                             <Select value={field.value} onValueChange={field.onChange}>
//                                                 <SelectTrigger>
//                                                     <SelectValue />
//                                                 </SelectTrigger>
//                                                 <SelectContent>
//                                                     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
//                                                         <SelectItem key={num} value={num.toString()}>
//                                                             {num}
//                                                         </SelectItem>
//                                                     ))}
//                                                 </SelectContent>
//                                             </Select>
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Date */}
//                             <FormField
//                                 control={form.control}
//                                 name="date"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Preferred Date</FormLabel>
//                                         <FormControl>
//                                             <Input type="date" {...field} />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             {/* Message */}
//                             <FormField
//                                 control={form.control}
//                                 name="message"
//                                 render={({ field }) => (
//                                     <FormItem>
//                                         <FormLabel>Additional Message</FormLabel>
//                                         <FormControl>
//                                             <Textarea
//                                                 placeholder="Tell us about your preferences, dietary requirements, etc."
//                                                 {...field}
//                                             />
//                                         </FormControl>
//                                         <FormMessage />
//                                     </FormItem>
//                                 )}
//                             />

//                             <Button
//                                 type="submit"
//                                 className="w-full bg-orange-600 hover:bg-orange-700"
//                             >
//                                 Submit Booking Request
//                             </Button>
//                         </form>
//                     </Form>
//                 </CardContent>
//             </Card>
//         </div>
//     );
// };

// export default BookingForm;
//

// components/BookingForm.tsx
"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2, CheckCircle, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { BookingFormData, bookingSchema } from "@/lib/auth";
import { useBookings } from "@/hooks/useBooking";

interface BookingFormProps {
  defaultService?: string;
  onClose: () => void;
}

export default function BookingForm({
  onClose,
  defaultService,
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  // const supabase = createClient();

  const { createBookingAsync } = useBookings();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      service: defaultService || "",
      guests: 1,
    },
  });

  const watchService = watch("service");

  const onSubmit = async (data: BookingFormData) => {
    if (!data.date) {
      toast.error("Please select a date");
      return;
    }

    setIsSubmitting(true);

    try {
      await createBookingAsync({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        service: data.service,
        guests: data.guests,
        date: format(data.date, "yyyy-MM-dd"),
        message: data.message || null,
        status: "pending",
      });

      setIsSuccess(true);
      toast.success("Booking submitted successfully!");
      // form.reset();
      onClose();
      setTimeout(() => {
        reset();
        setSelectedDate(undefined);
        setIsSuccess(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // const onSubmit = async (data: BookingFormData) => {
  //   setIsSubmitting(true);
  //   try {
  //     // Debug: Check current session
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     console.log("Current session:", session ? "Authenticated" : "Anonymous");
  //     console.log("Role:", session?.user?.role || "anon");

  //     // Insert booking into Supabase
  //     const { data: booking, error } = await supabase.from("bookings").insert({
  //       name: data.name,
  //       email: data.email,
  //       phone: data.phone || null,
  //       service: data.service,
  //       guests: data.guests,
  //       date: format(data.date, "yyyy-MM-dd"),
  //       message: data.message || null,
  //       status: "pending",
  //     });
  //     // .select()
  //     // .single();

  //     if (error) {
  //       console.error("Supabase error details:", {
  //         message: error.message,
  //         code: error.code,
  //         details: error.details,
  //         hint: error.hint,
  //       });
  //       throw error;
  //     }

  //     // Send email notification
  //     await fetch("/api/send-booking-email", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(booking),
  //     });

  //     setIsSuccess(true);
  //     toast.success("Booking submitted successfully! We'll contact you soon.");

  //     // Reset form after 3 seconds
  //     setTimeout(() => {
  //       reset();
  //       setSelectedDate(undefined);
  //       setIsSuccess(false);
  //     }, 3000);
  //   } catch (error: any) {
  //     console.error("Error submitting booking:", error);
  //     toast.error("Failed to submit booking. Please try again.");
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  if (isSuccess) {
    return (
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-2">
              Booking Received!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your booking. We'll contact you shortly to confirm
              your adventure.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-green-800">Book Your Adventure</CardTitle>
          <CardDescription>
            Fill out the form below and we'll get back to you within 24 hours
          </CardDescription>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 700 000000"
                  {...register("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests">
                  Number of Guests <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="50"
                  {...register("guests", { valueAsNumber: true })}
                  className={errors.guests ? "border-red-500" : ""}
                />
                {errors.guests && (
                  <p className="text-sm text-red-500">
                    {errors.guests.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="service">
                Select Tour <span className="text-red-500">*</span>
              </Label>
              <Select
                value={watchService}
                onValueChange={(value) => setValue("service", value)}
              >
                <SelectTrigger
                  className={errors.service ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Choose your adventure" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mount Kenya Trek">
                    Mount Kenya Trek
                  </SelectItem>
                  <SelectItem value="Safari Adventure">
                    Safari Adventure
                  </SelectItem>
                  <SelectItem value="Coastal Exploration">
                    Coastal Exploration
                  </SelectItem>
                  <SelectItem value="Cultural Tour">Cultural Tour</SelectItem>
                  <SelectItem value="Wildlife Safari">
                    Wildlife Safari
                  </SelectItem>
                  <SelectItem value="Day Trip">Day Trip</SelectItem>
                </SelectContent>
              </Select>
              {errors.service && (
                <p className="text-sm text-red-500">{errors.service.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Preferred Date <span className="text-red-500">*</span>
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground",
                      errors.date && "border-red-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      if (date) setValue("date", date);
                    }}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {errors.date && (
                <p className="text-sm text-red-500">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Special Requests (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Tell us about any special requirements or questions..."
                rows={4}
                {...register("message")}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Booking"
              )}
            </Button>

            <p className="text-xs text-center text-gray-500 dark:text-gray-400">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
