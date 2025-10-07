import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  const body = await req.json();

  const { title, content, authorId, categories } = body;

  // Validate required fields
  if (!title || !content || !authorId) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Missing required fields: title, content, and authorId are required",
      },
      { status: 400 },
    );
  }

  try {
    const doc = {
      _type: "blogPost",
      title,
      content,
      author: {
        _type: "reference",
        _ref: authorId,
      },
      categories: Array.isArray(categories)
        ? categories.map((id: string) => ({
            _type: "reference",
            _ref: id,
          }))
        : [],
      publishAt: new Date().toISOString(),
    };

    const result = await sanityWriteClient.create(doc);
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Sanity create error", error);
    console.error("Sanity create error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
