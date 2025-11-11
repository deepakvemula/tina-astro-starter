import React from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import type {
  PropertiesQuery,
  PropertiesQueryVariables,
} from "../__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import FormattedDate from "../../src/components/react/FormattedDate.tsx";

type Props = {
  variables: PropertiesQueryVariables;
  data: PropertiesQuery;
  query: string;
};

// Helper function to extract Google Maps src from embed iframe code
const extractMapsSrc = (embedCode: string | null | undefined): string => {
  if (!embedCode) return "";
  const srcMatch = embedCode.match(/src="([^"]*)"/);
  return srcMatch ? srcMatch[1] : "";
};

export default function AdminPropertyPost(props: Props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const listing = data.properties;

  const galleryImages = listing.gallery_image_urls || [];
  const floorplanImages = listing.floorplan_image_urls || [];
  const mapSrc = extractMapsSrc(listing.google_maps_embed_link);

  // The schema for key_highlights is rich text, so we don't split it.
  // If it were a string, we would do:
  // const highlights = listing.key_highlights ? listing.key_highlights.split(',').map(h => h.trim()).filter(h => h) : [];
  const configurations = listing.unit_configurations
    ? listing.unit_configurations
        .split(",")
        .map((c) => c.trim())
        .filter((c) => c)
    : [];

  // Map listing status to theme-aligned badge styles
  const normalizedStatus = (listing.project_status || "").toLowerCase().trim();
  const statusStyles: Record<string, string> = {
    "under construction":
      "border-space-yellow text-gray-900 bg-space-yellow/90 dark:text-gray-900 dark:border-space-yellow dark:bg-space-yellow/90",
    "ready to move":
      "border-space-red text-white bg-space-red dark:border-space-yellow dark:text-gray-900 dark:bg-space-yellow/90",
    "new launch":
      "border-space-stone text-white bg-space-stone dark:border-whitesmoke dark:text-gray-900 dark:bg-whitesmoke/90",
    "sold out":
      "border-gray-400 text-white bg-gray-500 dark:border-gray-400 dark:text-gray-900 dark:bg-gray-300",
  };
  const badgeClass =
    statusStyles[normalizedStatus] ||
    "border-gray-400 text-white bg-gray-600 dark:text-gray-900 dark:bg-gray-300 dark:border-gray-400";

  return (
    <div className="page-content">
      <article className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 text-center">
          <h1
            className="sigmar-ff text-balance mb-4 leading-tight"
            data-tina-field={tinaField(listing, "project_name")}
          >
            {listing.project_name}
          </h1>

          {listing.project_status && (
            <div className="flex justify-center mb-4">
              <span
                className={`tag rounded-full text-sm px-4 py-2 border-2 shadow-lg kanit-medium font-bold ${badgeClass}`}
                data-tina-field={tinaField(listing, "project_status")}
              >
                {listing.project_status}
              </span>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm sm:text-base kanit-regular">
            {listing.location_area && (
              <p
                className="text-gray-600 dark:text-gray-300 flex items-center gap-2"
                data-tina-field={tinaField(listing, "location_area")}
              >
                <span className="text-lg">📍</span>
                <span>{listing.location_area}</span>
              </p>
            )}
            {listing.developer_name && (
              <p
                className="text-gray-600 dark:text-gray-300"
                data-tina-field={tinaField(listing, "developer_name")}
              >
                by{" "}
                <strong className="text-gray-900 dark:text-white kanit-bold">
                  {listing.developer_name}
                </strong>
              </p>
            )}
          </div>
        </div>

        {/* Gallery Section */}
        {galleryImages.length > 0 && (
          <div
            className="my-8"
            data-tina-field={tinaField(listing, "gallery_image_urls")}
          >
            {/* Simplified Image Carousel for Tina preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {galleryImages.map((url, i) =>
                url ? (
                  <img
                    key={i}
                    src={url}
                    alt={`${listing.project_name} - Image ${i + 1}`}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Price & Key Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-12">
          {/* Pricing Card */}
          {(listing.base_price_min_lakhs ||
            listing.base_price_max_lakhs ||
            listing.price_per_sqft) && (
            <div className="bg-white/90 dark:bg-gray-800/70 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white kanit-bold">
                Pricing
              </h2>
              <div className="space-y-4">
                {listing.base_price_min_lakhs &&
                  listing.base_price_max_lakhs && (
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 kanit-regular">
                        Price Range
                      </p>
                      <p className="text-3xl sm:text-4xl font-bold text-space-red dark:text-space-yellow kanit-bold">
                        <span
                          data-tina-field={tinaField(
                            listing,
                            "base_price_min_lakhs"
                          )}
                        >
                          ₹{listing.base_price_min_lakhs}L
                        </span>{" "}
                        -{" "}
                        <span
                          data-tina-field={tinaField(
                            listing,
                            "base_price_max_lakhs"
                          )}
                        >
                          ₹{listing.base_price_max_lakhs}L
                        </span>
                      </p>
                    </div>
                  )}
                {listing.price_per_sqft && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 kanit-regular">
                      Price per sq.ft
                    </p>
                    <p
                      className="text-xl font-semibold text-gray-900 dark:text-white kanit-semibold"
                      data-tina-field={tinaField(listing, "price_per_sqft")}
                    >
                      ₹{listing.price_per_sqft}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Project Details Card */}
          {(listing.total_area_acres ||
            listing.total_units ||
            listing.possession_date ||
            listing.rera_number) && (
            <div className="bg-gray-50/90 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white kanit-bold">
                Project Details
              </h2>
              <div className="space-y-4 text-sm sm:text-base kanit-regular">
                {listing.total_area_acres && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Area:
                    </span>
                    <span
                      className="font-semibold text-gray-900 dark:text-white kanit-semibold"
                      data-tina-field={tinaField(
                        listing,
                        "total_area_acres"
                      )}
                    >
                      {listing.total_area_acres} Acres
                    </span>
                  </div>
                )}
                {listing.total_units && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Total Units:
                    </span>
                    <span
                      className="font-semibold text-gray-900 dark:text-white kanit-semibold"
                      data-tina-field={tinaField(listing, "total_units")}
                    >
                      {listing.total_units}
                    </span>
                  </div>
                )}
                {listing.possession_date && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">
                      Possession Date:
                    </span>
                    <span
                      className="font-semibold text-gray-900 dark:text-white kanit-semibold"
                      data-tina-field={tinaField(listing, "possession_date")}
                    >
                      <FormattedDate date={listing.possession_date} />
                    </span>
                  </div>
                )}
                {listing.rera_number && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      RERA Number:
                    </span>
                    <span
                      className="font-semibold text-xs sm:text-sm text-gray-900 dark:text-white break-all kanit-semibold"
                      data-tina-field={tinaField(listing, "rera_number")}
                    >
                      {listing.rera_number}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Unit Configurations */}
        {configurations.length > 0 && (
          <div
            className="my-12"
            data-tina-field={tinaField(listing, "unit_configurations")}
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Unit Configurations
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {configurations.map((config, i) => (
                <span
                  key={i}
                  className="px-5 py-2.5 bg-green-100 dark:bg-green-900/50 text-green-900 dark:text-green-100 border-2 border-green-200 dark:border-green-800 rounded-full font-semibold text-sm sm:text-base kanit-semibold"
                >
                  {config}
                </span>
              ))}
            </div>
            {listing.min_size_sqft && listing.max_size_sqft && (
              <p className="mt-6 text-gray-600 dark:text-gray-300 text-sm sm:text-base text-center kanit-regular">
                Size Range:{" "}
                <strong className="text-gray-900 dark:text-white kanit-bold">
                  <span
                    data-tina-field={tinaField(listing, "min_size_sqft")}
                  >
                    {listing.min_size_sqft}
                  </span>{" "}
                  -{" "}
                  <span
                    data-tina-field={tinaField(listing, "max_size_sqft")}
                  >
                    {listing.max_size_sqft}
                  </span>{" "}
                  sq.ft
                </strong>
              </p>
            )}
          </div>
        )}

        {/* Key Highlights */}
        {listing.key_highlights && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Key Highlights
            </h2>
            <div
              className="prose prose-gray dark:prose-invert max-w-3xl mx-auto"
              data-tina-field={tinaField(listing, "key_highlights")}
            >
              <TinaMarkdown content={listing.key_highlights} />
            </div>
          </div>
        )}

        {/* Project Description */}
        {listing.project_description && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              About the Project
            </h2>
            <div
              className="prose prose-gray dark:prose-invert max-w-3xl mx-auto"
              data-tina-field={tinaField(listing, "project_description")}
            >
              <TinaMarkdown content={listing.project_description} />
            </div>
          </div>
        )}

        {/* Floor Plans */}
        {floorplanImages.length > 0 && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Floor Plans
            </h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
              data-tina-field={tinaField(listing, "floorplan_image_urls")}
            >
              {floorplanImages.map((image, index) =>
                image ? (
                  <img
                    key={index}
                    src={image}
                    alt={`Floor Plan ${index + 1}`}
                    className="w-full rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
                    loading="lazy"
                  />
                ) : null
              )}
            </div>
          </div>
        )}

        {/* Video */}
        {listing.video_link && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Video Tour
            </h2>
            <div
              className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
              data-tina-field={tinaField(listing, "video_link")}
            >
              <iframe
                src={listing.video_link.replace("watch?v=", "embed/")}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Location Map */}
        {mapSrc && listing.full_address && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Location
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300 mb-6 text-sm sm:text-base text-center kanit-regular"
              data-tina-field={tinaField(listing, "full_address")}
            >
              {listing.full_address}
            </p>
            <div
              className="aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto"
              data-tina-field={tinaField(listing, "google_maps_embed_link")}
            >
              <iframe
                src={mapSrc}
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}

        {/* Main Body Content from MDX */}
        {listing.body && (
          <div className="my-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-white text-center kanit-bold">
              Additional Details
            </h2>
            <div
              className="prose prose-gray dark:prose-invert max-w-3xl mx-auto"
              data-tina-field={tinaField(listing, "body")}
            >
              <TinaMarkdown content={listing.body} />
            </div>
          </div>
        )}
      </article>
    </div>
  );
}