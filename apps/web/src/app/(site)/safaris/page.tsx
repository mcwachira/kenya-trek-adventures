"use client"
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Binoculars, MapPin, Calendar} from "lucide-react";
import BookingForm from "@/components/BookingForm";
import Image from "next/image";


import Amboseli from "@/assets/amboseli-national-park.jpg";
import MassaiMara from "@/assets/Massai-mara-national-Park.jpg";
import LakeNakuru from "@/assets/lake-nakuru-national-park.jpg";
import Tsavo from "@/assets/Tsavo-National-park.jpg";
import {useState} from "react";

const Safaris = () => {
    const [showBooking, setShowBooking] = useState(false);
    const [selectedSafari, setSelectedSafari] = useState("");
    // const { tours: safaris, isLoading, error } = useToursByCategory('safari');

    const handleBookSafari = (safariName: string) => {
        setSelectedSafari(safariName);
        setShowBooking(true);
    };

    const safaris = [
        {
            name: "Maasai Mara Safari",
            duration: "3-7 Days",
            location: "Maasai Mara National Reserve",
            price: "From $450/day",
            image: MassaiMara,
            highlights: ["Great Migration", "Big Five", "Maasai Culture", "Hot Air Balloons"],
        },
        {
            name: "Amboseli Safari",
            duration: "2-4 Days",
            location: "Amboseli National Park",
            price: "From $380/day",
            image: Amboseli,
            highlights: ["Mount Kilimanjaro Views", "Elephant Herds", "Observation Hill", "Maasai Villages"],
        },
        {
            name: "Tsavo Safari",
            duration: "2-5 Days",
            location: "Tsavo East & West",
            price: "From $320/day",
            image: Tsavo,
            highlights: ["Red Elephants", "Mzima Springs", "Lugard Falls", "Rock Climbing"],
        },
        {
            name: "Lake Nakuru Safari",
            duration: "1-2 Days",
            location: "Lake Nakuru National Park",
            price: "From $280/day",
            image: LakeNakuru,
            highlights: ["Pink Flamingos", "White Rhinos", "Baboon Cliff", "Makalia Falls"],
        },
    ];

    return (
        <>
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-16">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Safari Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />
                </div>

                <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">
                        Kenya Wildlife
                        <span className="block text-orange-400">Safaris</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                        Witness the Big Five and experience the Great Migration in
                        Kenya&apos;s world-famous national parks.
                    </p>
                    <Button
                        size="lg"
                        className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-lg"
                        onClick={() => setShowBooking(true)}
                    >
                        Plan Your Safari
                    </Button>
                </div>
            </section>

            {/* Safari Options */}
            <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-green-400 mb-4">
                        Safari Destinations
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Choose from Kenya&apos;s most spectacular wildlife destinations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {safaris.map((safari, index) => (
                        <Card
                            key={index}
                            className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={safari.image}
                                    alt={safari.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={index === 0} // make the first image preload
                                />
                                <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    {safari.price}
                                </div>
                            </div>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-400">
                                    <Binoculars className="h-5 w-5" />
                                    {safari.name}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    {safari.location}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                        <Calendar className="h-4 w-4" />
                                        {safari.duration}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                                            Highlights:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {safari.highlights.map((highlight, i) => (
                                                <span
                                                    key={i}
                                                    className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded-full text-xs"
                                                >
                          {highlight}
                        </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Button className="w-full bg-green-700 hover:bg-green-800 text-white"
                                            onClick={() => handleBookSafari(safari.name)}>
                                        Book Safari
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    {showBooking && (
        <BookingForm
            onClose={() => setShowBooking(false)}
            serviceName={selectedSafari || "Kenya Safari"}
        />
    )}

        </>
    );
};

export default Safaris;
