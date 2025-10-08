import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPost } from "@/types";
import { toast } from "sonner";

//Fetch single Blog Post

const fetchSingleBlog = async (slug: string): Promise<BlogPost> => {
  const response = await fetch(`/api/blog/slug/${slug}`);

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch blog post ");
  }

  return data.post;
};

// Fetch related posts (based on category)

const fetchRelatedPosts = async (
  categoryId: string,
  excludeId: string,
): Promise<BlogPost[]> => {
  const response = await fetch(
    `/api/blog/related?category=${categoryId}&exclude=${excludeId}`,
  );
  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch related posts");
  }

  return data.posts.slice(0, 3); // optional: limit to 3
};

export const useBlogPost = (slug?: string) => {
  // ✅ First query — fetch the main post
  const {
    data: post,
    isLoading: isPostLoading,
    error: postError,
  } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: () => fetchSingleBlog(slug!),
    enabled: !!slug, // only run if slug exists
  });

  // ✅ Second query — fetch related posts (dependent on post)
  const {
    data: relatedPosts = [],
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useQuery({
    queryKey: ["related-posts", slug],
    queryFn: () => {
      if (!post?.categories?.[0]?._id) throw new Error("Missing category ID");
      return fetchRelatedPosts(post.categories[0]._id, post._id);
    },
    enabled: !!post?.categories?.[0]?._id,
  });

  return {
    post,
    relatedPosts,
    isLoading: isPostLoading || isRelatedLoading,
    error: postError || relatedError,
  };
};
