import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Slug is required" },
        { status: 400 },
      );
    }

    // Fetch single blog post by slug
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      publishedAt,
      status,
      tags,
      metaTitle,
      metaDescription,
      "mainImage": {
        "asset": {
          "_id": mainImage.asset->_id,
          "url": mainImage.asset->url
        },
        "alt": mainImage.alt
      },
      "author": author->{
        _id,
        name,
        "slug": slug.current,
        bio,
        "image": {
          "asset": {
            "_id": image.asset->_id,
            "url": image.asset->url
          },
          "alt": image.alt
        }
      },
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`;

    const post = await client.fetch(query, { slug });

    if (!post) {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 },
      );
    }

    // Only return published posts for public view
    if (post.status !== "published") {
      return NextResponse.json(
        { success: false, error: "Blog post not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
