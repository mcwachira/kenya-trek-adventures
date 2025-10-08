import { NextRequest, NextResponse } from "next/server";
import { sanityWriteClient } from "@/sanity/lib/client";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate category
    const validCategories = ["mount-kenya", "day-trip", "safaris"];
    if (!body.category || !validCategories.includes(body.category)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invalid category. Must be one of: mount-kenya, day-trip, safaris",
        },
        { status: 400 },
      );
    }

    //generate slug if not provided

    const slug = body.slug || generateSlug(body.title);

    // Check if slug already exists
    const existingTour = await sanityWriteClient.fetch(
      `*[_type == "tour" && slug.current == $slug][0]`,
      { slug },
    );

    if (existingTour) {
      return NextResponse.json(
        {
          success: false,
          error: "A tour with this slug already exists",
        },
        { status: 400 },
      );
    }

    // Prepare tour document
    const tourDocument: any = {
      _type: "tour",
      title: body.title,
      slug: {
        _type: "slug",
        current: slug,
      },
      category: body.category,
      description: body.description,
      duration: Number(body.duration),
      difficulty: body.difficulty,
      price: Number(body.price),
      location: body.location || "",
      highlights: body.highlights || [],
      elevation: body.elevation || "",
      route: body.route || "",
      included: body.included || [],
      excluded: body.excluded || [],
      itinerary: body.itinerary || [],
    };

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

      tourDocument.image = {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: imageAsset._id,
        },
        alt: body.imageAlt || body.title,
      };
    }

    // Create the tour
    const result = await sanityWriteClient.create(tourDocument);

    return NextResponse.json({
      success: true,
      tour: result,
    });
  } catch (error) {
    console.error("Error creating tour:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create tour",
      },
      { status: 500 },
    );
  }
}
