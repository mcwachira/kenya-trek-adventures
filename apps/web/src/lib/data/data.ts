import LenanaPoint from "@/assets/lenana-point.jpg";
import HellsGate from "@/assets/hells-gate.jpg";
import MassaiMara from "@/assets/massai-mara.jpg";
import {Tour} from "@/lib/sanity";

export const defaultExpeditions: Tour[] = [
    {
        _id: "1",
        title: "Sirimon-Chogoria Route",
        description:
            "The most scenic route combining the best of both Sirimon and Chogoria paths",
        duration: "5 Days",
        difficulty: "Moderate",
        price: 850,
        image: LenanaPoint,
        category: "mount-kenya",
        highlights: ["Point Lenana Summit", "Alpine Lakes", "Unique Vegetation"],
        included: [
            "Professional guide",
            "All meals",
            "Park fees",
            "Accommodation",
        ],
        location: "Mount Kenya National Park",
        maxParticipants: 8,
        status: "active",
        createdAt: new Date().toISOString(),
    },
    {
        _id: "2",
        title: "Maasai Mara Safari",
        description:
            "Experience the Great Migration and Big Five in Kenya's most famous park",
        duration: "3-7 Days",
        difficulty: "Easy",
        price:  450,
        image: MassaiMara,
        category: "safari",
        highlights: [
            "Great Migration",
            "Big Five",
            "Maasai Culture",
            "Hot Air Balloons",
        ],
        included: [
            "Game drives",
            "Professional guide",
            "All meals",
            "Accommodation",
        ],
        location: "Maasai Mara National Reserve",
        maxParticipants: 6,
        status: "active",
        createdAt: new Date().toISOString(),
    },
    {
        _id: "3",
        title: "Hell's Gate National Park",
        description:
            "Unique park where you can walk, cycle and rock climb among wildlife",
        duration: "Full Day",
        difficulty: "Easy",
        price: 120,
        image:HellsGate,
        category: "day-trip",
        highlights: [
            "Rock Climbing",
            "Cycling",
            "Gorge Walking",
            "Wildlife Viewing",
        ],
        included: ["Transport", "Guide", "Equipment", "Lunch"],
        location: "Hell's Gate National Park",
        maxParticipants: 12,
        status: "active",
        createdAt: new Date().toISOString(),
    },

    {
        _id: "4",
        title: "Chogoria Route Adventure",
        route: "Chogoria Route",
        duration: "5 days ",
        difficulty: "Challenging",
        price: 580,
        image: LenanaPoint,
        highlights: ["Most scenic route", "Lake Michaelson", "Gorges Valley"],
        location: "Mount Kenya National Park",
        elevation: "4,985m",
        slug: { current: "chogoria" },
        description: "The most scenic climb up Mount Kenya.",
        included: [],
        excluded: [],
        itinerary: [],
    },
];
