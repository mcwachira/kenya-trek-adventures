"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, FileText, Search, Filter } from "lucide-react";
import { toast } from "sonner";
import { BlogPost } from "@/types";
import { useBlogPosts } from "@/hooks/useBlogData";
import { BlogFormValues, blogSchema } from "@/lib/auth";

const ContentManagement = () => {
  const {
    posts,
    addPost,
    updatePost,
    deletePost,
    isAddingPost,
    isUpdatingPost,
  } = useBlogPosts();

  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      author_name: "Admin",
      tags: "",
      status: "draft",
      meta_title: "",
      meta_description: "",
    },
  });

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploadingImage(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `blog/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("boma-listings")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("boma-listings")
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (values: BlogFormValues) => {
    let coverImage = editingPost?.cover_image || "";

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);
      if (uploadedUrl) coverImage = uploadedUrl;
    }

    const slug = values.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const postData = {
      ...values,
      slug,
      cover_image: coverImage,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
      meta_title: values.meta_title || values.title,
      meta_description: values.meta_description || values.excerpt,
      published_at:
        values.status === "published" ? new Date().toISOString() : null,
    };

    if (editingPost) {
      const updatedPost: BlogPost = {
        ...editingPost,
        ...postData,
        published_at:
          values.status === "published" && !editingPost.published_at
            ? new Date().toISOString()
            : editingPost.published_at,
      };
      updatePost(updatedPost);
    } else {
      addPost(postData as any);
    }

    setShowEditor(false);
    setEditingPost(null);
    setImageFile(null);
    form.reset();
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    form.reset({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author_name: post.author_name,
      tags: post.tags.join(", "),
      status: post.status,
      meta_title: post.meta_title || "",
      meta_description: post.meta_description || "",
    });
    setShowEditor(true);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
    }
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
          onClick={() => {
            setShowEditor(true);
            setEditingPost(null);
            form.reset();
          }}
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

      {/* Editor */}
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter blog post title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Brief description of the post"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FormLabel>Cover Image</FormLabel>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setImageFile(e.target.files?.[0] || null)
                        }
                        className="flex-1"
                      />
                      {uploadingImage && (
                        <span className="text-sm">Uploading...</span>
                      )}
                    </div>
                    {(imageFile || editingPost?.cover_image) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {imageFile
                          ? imageFile.name
                          : "Current image will be kept"}
                      </p>
                    )}
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">
                              Publish Now
                            </SelectItem>
                            <SelectItem value="scheduled">Schedule</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="md:col-span-2">
                    <FormField
                      control={form.control}
                      name="tags"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tags (comma-separated)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Adventure, Trekking, Mount Kenya"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Write your blog post content here..."
                          rows={12}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-4">
                    SEO Settings
                  </h3>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="meta_title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Title (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="SEO-optimized title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="meta_description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Description (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="SEO meta description"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={isAddingPost || isUpdatingPost || uploadingImage}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    {editingPost ? "Update Post" : "Create Post"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowEditor(false);
                      setEditingPost(null);
                      setImageFile(null);
                      form.reset();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
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
                    <TableHead>Views</TableHead>
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
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{post.title}</div>
                            <div className="text-sm text-gray-500 line-clamp-1">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{post.author_name}</TableCell>
                      <TableCell>
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : "Not published"}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(post.status)}>
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.views}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditPost(post)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeletePost(post.id)}
                            className="text-red-600 hover:text-red-700"
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
