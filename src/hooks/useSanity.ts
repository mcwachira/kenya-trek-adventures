import { Tour, Post } from "@/lib/sanity";
import { client } from "@/sanity/lib/client";
import { useQuery } from "@tanstack/react-query";

// Hook for fetching tours
export const useTours = () => {
  return useQuery({
    queryKey: ["tours"],
    queryFn: async (): Promise<Tour[]> => {
      const tours = await client.fetch(`
        *[_type == "tour"] | order(_createdAt desc) {
          _id,
          title,
          slug,
          description,
          duration,
          difficulty,
          price,
          image,
          highlights,
          elevation,
          route,
          included,
          excluded,
          itinerary[] {
            day,
            title,
            description,
            activities,
            accommodation,
            meals
          }
        }
      `);
      return tours;
    },
  });
};

// Hook for fetching a single tour
export const useTour = (slug: string) => {
  return useQuery({
    queryKey: ["tour", slug],
    queryFn: async (): Promise<Tour> => {
      const tour = await client.fetch(
        `*[_type == "tour" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          description,
          duration,
          difficulty,
          price,
          image,
          highlights,
          elevation,
          route,
          included,
          excluded,
          itinerary[] {
            day,
            title,
            description,
            activities,
            accommodation,
            meals
          }
        }`,
        { slug },
      );
      return tour;
    },
    enabled: !!slug,
  });
};

// Hook for fetching blog posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blogPosts"],
    queryFn: async (): Promise<Post[]> => {
      const posts = await client.fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          content,
          author-> {
            name,
            image
          },
          publishedAt,
          mainImage,
          categories
        }
      `);
      return posts;
    },
  });
};

// Hook for fetching a single blog post
export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blogPost", slug],
    queryFn: async (): Promise<Post> => {
      const post = await client.fetch(
        `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          slug,
          excerpt,
          content,
          author-> {
            name,
            image
          },
          publishedAt,
          mainImage,
          categories
        }`,
        { slug },
      );
      return post;
    },
    enabled: !!slug,
  });
};
