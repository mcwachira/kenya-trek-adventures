import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("_id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Tour ID is required",
        },
        { status: 400 },
      );
    }

    // Check if tour exists
    const existingTour = await sanityWriteClient.fetch(
      `*[_type == "tour" && _id == $id][0]`,
      { id },
    );

    if (!existingTour) {
      return NextResponse.json(
        {
          success: false,
          error: "Tour not found",
        },
        { status: 404 },
      );
    }

    // Delete the tour
    await sanityWriteClient.delete(id);

    return NextResponse.json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to delete tour",
      },
      { status: 500 },
    );
  }
}
