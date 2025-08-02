"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { X } from "lucide-react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: serviceName || serviceType,
    participants: "1",
    date: "",
    message: "",
  });

  //handle submit form

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Store booking in localStorage (temporary solution)
    const bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      ...formData,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Booking request submitted successfully!");
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="service">Service</Label>
              <Select
                value={formData.service}
                onValueChange={(value) =>
                  setFormData({ ...formData, service: value })
                }
              >
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
                  <SelectItem value="Lake Naivasha">Lake Naivasha</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="participants">Number of Participants</Label>
              <Select
                value={formData.participants}
                onValueChange={(value) =>
                  setFormData({ ...formData, participants: value })
                }
              >
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
            </div>

            <div>
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us about your preferences, dietary requirements, etc."
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Submit Booking Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;
