import { sanityWriteClient } from "./client";

export async function uploadImageToSanity(file: File): Promise<string | null> {
  try {
    //upload image to sanity
    const asset = await sanityWriteClient.assets.upload("image", file, {
      filename: file.name,
    });

    // Return the asset reference ID
    return asset._id;
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  }
}

// Alternative: Get the URL directly
export async function uploadImageToSanityWithUrl(
  file: File,
): Promise<{ assetId: string; url: string } | null> {
  try {
    const asset = await sanityWriteClient.assets.upload("image", file, {
      filename: file.name,
    });

    return {
      assetId: asset._id,
      url: asset.url,
    };
  } catch (error) {
    console.error("Error uploading image to Sanity:", error);
    return null;
  }
}
