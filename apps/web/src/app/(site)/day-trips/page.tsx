"use client"
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

import LakeNakuru from "@/assets/lake-nakuru.jpg";
import KiambuCoffee from "@/assets/kiambu-coffee-farms.jpg";
import NairobiNationalPark from "@/assets/Nairobi-park.jpg"
import HellsGate from "@/assets/hells-gate.jpg"
import OlPajeta from "@/assets/Ol-Pejeta-Conservancy.jpg"
import LakeNaivasha from "@/assets/lake-naivasha.jpg"
import Image from "next/image";
import BookingForm from "@/components/BookingForm";

const DayTrips = () => {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedTrip, setSelectedTrip] = useState("");
    // const { tours: dayTrips, isLoading, error } = useToursByCategory('day-trip');

    const handleBookTrip = (tripName: string) => {
        setSelectedTrip(tripName);
        setShowBooking(true);
    };
  const dayTrips = [
    {
      name: "Hell's Gate National Park",
      duration: "Full Day",
      distance: "90km from Nairobi",
      price: "$120",
      image:
       HellsGate,
      activities: [
        "Rock Climbing",
        "Cycling",
        "Gorge Walking",
        "Wildlife Viewing",
      ],
      description:
        "Unique park where you can walk, cycle and rock climb among wildlife",
    },
    {
      name: "Lake Nakuru Day Safari",
      duration: "Full Day",
      distance: "160km from Nairobi",
      price: "$180",
      image:
        LakeNakuru,
      activities: [
        "Game Drives",
        "Flamingo Watching",
        "Rhino Spotting",
        "Bird Photography",
      ],
      description: "Famous for its pink flamingos and endangered white rhinos",
    },
    {
      name: "Nairobi National Park",
      duration: "Half Day",
      distance: "10km from Nairobi",
      price: "$80",
      image:
      NairobiNationalPark,
      activities: [
        "Game Drives",
        "Lion Viewing",
        "City Skyline Views",
        "Ivory Burning Site",
      ],
      description:
        "The only national park in the world with city skyline backdrop",
    },
    {
      name: "Ol Pejeta Conservancy",
      duration: "Full Day",
      distance: "200km from Nairobi",
      price: "$220",
      image:
      OlPajeta,
      activities: [
        "Rhino Sanctuary",
        "Chimpanzee Sanctuary",
        "Night Drives",
        "Conservation Tours",
      ],
      description:
        "Home to the last two northern white rhinos and rescued chimpanzees",
    },
    {
      name: "Lake Naivasha Boat Safari",
      duration: "Full Day",
      distance: "90km from Nairobi",
      price: "$150",
      image:
       LakeNaivasha,
      activities: [
        "Boat Safari",
        "Hippo Watching",
        "Crescent Island Walk",
        "Elsamere Visit",
      ],
      description:
        "Freshwater lake with abundant birdlife and hippo populations",
    },
    {
      name: "Kiambu Coffee Farm Tour",
      duration: "Half Day",
      distance: "30km from Nairobi",
      price: "$60",
      image:
        KiambuCoffee,
      activities: [
        "Coffee Tasting",
        "Farm Tours",
        "Processing Demo",
        "Cultural Experience",
      ],
      description: "Learn about Kenya's famous coffee from bean to cup",
    },
  ];

  return (
    <>
      {/* <SEO
        title="Kenya Day Trips | Hell's Gate, Lake Nakuru & More"
        description="Perfect day adventures from Nairobi. Explore Hell's Gate, Lake Nakuru, Nairobi National Park and more with our expert guides."
        keywords="Kenya day trips, Hell's Gate, Lake Nakuru, Nairobi National Park, day safari"
      /> */}
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
              Kenya Day
              <span className="block text-orange-400">Adventures</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Perfect for short visits and family adventures. Explore
              Kenya&apos;s wonders in a single day.
            </p>
            <Button
              size="lg"
              className=" cursor-pointer bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
              onClick={() => setShowBooking(true)}
            >
              Book Day Trip
            </Button>
          </div>
        </section>

        {/* Day Trips Grid */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dayTrips.map((trip, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
              >
                  <div className="relative w-full aspect-video">
                      <Image
                          src={trip.image}
                          alt={trip.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0} // make the first image preload
                      />
                      <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {trip.price}
                      </div>
                  </div>
                <CardHeader>
                  <CardTitle className="text-green-800 dark:text-green-400">
                    {trip.name}
                  </CardTitle>
                  <CardDescription>{trip.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {trip.duration}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {trip.distance}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                        Activities:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {trip.activities.map((activity, i) => (
                          <span
                            key={i}
                            className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs"
                          >
                            {activity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button className="cursor-pointer w-full bg-green-700 hover:bg-green-800 text-white"
                            onClick={() => handleBookTrip(trip.name)}
                    >
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
        {showBooking && (
            <BookingForm
                onClose={() => setShowBooking(false)}
                serviceName={selectedTrip || "Kenya Day Trip"}
            />
        )}
    </>
  );
};

export default DayTrips;

