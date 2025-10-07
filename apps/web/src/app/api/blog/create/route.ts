import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      author,
      tags,
      status,
      metaTitle,
      metaDescription,
      mainImage,
    } = body;

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: title and content are required",
        },
        { status: 400 },
      );
    }

    //generate slug from title
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const doc = {
      _type: "blogPost",
      title,
      slug: {
        _type: "slug",
        current: slug,
      },
      excerpt,
      content,
      status: status || "draft",
      tags: tags || [],
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      publishedAt: status === "published" ? new Date().toISOString() : null,
      ...(author && {
        author: {
          _type: "reference",
          _ref: author,
        },
      }),
      ...(mainImage && {
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: mainImage,
          },
        },
      }),
    };

    const result = await sanityWriteClient.create(doc);
    return NextResponse.json({ success: true, result }, { status: 201 });
  } catch (error: any) {
    console.error("Sanity create error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
