import { useQuery } from "@tanstack/react-query";

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  status: "draft" | "published" | "scheduled";
  tags: string[];
  metaTitle: string;
  metaDescription: string;
}

const BLOG_STORAGE_KEY = "blog_posts";

const getPublishedPosts = (): BlogPost[] => {
  const stored = localStorage.getItem(BLOG_STORAGE_KEY);
  if (stored) {
    const posts = JSON.parse(stored);
    return posts.filter((post: BlogPost) => post.status === "published");
  }

  // Default published posts
  const defaultPosts: BlogPost[] = [
    {
      id: 1,
      title: "Conquering Mount Kenya: A Complete Guide",
      slug: "conquering-mount-kenya-complete-guide",
      excerpt:
        "Everything you need to know about climbing Kenya's highest peak, from route selection to gear preparation.",
      content:
        "Mount Kenya is the second-highest mountain in Africa and offers some of the most spectacular high-altitude trekking experiences on the continent...",
      coverImage:
        "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "James Mwangi",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      status: "published",
      tags: ["Mount Kenya", "Trekking", "Adventure", "Guide"],
      metaTitle: "Mount Kenya Climbing Guide - Kenya Trek Adventures",
      metaDescription:
        "Complete guide to climbing Mount Kenya with expert tips, routes, and safety information.",
    },
    {
      id: 2,
      title: "Wildlife Photography Tips for Your Safari",
      slug: "wildlife-photography-tips-safari",
      excerpt:
        "Capture stunning wildlife photos on your next safari adventure with these professional tips and techniques.",
      content:
        "Safari photography requires patience, the right equipment, and understanding of animal behavior...",
      coverImage:
        "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "Sarah Wanjiku",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: "published",
      tags: ["Photography", "Safari", "Wildlife", "Tips"],
      metaTitle: "Safari Photography Tips - Kenya Trek Adventures",
      metaDescription:
        "Expert tips for capturing amazing wildlife photos during your safari adventure.",
    },
    {
      id: 3,
      title: "Best Time to Visit Kenya for Wildlife Viewing",
      slug: "best-time-visit-kenya-wildlife",
      excerpt:
        "Discover the optimal seasons for wildlife viewing in Kenya's national parks and reserves.",
      content:
        "Kenya offers incredible wildlife viewing opportunities year-round, but certain seasons provide better experiences...",
      coverImage:
        "https://images.unsplash.com/photo-1469041797191-50ace28483c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      author: "David Kiprop",
      publishedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: "published",
      tags: ["Kenya", "Wildlife", "Travel Tips", "Seasons"],
      metaTitle: "Best Time to Visit Kenya - Wildlife Viewing Guide",
      metaDescription:
        "Learn about the best seasons for wildlife viewing in Kenya's top national parks.",
    },
  ];

  localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(defaultPosts));
  return defaultPosts;
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog-posts"],
    queryFn: () => getPublishedPosts(),
  });
};
