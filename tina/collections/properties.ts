import type { Collection } from "tinacms";

export const PropertiesCollection: Collection = {
  name: "properties",
  label: "Properties",
  path: "src/content/properties",
  format: "mdx",
  ui: {
    router({ document }) {
      return `/properties/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      name: "listing_id",
      label: "Listing ID",
    },
    {
      type: "string",
      name: "page_slug",
      label: "Page Slug",
      required: true,
    },
    {
      type: "string",
      name: "meta_title",
      label: "Meta Title",
    },
    {
      type: "string",
      name: "meta_description",
      label: "Meta Description",
    },
    {
      type: "string",
      name: "project_name",
      label: "Project Name",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "property_type",
      label: "Property Type",
    },
    {
      type: "string",
      name: "developer_name",
      label: "Developer Name",
    },
    {
      type: "string",
      name: "rera_number",
      label: "RERA Number",
    },
    {
      type: "number",
      name: "total_area_acres",
      label: "Total Area (Acres)",
      ui: {
        parse: (val) => (val ? parseFloat(val) : undefined),
      },
    },
    {
      type: "number",
      name: "total_units",
      label: "Total Units",
    },
    {
      type: "string",
      name: "project_status",
      label: "Project Status",
      options: ["Under Construction", "Ready to Move"],
    },
    {
      type: "datetime",
      name: "possession_date",
      label: "Possession Date",
    },
    {
      type: "rich-text",
      name: "project_description",
      label: "Project Description",
    },
    {
      type: "rich-text",
      name: "key_highlights",
      label: "Key Highlights",
    },
    {
      type: "string",
      name: "unit_configurations",
      label: "Unit Configurations",
    },
    {
      type: "number",
      name: "min_size_sqft",
      label: "Min Size (Sqft)",
    },
    {
      type: "number",
      name: "max_size_sqft",
      label: "Max Size (Sqft)",
    },
    {
      type: "number",
      name: "price_per_sqft",
      label: "Price Per Sqft",
    },
    {
      type: "number",
      name: "base_price_min_lakhs",
      label: "Base Price Min (Lakhs)",
    },
    {
      type: "number",
      name: "base_price_max_lakhs",
      label: "Base Price Max (Lakhs)",
    },
    {
      type: "string",
      name: "location_area",
      label: "Location Area",
    },
    {
      type: "string",
      name: "full_address",
      label: "Full Address",
    },
    {
      type: "string",
      name: "google_maps_embed_link",
      label: "Google Maps Embed Link",
    },
    {
      type: "string",
      name: "gallery_image_urls",
      label: "Gallery Image URLs",
      list: true,
    },
    {
      type: "string",
      name: "floorplan_image_urls",
      label: "Floorplan Image URLs",
      list: true,
    },
    {
      type: "string",
      name: "video_link",
      label: "Video Link",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
};
