"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useTours } from "@/hooks/useSanity";
import { urlFor } from "@/sanity/lib/image";
import Image, { StaticImageData } from "next/image";
import Aberdare from "@/assets/Aberdare-Forest.jpg";
import LenanaPoint from "@/assets/lenana-point.jpg"
import Amboseli from "@/assets/amboseli-national-park.jpg";
import HellsGate from "@/assets/hells-gate.jpg";
import MassaiMara from "@/assets/massai-mara.jpg"

export type Expedition = {
    _id: string;
    title: string;
    route: string;
    duration: number;
    difficulty: "Easy" | "Moderate" | "Challenging";
    price: number;
    image: {
        asset: {
            _ref: string; // Sanity image reference
            _type: "reference";
        };
    } | StaticImageData; // allow fallback to static images
    highlights: string[];
    elevation: string;
};

const FeaturedExpeditions = () => {
    const { tours, loading, error } = useTours();

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-100 text-green-800";
            case "Moderate":
                return "bg-yellow-100 text-yellow-800";
            case "Challenging":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const defaultExpeditions: Expedition[] = [
        {
            _id: "default-1",
            title: "Mount Kenya Point Lenana",
            route: "Sirimon Route",
            duration: 4,
            difficulty: "Moderate",
            price: 450,
            image: LenanaPoint,
            highlights: [
                "Spectacular alpine scenery",
                "Acclimatization friendly",
                "Beautiful Mackinder's Valley",
            ],
            elevation: "4,985m",
        },
        {
            _id: "default-2",
            title: "Maasai Mara Safari",
            route: "Big Five Experience",
            duration: 3,
            difficulty: "Easy",
            price: 320,
            image: MassaiMara,
            highlights: [
                "Great Migration witness",
                "Big Five guarantee",
                "Maasai cultural visit",
            ],
            elevation: "1,500m",
        },
        {
            _id: "default-3",
            title: "Chogoria Route Adventure",
            route: "Chogoria Route",
            duration: 5,
            difficulty: "Challenging",
            price: 580,
            image: LenanaPoint,
            highlights: ["Most scenic route", "Lake Michaelson", "Gorges Valley"],
            elevation: "4,985m",
        },
    ];

    const defaultImages: StaticImageData[] = [Aberdare, Amboseli, HellsGate];

    const expeditions: Expedition[] =
        tours && tours.length > 0 ? (tours as Expedition[]).slice(0, 3) : defaultExpeditions;

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-green-800 mb-4">
                            Featured Expeditions
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Carefully curated adventures that showcase the best of
                            Kenya&apos;s natural wonders
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                <Skeleton className="h-64 w-full" />
                                <div className="p-6 space-y-2">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2 mb-4" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-full mb-2" />
                                    <Skeleton className="h-4 w-3/4 mb-6" />
                                    <div className="flex gap-3">
                                        <Skeleton className="h-10 flex-1" />
                                        <Skeleton className="h-10 w-24" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gradient-to-b from-green-50 to-orange-50 dark:from-gray-900 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-4xl font-bold text-green-800 mb-4">
                            Featured Expeditions
                        </h2>
                        <p className="text-xl text-red-600">
                            Unable to load expeditions. Please try again later.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 border-t border-green-700 dark:from-gray-900 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-green-800 mb-4">
                        Featured Expeditions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Carefully curated adventures that showcase the best of Kenya&apos;s
                        natural wonders
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {expeditions.map((expedition, index) => {
                        const imageUrl =
                            expedition.image && expedition.image.asset?._ref
                                ? urlFor(expedition.image).width(800).height(400).url()
                                : defaultImages[index];

                        return (
                            <div
                                key={expedition._id}
                                className="bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src={imageUrl}
                                        alt={expedition.title}
                                        width={800}
                                        height={400}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge
                                            className={`${getDifficultyColor(
                                                expedition.difficulty,
                                            )} font-semibold`}
                                        >
                                            {expedition.difficulty}
                                        </Badge>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-orange-600 font-bold text-lg">
                      ${expedition.price}
                    </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-green-800 mb-2">
                                        {expedition.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {expedition.route}
                                    </p>

                                    <div className="flex justify-between items-center mb-4 text-sm text-gray-500 dark:text-gray-300">
                                        <span>{expedition.duration} Days</span>
                                        <span>Max Elevation: {expedition.elevation}</span>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        {expedition.highlights?.slice(0, 3).map((highlight: string, idx: number) => (
                                            <div
                                                key={idx}
                                                className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                                            >
                                                <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                                                {highlight}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <Button className="flex-1 bg-green-700 hover:bg-green-800 text-white">
                                            View Details
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="border-orange-300 text-orange-600 hover:bg-orange-50 dark:bg-green-700 dark:text-white"
                                        >
                                            Book Now
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedExpeditions;
