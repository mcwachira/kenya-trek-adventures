import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const query = `*[_type == "tour" && (_id == $id || slug.current == $id)][0] {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      duration,
      difficulty,
      price,
      image,
      highlights,
      elevation,
      route,
      included,
      excluded,
      itinerary[] {
        _key,
        day,
        title,
        description,
        activities,
        meals,
        accommodation
      }
    }`;

    const tour = await client.fetch(query, { id });

    if (!tour) {
      return NextResponse.json(
        {
          success: false,
          error: "Tour not found",
        },
        { status: 404 },
      );
    }

    // Process image URL
    const tourWithImageUrl = {
      ...tour,
      imageUrl: tour.image ? urlFor(tour.image).width(1200).url() : null,
    };

    return NextResponse.json({
      success: true,
      tour: tourWithImageUrl,
    });
  } catch (error) {
    console.error("Error fetching tour:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch tour",
      },
      { status: 500 },
    );
  }
}
