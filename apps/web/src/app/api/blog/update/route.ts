import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const {
      _id,
      title,
      excerpt,
      content,
      status,
      tags,
      metaTitle,
      metaDescription,
    } = body;

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 },
      );
    }

    const updates: any = {};

    if (title) {
      updates.title = title;
      updates.slug = {
        _type: "slug",
        current: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, ""),
      };
    }
    if (excerpt !== undefined) updates.excerpt = excerpt;
    if (content !== undefined) updates.content = content;
    if (status !== undefined) {
      updates.status = status;
      // Set publishedAt when publishing
      if (status === "published") {
        updates.publishedAt = new Date().toISOString();
      }
    }
    if (tags !== undefined) updates.tags = tags;
    if (metaTitle !== undefined) updates.metaTitle = metaTitle;
    if (metaDescription !== undefined)
      updates.metaDescription = metaDescription;

    const result = await sanityWriteClient.patch(_id).set(updates).commit();

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Sanity update error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
