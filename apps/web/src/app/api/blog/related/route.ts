import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const exclude = searchParams.get("exclude");
    const limit = parseInt(searchParams.get("limit") || "3");

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 },
      );
    }

    // Fetch related posts by category
    const query = `*[
      _type == "blogPost"
      && status == "published"
      && references($category)
      && _id != $exclude
    ] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      status,
      tags,
      "mainImage": {
        "asset": {
          "_id": mainImage.asset->_id,
          "url": mainImage.asset->url
        },
        "alt": mainImage.alt
      },
      "author": author->{
        _id,
        name
      },
      "categories": categories[]->{
        _id,
        title
      }
    }`;

    const posts = await client.fetch(query, {
      category,
      exclude,
      limit,
    });

    return NextResponse.json({ success: true, posts: posts || [] });
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
