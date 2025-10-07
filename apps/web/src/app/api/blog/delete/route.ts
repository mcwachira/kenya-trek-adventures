import { NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get("_id");

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

    await sanityWriteClient.delete(_id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Sanity delete  error", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
