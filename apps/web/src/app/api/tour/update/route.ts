import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body._id) {
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
      { id: body._id },
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

    // Prepare update operations
    const updates: any = {
      title: body.title,
      description: body.description,
      duration: Number(body.duration),
      category: body.category,
      location: body.location,
      difficulty: body.difficulty,
      price: Number(body.price),
      highlights: body.highlights || [],
      elevation: body.elevation || "",
      route: body.route || "",
      included: body.included || [],
      excluded: body.excluded || [],
      itinerary: body.itinerary || [],
    };

    // Update slug if title changed
    if (body.title && body.title !== existingTour.title) {
      const newSlug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      updates.slug = {
        _type: "slug",
        current: newSlug,
      };
    }

    // Handle image upload if provided
    if (body.imageBase64 && body.imageName) {
      const buffer = Buffer.from(body.imageBase64, "base64");
      const imageAsset = await sanityWriteClient.assets.upload(
        "image",
        buffer,
        {
          filename: body.imageName,
        },
      );

      updates.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
        alt: body.imageAlt || body.title,
      };
    }

    // Update the tour
    const result = await sanityWriteClient
      .patch(body._id)
      .set(updates)
      .commit();

    return NextResponse.json({
      success: true,
      tour: result,
    });
  } catch (error) {
    console.error("Error updating tour:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update tour",
      },
      { status: 500 },
    );
  }
}
