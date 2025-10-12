import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarDays,
  User,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { useBlogPost } from "@/hooks/useBlogPost";

// Format date helper
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Calculate reading time
const calculateReadingTime = (content: string) => {
  if (!content) return "5 min read";
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
};

// Share functionality
const sharePost = (platform: string, url: string, title: string) => {
  const shareUrls: Record<string, string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  };

  if (platform === "copy") {
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
    return;
  }

  if (shareUrls[platform]) {
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  }
};

// Loading Skeleton
const BlogDetailSkeleton = () => (
  <div className="min-h-screen bg-background">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Skeleton className="h-8 w-32 mb-8" />

      <article className="max-w-4xl mx-auto">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-6 w-1/2 mb-6" />

        <div className="flex flex-wrap gap-4 mb-8">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-28" />
        </div>

        <Skeleton className="aspect-video w-full mb-8 rounded-lg" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </article>
    </div>
  </div>
);

// Main Blog Detail Component
export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const {
    post: blog,
    isLoading: loading,
    relatedPosts,
    error,
  } = useBlogPost(slug);
  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">
            {error instanceof Error
              ? error.message
              : "The blog post you're looking for doesn't exist."}
          </p>
          <Button onClick={() => router.push("/blog")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Back Button */}
      <div className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/blog")}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <article className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Link
                href="/"
                className="hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link
                href="/blog"
                className="hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground line-clamp-1">{blog.title}</span>
            </nav>

            {/* Categories */}
            {blog.categories && blog.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.categories.map((category, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm text-muted-foreground mb-8">
              {blog.author?.name && (
                <div className="flex items-center gap-2">
                  {blog.author.image?.asset?.url ? (
                    <Image
                      src={blog.author.image.asset.url}
                      alt={blog.author.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <span className="font-medium text-foreground">
                    {blog.author.name}
                  </span>
                </div>
              )}

              {blog.publishedAt && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{formatDate(blog.publishedAt)}</span>
                </div>
              )}

              {blog.content && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{calculateReadingTime(blog.content)}</span>
                </div>
              )}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 mb-8 pb-8 border-b">
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share:
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => sharePost("facebook", currentUrl, blog.title)}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => sharePost("twitter", currentUrl, blog.title)}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => sharePost("linkedin", currentUrl, blog.title)}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => sharePost("copy", currentUrl, blog.title)}
              >
                <Link2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Featured Image */}
            {blog.mainImage?.asset?.url && (
              <div className="relative aspect-video w-full mb-12 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={blog.mainImage.asset.url}
                  alt={blog.mainImage.alt || blog.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
              {blog.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                  {blog.excerpt}
                </p>
              )}

              <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mb-12">
                <Separator className="mb-6" />
                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground mt-1" />
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Author Bio */}
            {blog.author && (
              <Card className="mb-12">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {blog.author.image?.asset?.url ? (
                      <Image
                        src={blog.author.image.asset.url}
                        alt={blog.author.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">
                        About {blog.author.name}
                      </h3>
                      {blog.author.bio && (
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {typeof blog.author.bio === "string"
                            ? blog.author.bio
                            : "Travel enthusiast and adventure writer."}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map((post) => (
                    <Link key={post._id} href={`/blog/${post.slug.current}`}>
                      <Card className="h-full hover:shadow-lg transition-shadow">
                        {post.mainImage?.asset?.url && (
                          <div className="relative aspect-video">
                            <Image
                              src={post.mainImage.asset.url}
                              alt={post.title}
                              fill
                              className="object-cover rounded-t-lg"
                            />
                          </div>
                        )}
                        <CardContent className="p-4">
                          <h3 className="font-semibold line-clamp-2 mb-2 hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
