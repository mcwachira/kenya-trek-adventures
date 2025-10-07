import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function GET() {
  try {
    const authors = await client.fetch(
      `*[_type == "author"] | order(name asc) {
        _id,
        name,
        email
      }`,
    );

    return NextResponse.json({ success: true, authors });
  } catch (error) {
    console.error("Sanity fetch error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 },
    );
  }
}
