import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const query = `{
      "posts": *[_type == "blogPost"] | order(publishedAt desc) [$offset...$end] {
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
        "mainImage": mainImage.asset->url,
        "author": author->{
          name,
          "slug": slug.current,
          "image": image.asset->url
        },
        "categories": categories[]->{
          _id,
          title,
          "slug": slug.current
        }
      },
      "total": count(*[_type == "blogPost"])
    }`;

    const result = await client.fetch(query, {
      offset,
      end: offset + limit,
    });

    return NextResponse.json({ success: true, ...result });
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
