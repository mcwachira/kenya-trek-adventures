import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { _id, title, content, authorId, categories } = body;

    // Validate required fields
    if (!_id) {
      return NextResponse.json(
        {
          success: false,
          error: "Post ID is required ",
        },
        { status: 400 },
      );
    }

    const updates: any = {};

    if (title) updates.title = title;
    if (content) updates.content = content;
    if (authorId) {
      updates.author = {
        _type: "reference",
        _ref: authorId,
      };
    }
    if (categories) {
      updates.categories = categories.map((id: string) => ({
        _type: "reference",
        _ref: id,
      }));
    }

    const result = await sanityWriteClient.patch(_id).set(updates).commit();
    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("Sanity update error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
