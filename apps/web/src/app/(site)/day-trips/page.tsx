"use client";

import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MapPin, Users, Camera } from "lucide-react";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { useToursByCategory } from "@/hooks/useToursByCategory";

const DayTrips = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState("");

  const { tours, isLoading, error } = useToursByCategory({
    category: "day-trip",
  });

  const handleBookTrip = (tripName: string) => {
    setSelectedTrip(tripName);
    setShowBooking(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kenya Day{" "}
              <span className="block text-orange-400">Adventures</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Perfect for short visits and family adventures. Explore
              Kenya&apos;s wonders in a single day.
            </p>
            <Button
              size="lg"
              className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowBooking(true)}
            >
              Book Day Trip
            </Button>
          </div>
        </section>

        {/* Day Trips Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
              Choose Your Adventure
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              From wildlife encounters to cultural experiences, perfect for all
              ages
            </p>
          </div>

          {/* Loading & Error */}
          {isLoading && (
            <p className="text-center text-gray-500">Loading day trips...</p>
          )}
          {error && (
            <p className="text-center text-red-500">
              Failed to load tours:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          )}

          {/* Tours Grid */}
          {!isLoading && !error && tours.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((trip: any, index: number) => (
                <Card
                  key={trip._id}
                  className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl"
                >
                  {/* Tour Image */}
                  {trip.imageUrl ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={trip.imageUrl}
                        alt={trip.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        ${trip.price}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <MapPin className="h-10 w-10 text-gray-400" />
                    </div>
                  )}

                  {/* Tour Info */}
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-400">
                      {trip.title}
                    </CardTitle>
                    <CardDescription>{trip.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {trip.duration} days
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {trip.route || "Kenya"}
                        </span>
                      </div>

                      {trip.highlights?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                            Highlights:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {trip.highlights.map(
                              (highlight: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs"
                                >
                                  {highlight}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      <Button
                        className="cursor-pointer w-full bg-green-700 hover:bg-green-800 text-white"
                        onClick={() => handleBookTrip(trip.title)}
                      >
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !error && tours.length === 0 && (
            <p className="text-center text-gray-500 mt-6">
              No day trips available at the moment.
            </p>
          )}
        </section>

        {/* Why Choose Day Trips */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-800 rounded-2xl my-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
              Perfect for Everyone
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Our day trips are designed for all ages and fitness levels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Family Friendly
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Safe activities suitable for children and seniors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Flexible Timing
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Half-day and full-day options available
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Photo Opportunities
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Stunning landscapes and wildlife encounters
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Easy Access
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Close to Nairobi with comfortable transport
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Form Modal */}
      {showBooking && (
        <BookingForm
          onClose={() => setShowBooking(false)}
          // serviceName={selectedTrip || "Kenya Day Trip"}
        />
      )}
    </>
  );
};

export default DayTrips;
