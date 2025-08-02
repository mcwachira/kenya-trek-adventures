import { BlockContent } from "./portableText";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation?: string;
  meals?: string[];
}

export interface Tour {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  duration: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  price: number;
  image: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
  };
  highlights: string[];
  elevation: string;
  route: string;
  included: string[];
  excluded: string[];
  itinerary: ItineraryDay[];
}

// src/types/sanity.ts (or wherever you consolidate your types)

export interface Post {
  _id: string;
  _type: "post";
  title: string;
  slug: { current: string };
  author: {
    _ref: string; // Reference ID to an Author document
    _type: "reference";
    // Optionally, if you populate author-> {name, image} in your GROQ, you can expand it:
    name?: string;
    image?: {
      _type: "image";
      asset: { _ref: string; _type: "reference" };
      alt?: string;
    };
  };
  mainImage: {
    _type: "image";
    asset: { _ref: string; _type: "reference" };
    alt?: string;
  };
  categories: Array<{
    _type: "reference";
    _ref: string; // Category document ID
    // If populated: you could include title or slug here
    title?: string;
    slug?: { current: string };
  }>;
  publishedAt: string; // ISO datetime
  body: BlockContent; // “blockContent”—Portable Text array (adjust to your Portable Text type if needed)
}
