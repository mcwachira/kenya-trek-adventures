import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// const builder = imageUrlBuilder(client);
// function urlFor(source: SanityImageSource) {
//   return builder.image(source);
// }

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Build dynamic GROQ query
    let query = `*[_type == "tour"`;
    const filters: string[] = [];

    if (category) filters.push(`category == "${category}"`);
    if (difficulty) filters.push(`difficulty == "${difficulty}"`);
    if (minPrice) filters.push(`price >= ${minPrice}`);
    if (maxPrice) filters.push(`price <= ${maxPrice}`);

    if (filters.length > 0) query += ` && ${filters.join(" && ")}`;

    query += `] | order(_createdAt desc) {
      _id,
      _type,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      duration,
      difficulty,
      location,
      category,
      price,
      "imageUrl": image.asset->url,
      highlights,
      elevation,
      route,
      included,
      excluded,
      itinerary
    }`;

    const tours = await client.fetch(query);

    // Optional: if you want to use Sanity's image builder (for resizing etc.)
    const toursWithImageUrls = tours.map((tour: any) => ({
      ...tour,
      imageUrl: tour.imageUrl || null,
    }));

    return NextResponse.json({
      success: true,
      tours: toursWithImageUrls,
    });
  } catch (error: any) {
    console.error("❌ Error fetching tours:", error.message || error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to fetch tours",
        tours: [],
      },
      { status: 500 },
    );
  }
}
