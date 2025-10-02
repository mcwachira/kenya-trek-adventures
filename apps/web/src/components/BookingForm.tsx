"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {BookingFormData, bookingSchema} from "@/lib/auth";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";


interface BookingFormProps {
    onClose: () => void;
    serviceType?: string;
    serviceName?: string;
}

const BookingForm = ({
                         onClose,
                         serviceType = "",
                         serviceName = "",
                     }: BookingFormProps) => {
    const form = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            service: serviceName || serviceType,
            participants: "1",
            date: "",
            message: "",
        },
    });


    const onSubmit = (data: BookingFormData) => {
        const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        const newBooking = {
            id: Date.now(),
            ...data,
            status: "pending",
            createdAt: new Date().toISOString(),
        };
        bookings.push(newBooking);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        alert("Booking request submitted successfully!");
        form.reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-green-800">Book Your Adventure</CardTitle>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Name */}
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Full Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Email */}
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="you@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Phone */}
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input placeholder="+254 700 000000" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Service */}
                            <FormField
                                control={form.control}
                                name="service"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Service</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Mount Kenya Expedition">
                                                        Mount Kenya Expedition
                                                    </SelectItem>
                                                    <SelectItem value="Maasai Mara Safari">
                                                        Maasai Mara Safari
                                                    </SelectItem>
                                                    <SelectItem value="Amboseli Safari">
                                                        Amboseli Safari
                                                    </SelectItem>
                                                    <SelectItem value="Tsavo Safari">Tsavo Safari</SelectItem>
                                                    <SelectItem value="Lake Nakuru Safari">
                                                        Lake Nakuru Safari
                                                    </SelectItem>
                                                    <SelectItem value="Hell's Gate Day Trip">
                                                        Hell&apos;s Gate Day Trip
                                                    </SelectItem>
                                                    <SelectItem value="Nairobi National Park">
                                                        Nairobi National Park
                                                    </SelectItem>
                                                    <SelectItem value="Lake Naivasha">
                                                        Lake Naivasha
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Participants */}
                            <FormField
                                control={form.control}
                                name="participants"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Number of Participants</FormLabel>
                                        <FormControl>
                                            <Select value={field.value} onValueChange={field.onChange}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                        <SelectItem key={num} value={num.toString()}>
                                                            {num}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Date */}
                            <FormField
                                control={form.control}
                                name="date"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Preferred Date</FormLabel>
                                        <FormControl>
                                            <Input type="date" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Message */}
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Additional Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us about your preferences, dietary requirements, etc."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                className="w-full bg-orange-600 hover:bg-orange-700"
                            >
                                Submit Booking Request
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default BookingForm;