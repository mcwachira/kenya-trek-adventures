import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Increment view count
    await sanityWriteClient
      .patch(postId)
      .setIfMissing({ views: 0 })
      .inc({ views: 1 })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sanity update error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}