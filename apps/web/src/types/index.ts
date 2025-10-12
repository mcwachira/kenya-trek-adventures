// ✅ Shared
export interface SanityImage {
  _type: "image";
  asset: {
    _id?: string;
    url?: string;
    _type?: "reference" | "sanity.imageAsset";
    _ref?: string;
  };
  alt?: string;
}

export interface Slug {
  _type: "slug";
  current: string;
}

// ✅ Portable Text
export type BlockContent = Array<Block | ImageBlock>;

export interface Block {
  _key: string;
  _type: "block";
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  children: Span[];
  markDefs: LinkAnnotation[];
}

export interface Span {
  _key: string;
  _type: "span";
  text: string;
  marks: string[];
}

export interface LinkAnnotation {
  _key: string;
  _type: "link";
  href: string;
}

export interface ImageBlock {
  _key: string;
  _type: "image";
  asset: {
    _type: "reference";
    _ref: string;
  };
  alt?: string;
}

// ✅ Blog Post Status Type
export type BlogPostStatus = "draft" | "published" | "scheduled";

// ✅ Blog
export interface BlogPost {
  _id: string;
  _type?: "blogPost";
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  categories?: {
    _id: string;
    title: string;
    slug: { current: string };
  }[];
  tags?: string[];
  status?: BlogPostStatus;
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  content?: any; // You can replace `any` with PortableText type if needed
  author?:
    | Author
    | {
        _id: string;
        name: string;
        slug?: { current: string };
        image?: {
          asset: {
            _id: string;
            url: string;
          };
          alt?: string;
        };
        bio?: any;
      };
}

export interface Author {
  _id: string;
  _type: "author";
  name: string;
  slug?: Slug;
  image?: SanityImage;
  bio?: BlockContent;
}

// ✅ Category
export interface Category {
  _id: string;
  _type: "category";
  name: string;
  slug: Slug;
  description?: string;
}

// ✅ Gallery
export interface Gallery {
  _type: "gallery";
  images: GalleryImage[];
}

export interface GalleryImage extends SanityImage {
  _key?: string;
  alt: string; // required alt per schema
}

// types/tour.ts

export type TourCategory = "mount-kenya" | "day-trip" | "safaris";

export interface ItineraryDay {
  _key?: string;
  day: number;
  title: string;
  description: string;
  activities?: string[];
  meals?: string[];
  accommodation?: string;
}

export interface Tour {
  _id: string;
  _type: "tour";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  category: TourCategory;
  description: string;
  duration: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  price: number;
  image?: SanityImage;
  imageUrl?: string;
  location?: string;
  highlights?: string[];
  elevation?: string;
  route?: string;
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryDay[];
}

export interface TourFormData {
  title: string;
  slug?: string;
  category: TourCategory;
  description: string;
  duration: number;
  difficulty: "Easy" | "Moderate" | "Challenging";
  price: number;
  image?: File | SanityImage;
  imageUrl?: string;
  location?: string;
  highlights?: string[];
  elevation?: string;
  route?: string;
  included?: string[];
  excluded?: string[];
  itinerary?: ItineraryDay[];
}

export interface TourListResponse {
  success: boolean;
  tours: Tour[];
  error?: string;
}

export interface TourResponse {
  success: boolean;
  tour?: Tour;
  error?: string;
}

export interface RelatedToursResponse {
  success: boolean;
  tours: Tour[];
  error?: string;
}

// Helper function to get category label
export const getCategoryLabel = (category: TourCategory): string => {
  switch (category) {
    case "mount-kenya":
      return "Mount Kenya";
    case "day-trip":
      return "Day Trip";
    case "safaris":
      return "Safaris";
    default:
      return category;
  }
};

export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          service: string;
          guests: number;
          date: string;
          message: string | null;
          status: "pending" | "confirmed" | "cancelled";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          service: string;
          guests: number;
          date: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          service?: string;
          guests?: number;
          date?: string;
          message?: string | null;
          status?: "pending" | "confirmed" | "cancelled";
          created_at?: string;
          updated_at?: string;
        };
      };
      contacts: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          subject?: string;
          message?: string;
          created_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          role?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}
