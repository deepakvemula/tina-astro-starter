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

const properties = defineCollection({
  schema: z.object({
    listing_id: z.string().optional(),
    page_slug: z.string(),
    meta_title: z.string().optional(),
    meta_description: z.string().optional(),
    project_name: z.string(),
    property_type: z.string().optional(),
    developer_name: z.string().optional(),
    rera_number: z.string().optional(),
    total_area_acres: z.number().optional(),
    total_units: z.number().optional(),
    project_status: z.enum(["Under Construction", "Ready to Move"]).optional(),
    possession_date: z.date().optional(),
    project_description: z.string().optional(),
    key_highlights: z.string().optional(),
    unit_configurations: z.string().optional(),
    min_size_sqft: z.number().optional(),
    max_size_sqft: z.number().optional(),
    price_per_sqft: z.number().optional(),
    base_price_min_lakhs: z.number().optional(),
    base_price_max_lakhs: z.number().optional(),
    location_area: z.string().optional(),
    full_address: z.string().optional(),
    google_maps_embed_link: z.string().optional(),
    gallery_image_urls: z.array(z.string()).optional(),
    floorplan_image_urls: z.array(z.string()).optional(),
    video_link: z.string().optional(),
  }),
});

export const collections = { blog, page, properties };
