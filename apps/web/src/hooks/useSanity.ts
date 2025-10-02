"use client";
import { useState, useEffect } from "react";
import { BlogPost, Category } from "@/types";
import { client, queries } from "@/sanity/lib/sanity";
import {Tour} from "@/lib/sanity";


// Hook for fetching tours

//custom hook for fetching tours
export const useTours = () => {
  const [tours, setTours] = useState<Tour[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.tours);
        setTours(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch tours");
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  return { tours, loading, error };
};

// Custom hook for fetching a single blog post
export const useTour = (slug: string) => {
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.toursBySlug(slug));
        setTour(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch tour by slug",
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchTour();
    }
  }, [slug]);

  return { tour, loading, error };
};

//custom hook for fetching blog posts
export const useBlogPosts = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.blogPosts);
        setBlogs(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog posts",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return { blogs, loading, error };
};

// Custom hook for fetching a single blog post
export const useBlogPost = (slug: string) => {
  const [blog, setBlogPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.blogPostBySlug(slug));
        setBlogPost(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch blog blog",
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogPost();
    }
  }, [slug]);

  return { blog, loading, error };
};

// Custom hook for fetching categories
export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await client.fetch(queries.categories);
        setCategories(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch categories",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};
