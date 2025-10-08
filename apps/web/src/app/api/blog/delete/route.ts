import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const _id = searchParams.get("_id");

    if (!_id) {
      return NextResponse.json(
        { success: false, error: "Post ID is required" },
        { status: 400 },
      );
    }

    await sanityWriteClient.delete(_id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Sanity delete error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
