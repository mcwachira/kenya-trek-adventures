"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  User,
  ArrowRight,
  BookOpen,
  Clock,
  Tag,
} from "lucide-react";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { BlogPost as BlogPostType } from "@/types/index";
// import { urlFor } from "@/sanity/lib/image";

// 🟩 Blog Post Card
const BlogPostCard = ({ blog }: { blog: BlogPostType }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  console.log(blog.mainImage);

  // Calculate reading time (assuming 200 words per minute)

  const calculateReadingTime = (content: string) => {
    if (!content) {
      const words = content.split(/\s+/).length;
      const minutes = Math.ceil(words / 200);
      return `${minutes} min read`;
    }
  };
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border-border hover:border-primary/50">
      <Link href={`/blog/${blog.slug}`} className="block">
        <div className="relative aspect-video bg-muted overflow-hidden">
          {blog.mainImage ? (
            <Image
              src={blog.mainImage}
              alt={blog.mainImage?.alt || blog.title}
              width={800}
              height={450}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
              priority={false}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <BookOpen className="h-16 w-16 text-green-600 dark:text-green-400" />
            </div>
          )}

          {/* Status Bage overlay */}
          {blog.status && blog.status !== "published" && (
            <div className="absolute top-3 right-3">
              <Badge
                variant="secondary"
                className="bg-yellow-500 text-white border-0 shadow-lg"
              >
                {blog.status}
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-3 space-y-3">
        {/* Categories */}
        {blog.categories && blog.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {blog.categories.slice(0, 2).map((category, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs font-medium border-primary/20 text-primary hover:bg-primary/10"
              >
                {category?.title}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/blog/${blog.slug.current}`}>
          <h3 className="text-xl font-bold line-clamp-2 text-card-foreground group-hover:text-primary transition-colors leading-tight">
            {blog.title}
          </h3>
        </Link>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          {blog.author?.name && (
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium">{blog.author.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />
            <span>
              {blog.publishedAt ? formatDate(blog.publishedAt) : "Draft"}
            </span>
          </div>

          {blog.content && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{calculateReadingTime(blog.content)}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0 mt-auto">
        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs font-normal"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Badge>
            ))}
            {blog.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{blog.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}
        {/* Read More Button */}
        <Link href={`/blog/${blog.slug}`} className="block">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto font-semibold text-primary hover:text-primary/80 hover:bg-transparent group/btn"
          >
            Read Full Article
            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

// 🟩 Skeleton Card - Enhanced
const BlogPostSkeleton = () => (
  <Card className="overflow-hidden h-full">
    <Skeleton className="aspect-video" />
    <CardHeader className="space-y-3">
      <div className="flex gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-24" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-4/5" />
      <div className="flex gap-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-4 w-20" />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-18" />
      </div>
      <Skeleton className="h-9 w-full mt-4" />
    </CardContent>
  </Card>
);

// 🟩 Main Blog Page
const Blog = () => {
  const { posts: blogs, isLoading: loading, error } = useBlogPosts();

  console.log(blogs);
  // Filter only published posts for public view
  const publishedBlogs = blogs.filter((blog) => blog.status === "published");

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-destructive">
              <BookOpen className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              Unable to Load Blog Posts
            </h2>
            <p className="text-muted-foreground mb-2">
              We're having trouble loading the blog posts. Please try again
              later.
            </p>
            <p className="text-sm text-muted-foreground/70 font-mono bg-muted p-3 rounded-lg">
              {error.toString()}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-green-50 via-background to-green-50/50 dark:from-green-950/20 dark:via-background dark:to-green-950/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative pt-24 pb-16 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4 animate-fade-in">
                <BookOpen className="h-4 w-4" />
                <span>Travel Stories & Adventures</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight animate-fade-in">
                Explore Kenya's
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 dark:from-green-400 dark:to-green-300">
                  Adventures & Stories
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in">
                Discover expert trekking tips, travel insights, and inspiring
                stories from breathtaking landscapes across Kenya.
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-6 animate-fade-in">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {publishedBlogs.length}
                  </div>
                  <div className="text-sm text-muted-foreground">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {
                      new Set(
                        blogs.flatMap((b) => b.categories?.map((c) => c._id)),
                      ).size
                    }
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Categories
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    {new Set(blogs.map((b) => b.author?._id)).size}
                  </div>
                  <div className="text-sm text-muted-foreground">Writers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogPostSkeleton key={index} />
              ))}
            </div>
          ) : publishedBlogs.length > 0 ? (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Latest Articles
                </h2>
                <Badge variant="secondary" className="text-sm">
                  {publishedBlogs.length}{" "}
                  {publishedBlogs.length === 1 ? "Post" : "Posts"}
                </Badge>
              </div>

              <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                {publishedBlogs.map((blog) => (
                  <BlogPostCard key={blog._id} blog={blog} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto space-y-4">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <BookOpen className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  No Published Posts Yet
                </h3>
                <p className="text-muted-foreground">
                  Check back soon for exciting travel stories and adventure
                  guides.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
