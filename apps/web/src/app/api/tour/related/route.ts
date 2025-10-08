import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tourId = searchParams.get("tourId");
    const difficulty = searchParams.get("difficulty");
    const limit = searchParams.get("limit") || "3";

    if (!tourId) {
      return NextResponse.json(
        {
          success: false,
          error: "Tour ID is required",
        },
        { status: 400 },
      );
    }

    // Build query to find related tours
    let query = `*[_type == "tour" && _id != $tourId`;

    if (difficulty) {
      query += ` && difficulty == $difficulty`;
    }

    query += `] | order(_createdAt desc) [0...${limit}] {
      _id,
      _type,
      _createdAt,
      title,
      slug,
      description,
      duration,
      difficulty,
      price,
      image,
      highlights
    }`;

    const tours = await client.fetch(query, { tourId, difficulty });

    // Process image URLs
    const toursWithImageUrls = tours.map((tour: any) => ({
      ...tour,
      imageUrl: tour.image ? urlFor(tour.image).width(600).url() : null,
    }));

    return NextResponse.json({
      success: true,
      tours: toursWithImageUrls,
    });
  } catch (error) {
    console.error("Error fetching related tours:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch related tours",
        tours: [],
      },
      { status: 500 },
    );
  }
}
