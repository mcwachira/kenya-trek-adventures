"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { CalendarDays, User, ArrowRight, BookOpen } from "lucide-react";
import { useBlogPosts } from "@/hooks/useSanity";
import { BlogPost as BlogPostType } from "@/types/index";
import { urlFor } from "@/sanity/lib/image";

// 🟩 Blog Post Card
const BlogPostCard = ({ blog }: { blog: BlogPostType }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 overflow-hidden flex flex-col">
      <Link href={`/blog/${blog.slug.current}`}>
        <div className="aspect-video bg-coffee-cream overflow-hidden">
          {blog.mainImage?.asset ? (
            <Image
              src={urlFor(blog.mainImage).width(800).height(450).url()}
              alt={blog.mainImage?.alt || blog.title}
              width={800}
              height={450}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-coffee-green-light">
              <BookOpen className="h-16 w-16 text-coffee-green" />
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4" />
            <span>
              {blog.publishedAt ? formatDate(blog.publishedAt) : "Unpublished"}
            </span>
          </div>

          {blog.author?.name && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{blog.author.name}</span>
            </div>
          )}
        </div>

        <Link href={`/blog/${blog.slug.current}`}>
          <h3 className="text-xl font-semibold line-clamp-2 text-primary group-hover:text-coffee-green transition-colors">
            {blog.title}
          </h3>
        </Link>

        {blog.categories && blog.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {blog.categories.slice(0, 2).map((category, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {category?.title}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0 mt-auto">
        {blog.excerpt && (
          <p className="text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {blog.excerpt}
          </p>
        )}

        <Link href={`/blog/${blog.slug.current}`}>
          <Button
            variant="ghost"
            className="p-0 h-auto font-medium text-coffee-green hover:text-coffee-green/80 hover:bg-transparent"
          >
            Read More
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>

        {blog.tags?.length && (
          <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-border">
            {blog.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// 🟩 Skeleton Card
const BlogPostSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-video" />
    <CardHeader>
      <div className="flex gap-4 mb-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-5 w-20" />
      </div>
    </CardHeader>
    <CardContent>
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <Skeleton className="h-4 w-20" />
    </CardContent>
  </Card>
);

// 🟩 Main Blog Page
const Blog = () => {
  const { blogs, loading, error } = useBlogPosts();

  if (error) {
    return (
      <div className="min-h-screen">
        <div className="pt-20 pb-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-muted-foreground mb-4">
              Unable to load blog posts. Please check your Sanity configuration.
            </p>
            <p className="text-sm text-muted-foreground">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary mb-6">
              Coffee Insights & Stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay updated with the latest travel trends, expert trekking tips,
              and inspiring stories from our adventures across Kenya’s
              breathtaking landscapes.
            </p>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {Array.from({ length: 6 }).map((_, index) => (
                <BlogPostSkeleton key={index} />
              ))}
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog) => (
                <BlogPostCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-coffee-green mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-primary mb-2">
                No blog posts available
              </h3>
              <p className="text-muted-foreground">
                Blog posts will appear here once you add them to your Sanity
                CMS.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
