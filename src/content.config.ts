import { defineCollection, z } from "astro:content";
import client from "../tina/__generated__/client";

const blog = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.blogConnection();

    // Map Tina posts to the correct format for Astro
    return postsResponse.data.blogConnection.edges
      ?.filter((post) => !!post)
      .map((post) => {
        const node = post?.node;

        return {
          ...node,
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          tinaInfo: node?._sys, // Include Tina system info if needed
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().nullish(),
    tags: z.array(z.string()).optional(),
    body: z.any().optional(), // Ensure body is part of the schema
  }),
});

const page = defineCollection({
  loader: async () => {
    const postsResponse = await client.queries.pageConnection();

    // Map Tina posts to the correct format for Astro
    return postsResponse.data.pageConnection.edges
      ?.filter((p) => !!p)
      .map((p) => {
        const node = p?.node;

        return {
          ...node,
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""), // Generate clean URLs
          tinaInfo: node?._sys, // Include Tina system info if needed
        };
      });
  },
  schema: z.object({
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    seoTitle: z.string(),
    body: z.any(),
  }),
});

// UPDATED PROPERTIES COLLECTION
const properties = defineCollection({
  // ADD THE LOADER
  loader: async () => {
    const propertiesResponse = await client.queries.propertiesConnection();

    // Map Tina posts to the correct format for Astro
    return propertiesResponse.data.propertiesConnection.edges
      ?.filter((p) => !!p)
      .map((p) => {
        const node = p?.node;

        return {
          ...node,
          // Use relativePath for id, which Astro will use as slug
          id: node?._sys.relativePath.replace(/\.mdx?$/, ""),
          tinaInfo: node?._sys, // Include Tina system info if needed
        };
      });
  },
  schema: z.object({
    // ADD TINA INFO TO SCHEMA
    tinaInfo: z.object({
      filename: z.string(),
      basename: z.string(),
      path: z.string(),
      relativePath: z.string(),
    }),
    listing_id: z.string().optional(),
    page_slug: z.string(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    project_name: z.string(),
    property_type: z.string().optional(),
    developer_name: z.string().optional(),
    rera_number: z.string().optional(),
    total_area_acres: z.coerce.number().optional(),
    total_units: z.coerce.number().optional(),
    project_status: z.enum(["Under Construction", "Ready to Move"]).optional(),
    possession_date: z.coerce.date().optional(),
    project_description: z.any().optional(), // Use z.any() for rich text
    key_highlights: z.any().optional(), // Use z.any() for rich text
    unit_configurations: z.string().optional(),
    min_size_sqft: z.coerce.number().optional(),
    max_size_sqft: z.coerce.number().optional(),
    price_per_sqft: z.coerce.number().optional(),
    base_price_min_lakhs: z.coerce.number().optional(),
    base_price_max_lakhs: z.coerce.number().optional(),
    location_area: z.string().optional(),
    full_address: z.string().optional(),
    google_maps_embed_link: z.string().optional(),
    gallery_image_urls: z.array(z.string()).optional(),
    floorplan_image_urls: z.array(z.string()).optional(),
    video_link: z.string().optional(),
    body: z.any().optional(), // Add body
  }),
});

export const collections = { blog, page, properties };
