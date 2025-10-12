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
import {
  Binoculars,
  MapPin,
  Calendar,
  Camera,
  Users,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { useToursByCategory } from "@/hooks/useToursByCategory";
import { useCurrency } from "@/hooks/useCurrency";

const Safaris = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSafari, setSelectedSafari] = useState("");

  const { tours, isLoading, error } = useToursByCategory({
    category: "safaris",
  });

  const { formatPrice, currency, currencySymbol } = useCurrency();

  const handleBookSafari = (safariName: string) => {
    setSelectedSafari(safariName);
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
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
              url('https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Kenya Wildlife{" "}
              <span className="block text-orange-400">Safaris</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Witness the Big Five and experience the Great Migration in
              Kenya&apos;s world-famous national parks.
            </p>
            <Button
              size="lg"
              className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowBooking(true)}
            >
              Plan Your Safari
            </Button>
          </div>
        </section>

        {/* Safari Destinations */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
              Safari Destinations
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose from Kenya&apos;s most breathtaking wildlife destinations.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Prices shown in {currency.toUpperCase()} ({currencySymbol})
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-green-600" />
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">
                Failed to load safaris:{" "}
                {error instanceof Error ? error.message : "Unknown error"}
              </p>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          )}

          {/* Safaris Grid */}
          {!isLoading && !error && tours.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tours.map((tour: any, index: number) => (
                <Card
                  key={tour._id || index}
                  className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow rounded-2xl"
                >
                  {/* Safari Image */}
                  {tour.imageUrl ? (
                    <div className="relative w-full aspect-video">
                      <Image
                        src={tour.imageUrl}
                        alt={tour.title || "Safari"}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {formatPrice(tour.price)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full aspect-video bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                      <Binoculars className="h-10 w-10 text-white" />
                    </div>
                  )}

                  {/* Safari Info */}
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-400">
                      {tour.title}
                    </CardTitle>
                    <CardDescription>
                      {tour.location || "Kenya National Park"}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                        <span className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {tour.duration || "Flexible"} days
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {tour.route || "Kenya"}
                        </span>
                      </div>

                      {tour.highlights?.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                            Highlights:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {tour.highlights
                              .slice(0, 3)
                              .map((highlight: string, i: number) => (
                                <span
                                  key={i}
                                  className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs"
                                >
                                  {highlight}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Link href={`/tours/${tour._id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          className="flex-1 cursor-pointer bg-green-700 hover:bg-green-800 text-white"
                          onClick={() => handleBookSafari(tour.title)}
                        >
                          Book Safari
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && tours.length === 0 && (
            <div className="text-center py-12">
              <Binoculars className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No safaris available at the moment.
              </p>
            </div>
          )}
        </section>

        {/* Why Choose Safaris */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-800 rounded-2xl my-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
              Why Choose Our Safaris
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experience the wild like never before — adventure, comfort, and
              unforgettable memories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Binoculars className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Big Five Experience
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Spot lions, elephants, rhinos, leopards, and buffaloes in their
                natural habitats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Stunning Photography
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Capture unforgettable moments with breathtaking backdrops.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Iconic Locations
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Explore Maasai Mara, Amboseli, Tsavo, and Lake Nakuru National
                Parks.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
                Expert Guides
              </h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Experienced local guides ensure you don't miss any hidden gems.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Booking Modal */}
      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}
    </>
  );
};

export default Safaris;
