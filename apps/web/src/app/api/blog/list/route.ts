import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const query = `{
         "posts": *[_type == "blogPost"] | order(publishedAt desc) [$offset...$end] {
           _id,
           title,
           content,
           publishedAt,
           author->{
             _id,
             name
           },
           categories[]->{
             _id,
             title
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
