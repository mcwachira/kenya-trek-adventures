"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Plus, Users, X } from "lucide-react";

interface BookingCalendarProps {
  onClose: () => void;
}

const BookingCalendar = ({ onClose }: BookingCalendarProps) => {
  const [selectedExpedition, setSelectedExpedition] = useState("");
  const [groupSize, setGroupSize] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [addOns, setAddOns] = useState<string[]>([]);

  const expeditions = [
    {
      id: "mount-kenya-sirimon",
      name: "Mount Kenya - Sirimon Route",
      price: 450,
      days: 4,
    },
    {
      id: "mount-kenya-chogoria",
      name: "Mount Kenya - Chogoria Route",
      price: 580,
      days: 5,
    },
    {
      id: "maasai-mara-safari",
      name: "Maasai Mara Safari",
      price: 320,
      days: 3,
    },
    {
      id: "amboseli-safari",
      name: "Amboseli National Park",
      price: 280,
      days: 2,
    },
  ];

  const expedition = expeditions.find((e) => e.id === selectedExpedition);

  const addOnOptions = [
    { id: "porter", name: "Personal Porter", price: 25 },
    { id: "gear-rental", name: "Gear Rental Package", price: 35 },
    { id: "private-room", name: "Private Accommodation", price: 50 },
    { id: "airport-transfer", name: "Airport Transfer", price: 40 },
  ];

  const calculateTotal = () => {
    const expedition = expeditions.find((e) => e.id === selectedExpedition);
    if (!expedition) return 0;

    const basePrice = expedition.price * groupSize;
    const addOnTotal = addOns.reduce((total, addOnId) => {
      const addOn = addOnOptions.find((a) => a.id === addOnId);
      return total + (addOn ? addOn.price * groupSize : 0);
    }, 0);

    return basePrice + addOnTotal;
  };
  const toggleAddOn = (addOnId: string) => {
    setAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId],
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-green-800">
            Book Your Adventure
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Expedition Selection */}
          <div className="space-y-2">
            <Label htmlFor="expedition">Choose Your Expedition</Label>
            <Select
              value={selectedExpedition}
              onValueChange={setSelectedExpedition}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an expedition" />
              </SelectTrigger>
              <SelectContent>
                {expeditions.map((expedition) => (
                  <SelectItem key={expedition.id} value={expedition.id}>
                    {expedition.name} - {expedition.days} days ($
                    {expedition.price})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Preferred Start Date</Label>
            <div className="relative">
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-10"
                min={new Date().toISOString().split("T")[0]}
              />
              <Calendar
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
            </div>
          </div>

          {/* Group Size */}
          <div className="space-y-2">
            <Label htmlFor="group-size">Group Size</Label>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                disabled={groupSize <= 1}
              >
                -
              </Button>
              <div className="flex items-center space-x-2">
                <Users size={18} className="text-gray-500" />
                <span className="font-semibold w-8 text-center">
                  {groupSize}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGroupSize(Math.min(12, groupSize + 1))}
                disabled={groupSize >= 12}
              >
                <Plus size={16} />
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Maximum 12 people per expedition
            </p>
          </div>

          {/* Add-ons */}
          <div className="space-y-3">
            <Label>Optional Add-ons</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addOnOptions.map((addOn) => (
                <div
                  key={addOn.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    addOns.includes(addOn.id)
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => toggleAddOn(addOn.id)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm">{addOn.name}</span>
                    <span className="text-orange-600 font-semibold text-sm">
                      +${addOn.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Your full name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+254 xxx xxx xxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Your country" />
            </div>
          </div>

          {/* Pricing Summary */}
          {selectedExpedition && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-3">
                Booking Summary
              </h3>
              <div className="space-y-2 text-sm">
                {expedition && (
                  <div className="flex justify-between">
                    <span>Expedition ({groupSize} people)</span>
                    <span>${expedition.price * groupSize}</span>
                  </div>
                )}
                {addOns.map((addOnId) => {
                  const addOn = addOnOptions.find((a) => a.id === addOnId);
                  return addOn ? (
                    <div key={addOnId} className="flex justify-between">
                      <span>
                        {addOn.name} ({groupSize} people)
                      </span>
                      <span>+${addOn.price * groupSize}</span>
                    </div>
                  ) : null;
                })}
                <div className="border-t pt-2 flex justify-between font-bold text-lg text-green-800">
                  <span>Total</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
              disabled={!selectedExpedition || !selectedDate}
            >
              Proceed to Payment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingCalendar;
