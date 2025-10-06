"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { supabase } from "@/integrations/supabase/client";
// import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address").max(255, "Email must be less than 255 characters"),
    phone: z.string().optional(),
    subject: z.string().min(1, "Please select a subject"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message must be less than 1000 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
    // const { user } = useAuth();

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
        },
    });

    // const handleSubmit = async (values: ContactFormValues) => {
    //     try {
    //         const { error } = await (supabase as any)
    //             .from('contact_messages')
    //             .insert({
    //                 user_id: user?.id || null,
    //                 name: values.name,
    //                 email: values.email,
    //                 phone: values.phone || null,
    //                 subject: values.subject,
    //                 message: values.message,
    //             });
    //
    //         if (error) {
    //             console.error('Error saving contact message:', error);
    //             toast.error('Failed to send message. Please try again.');
    //         } else {
    //             toast.success('Message sent successfully! We\'ll get back to you soon.');
    //             form.reset();
    //         }
    //     } catch (err) {
    //         console.error('Unexpected error:', err);
    //         toast.error('An unexpected error occurred. Please try again.');
    //     }
    // };

    const handleSubmit = async (values: ContactFormValues) => {
            try {
               console.log(values);
            } catch (err) {
                console.error('Unexpected error:', err);
                toast.error('An unexpected error occurred. Please try again.');
            }
    }


    return (
        <Card className="w-full max-w-lg">
            <CardHeader>
                <CardTitle className="text-green-800">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone (Optional)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a subject" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                                            <SelectItem value="Booking Question">Booking Question</SelectItem>
                                            <SelectItem value="Mount Kenya Expedition">Mount Kenya Expedition</SelectItem>
                                            <SelectItem value="Safari Tours">Safari Tours</SelectItem>
                                            <SelectItem value="Day Trips">Day Trips</SelectItem>
                                            <SelectItem value="Custom Adventure">Custom Adventure</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full bg-green-700 hover:bg-green-800"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Send Message'
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
};

export default ContactForm;
