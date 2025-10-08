import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Set to false if statically generating pages, using ISR or tag-based revalidation
});

export const sanityWriteClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false, // Never use CDN for writes
});

// Type-safe query helper
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { tags },
  });
}
