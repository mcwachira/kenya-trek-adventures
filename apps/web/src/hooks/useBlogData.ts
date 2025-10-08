import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPost } from "@/types";
import { toast } from "sonner";

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch("/api/blog/list");

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to fetch blog posts");
  }

  return data.posts || [];
};

//create a new blog posts
const createBlogPost = async (postData: any): Promise<BlogPost> => {
  const response = await fetch("/api/blog/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to create a blog ");
  }

  return data.result;
};

//update a blog post
const updateBlogPost = async (postData: any): Promise<BlogPost> => {
  const response = await fetch("/api/blog/update", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to update blog ");
  }

  return data.result;
};

//delete a blog post
const deleteBlogPost = async (postId: string): Promise<void> => {
  const url = `/api/blog/delete?_id=${encodeURIComponent(postId)}`;
  const response = await fetch(url, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!data.success) {
    throw new Error(data.error || "Failed to delete blog ");
  }
};

export const useBlogPosts = () => {
  const queryClient = useQueryClient();

  //Fetch Posts

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: fetchBlogPosts,
  });

  //create post mutation
  const addPostMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: (newPost) => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post created successfull");
    },
    onError: (error: Error) => {
      toast.error(error.message || "failed to create a blog post ");
    },
  });

  // Update post mutation
  const updatePostMutation = useMutation({
    mutationFn: updateBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post updated successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update blog post");
    },
  });
  // Delete post mutation
  const deletePostMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
      toast.success("Blog post deleted successfully!");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete blog post");
    },
  });

  return {
    posts,
    isLoading,
    error,
    addPost: addPostMutation.mutate,
    updatePost: updatePostMutation.mutate,
    deletePost: deletePostMutation.mutate,
    isAddingPost: addPostMutation.isPending,
    isUpdatingPost: updatePostMutation.isPending,
    isDeletingPost: deletePostMutation.isPending,
  };
};

//fetch authors for drop down
export const useAuthors = () => {
  return useQuery({
    queryKey: ["authors"],
    queryFn: async () => {
      const response = await fetch("/api/authors/list");
      const data = await response.json();

      return data.success ? data.authors : [];
    },
  });
};

//fetch categories for drop down
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await fetch("/api/categories/list");
      const data = await response.json();

      return data.success ? data.categories : [];
    },
  });
};
