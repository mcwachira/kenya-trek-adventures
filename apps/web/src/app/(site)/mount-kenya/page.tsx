"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mountain, Clock, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { useToursByCategory } from "@/hooks/useToursByCategory";
import { useCurrency } from "@/hooks/useCurrency";
import Link from "next/link";

const MountKenya = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState("");

  const { tours, isLoading, error } = useToursByCategory({
    category: "mount-kenya",
  });

  const { formatPrice, currency, currencySymbol } = useCurrency();

  const included = [
    "Professional mountain guide",
    "All park fees and permits",
    "Mountain hut accommodation",
    "All meals during trek",
    "Porter services",
    "Safety equipment",
    "Certificate of achievement",
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        <Header />

        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')`,
            }}
          />

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Mount Kenya
              <span className="block text-orange-400">Expeditions</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Challenge yourself on Africa&apos;s second highest peak. Multiple
              routes to Point Lenana (4,985m) with expert guides.
            </p>
            <Button
              size="lg"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowBooking(true)}
            >
              Book Your Expedition
            </Button>
          </div>
        </section>

        {/* Routes Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
              Choose Your Route
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Each route offers unique experiences and challenges. All lead to
              Point Lenana summit.
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
                Failed to load routes:{" "}
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

          {/* Routes Grid */}
          {!isLoading && !error && tours.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tours.map((route: any) => (
                <Card
                  key={route._id}
                  className="bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow overflow-hidden rounded-2xl"
                >
                  {/* Image */}
                  {route.imageUrl ? (
                    <div className="relative w-full h-56">
                      <Image
                        src={route.imageUrl}
                        alt={route.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      <Mountain className="h-10 w-10 text-white" />
                    </div>
                  )}

                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                      <Mountain className="h-6 w-6" />
                      {route.title}
                    </CardTitle>
                    <CardDescription>{route.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                          <Clock className="h-4 w-4" />
                          {route.duration} days
                        </span>
                        <span className="text-sm font-medium text-orange-600">
                          {route.difficulty}
                        </span>
                      </div>

                      <div className="text-2xl font-bold text-green-800 dark:text-green-400">
                        {formatPrice(route.price)}
                        <span className="text-sm text-gray-600 dark:text-gray-300 font-normal">
                          {" "}
                          / person
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Link href={`/tours/${route._id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View Details
                          </Button>
                        </Link>
                        <Button
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white"
                          onClick={() => {
                            setSelectedRoute(route.title);
                            setShowBooking(true);
                          }}
                        >
                          Book Now
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
              <Mountain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No Mount Kenya tours available yet.
              </p>
            </div>
          )}
        </section>

        {/* What's Included */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-green-50 dark:bg-gray-800 rounded-2xl my-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-green-800 dark:text-green-400 mb-4">
              What&apos;s Included
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Everything you need for a safe and successful summit attempt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showBooking && <BookingForm onClose={() => setShowBooking(false)} />}
    </>
  );
};

export default MountKenya;
