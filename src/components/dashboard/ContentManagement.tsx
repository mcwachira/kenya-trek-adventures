"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Upload,
  Image as ImageIcon,
  Search,
  Filter,
  MessageSquare,
} from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  publishedAt: string;
  scheduledAt?: string;
  status: "draft" | "published" | "scheduled";
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  commentsCount: number;
}

const ContentManagement = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: "Conquering Mount Kenya: A Complete Guide",
      slug: "conquering-mount-kenya-complete-guide",
      excerpt:
        "Everything you need to know about climbing Kenya's highest peak",
      content: "Mount Kenya is the second-highest mountain in Africa...",
      coverImage: "/api/placeholder/400/250",
      author: "Kenya Trek Adventures",
      publishedAt: new Date().toISOString(),
      status: "published",
      tags: ["Mount Kenya", "Trekking", "Adventure"],
      metaTitle: "Mount Kenya Climbing Guide - Kenya Trek Adventures",
      metaDescription:
        "Complete guide to climbing Mount Kenya with expert tips, routes, and safety information.",
      commentsCount: 12,
    },
    {
      id: 2,
      title: "Wildlife Photography Tips for Safari",
      slug: "wildlife-photography-tips-safari",
      excerpt: "Capture stunning wildlife photos on your next safari adventure",
      content:
        "Safari photography requires patience and the right techniques...",
      coverImage: "/api/placeholder/400/250",
      author: "Safari Guide Team",
      publishedAt: "",
      scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      status: "scheduled",
      tags: ["Photography", "Safari", "Wildlife"],
      metaTitle: "Safari Photography Guide - Kenya Trek Adventures",
      metaDescription:
        "Expert tips for capturing amazing wildlife photos during your safari.",
      commentsCount: 0,
    },
  ]);

  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft" as "draft" | "published" | "scheduled",
    scheduledAt: "",
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now(),
      title: formData.title,
      slug: formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage || "/api/placeholder/400/250",
      author: "Admin",
      publishedAt:
        formData.status === "published" ? new Date().toISOString() : "",
      scheduledAt:
        formData.status === "scheduled" ? formData.scheduledAt : undefined,
      status: formData.status,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription || formData.excerpt,
      commentsCount: 0,
    };

    setPosts([newPost, ...posts]);
    setShowEditor(false);
    resetForm();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      tags: post.tags.join(", "),
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      status: post.status,
      scheduledAt: post.scheduledAt || "",
    });
    setShowEditor(true);
  };

  const handleUpdatePost = () => {
    if (!editingPost) return;

    const updatedPost: BlogPost = {
      ...editingPost,
      title: formData.title,
      slug: formData.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, ""),
      excerpt: formData.excerpt,
      content: formData.content,
      coverImage: formData.coverImage || "/api/placeholder/400/250",
      publishedAt:
        formData.status === "published" && !editingPost.publishedAt
          ? new Date().toISOString()
          : editingPost.publishedAt,
      scheduledAt:
        formData.status === "scheduled" ? formData.scheduledAt : undefined,
      status: formData.status,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      metaTitle: formData.metaTitle || formData.title,
      metaDescription: formData.metaDescription || formData.excerpt,
    };

    setPosts(
      posts.map((post) => (post.id === editingPost.id ? updatedPost : post)),
    );
    setShowEditor(false);
    setEditingPost(null);
    resetForm();
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      tags: "",
      metaTitle: "",
      metaDescription: "",
      status: "draft",
      scheduledAt: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500 text-white hover:bg-green-600";
      case "draft":
        return "bg-gray-500 text-white hover:bg-gray-600";
      case "scheduled":
        return "bg-blue-500 text-white hover:bg-blue-600";
      default:
        return "bg-gray-500 text-white hover:bg-gray-600";
    }
  };

  if (showComments && selectedPost) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-400">
              Comments
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage comments for {selectedPost.title}
            </p>
          </div>
          <Button onClick={() => setShowComments(false)} variant="outline">
            Back to Blog Posts
          </Button>
        </div>

        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400">
              Comments ({selectedPost.commentsCount})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedPost.commentsCount === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  No comments yet
                </p>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  Comments functionality would be implemented here
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-green-800 dark:text-green-400">
            Blog Management
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">
            Create and manage blog posts and content
          </p>
        </div>
        <Button
          onClick={() => setShowEditor(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md px-3 py-2">
              {filteredPosts.length} of {posts.length} posts
            </div>
          </div>
        </CardContent>
      </Card>

      {showEditor && (
        <Card className="shadow-lg border-green-100 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-green-800 dark:text-green-400 flex items-center gap-2">
              {editingPost ? (
                <Edit className="h-5 w-5" />
              ) : (
                <Plus className="h-5 w-5" />
              )}
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter blog post title"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="excerpt">Excerpt *</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    placeholder="Brief description of the post"
                    rows={2}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="coverImage">Cover Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="coverImage"
                      value={formData.coverImage}
                      onChange={(e) =>
                        setFormData({ ...formData, coverImage: e.target.value })
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(
                      value: "draft" | "published" | "scheduled",
                    ) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Publish Now</SelectItem>
                      <SelectItem value="scheduled">Schedule</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.status === "scheduled" && (
                  <div>
                    <Label htmlFor="scheduledAt">Schedule Date</Label>
                    <Input
                      id="scheduledAt"
                      type="datetime-local"
                      value={formData.scheduledAt}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          scheduledAt: e.target.value,
                        })
                      }
                    />
                  </div>
                )}

                <div className="md:col-span-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                    placeholder="Adventure, Trekking, Mount Kenya"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your blog post content here..."
                  rows={12}
                  className="font-mono"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Rich text editor would be integrated here (TinyMCE, Quill,
                  etc.)
                </p>
              </div>

              {/* SEO Settings */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-4">
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      value={formData.metaTitle}
                      onChange={(e) =>
                        setFormData({ ...formData, metaTitle: e.target.value })
                      }
                      placeholder="SEO-optimized title (auto-filled from title if empty)"
                    />
                  </div>
                  <div>
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      value={formData.metaDescription}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: e.target.value,
                        })
                      }
                      placeholder="SEO meta description (auto-filled from excerpt if empty)"
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={editingPost ? handleUpdatePost : handleCreatePost}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowEditor(false);
                    setEditingPost(null);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Table */}
      <Card className="shadow-lg border-green-100 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-green-800 dark:text-green-400">
            All Blog Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No blog posts match your filters
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Post</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Comments</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow
                      key={post.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {post.tags.slice(0, 2).map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{post.author}</div>
                      </TableCell>
                      <TableCell>
                        <div>
                          {post.status === "published" && post.publishedAt && (
                            <div className="text-sm">
                              Published:{" "}
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </div>
                          )}
                          {post.status === "scheduled" && post.scheduledAt && (
                            <div className="text-sm">
                              Scheduled:{" "}
                              {new Date(post.scheduledAt).toLocaleDateString()}
                            </div>
                          )}
                          {post.status === "draft" && (
                            <div className="text-sm text-gray-500">Draft</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedPost(post);
                            setShowComments(true);
                          }}
                          className="flex items-center gap-1"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {post.commentsCount}
                        </Button>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentManagement;
