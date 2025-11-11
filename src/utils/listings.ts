// Utility functions for fetching and managing property listings from Google Sheets

export interface Listing {
  Listing_ID: string;
  Page_Slug: string;
  Meta_Title: string;
  Meta_Description: string;
  Project_Name: string;
  Property_Type: string;
  Developer_Name: string;
  RERA_Number: string;
  Total_Area_Acres: string;
  Total_Units: string;
  Project_Status: string;
  Possession_Date: string;
  Project_Description: string;
  Key_Highlights: string;
  Unit_Configurations: string;
  Min_Size_Sqft: string;
  Max_Size_Sqft: string;
  Price_Per_Sqft: string;
  Base_Price_Min_Lakhs: string;
  Base_Price_Max_Lakhs: string;
  Location_Area: string;
  Full_Address: string;
  Google_Maps_Embed_Link: string;
  Gallery_Image_URLs: string;
  Floorplan_Image_URLs: string;
  Video_Link: string;
}

// Google Sheets configuration
const SHEET_ID = "11Beqmcp0nY7L0PANlJ4iDzrXePPgk5yH03AlEHNFAs8";
const SHEET_TAB = "Listings"; // Update this if your tab name is different

/**
 * Fetches listings data from Google Sheets using OpenSheet API
 */
export async function fetchListings(): Promise<Listing[]> {
  try {
    const url = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_TAB}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch listings: ${response.statusText}`);
    }

    const data = await response.json();
    return data as Listing[];
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

/**
 * Gets a single listing by its slug
 */
export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const listings = await fetchListings();
  return listings.find((listing) => listing.Page_Slug === slug) || null;
}

/**
 * Formats price range for display
 */
export function formatPriceRange(minPrice: string, maxPrice: string): string {
  if (!minPrice || !maxPrice) return "";

  const min = parseFloat(minPrice);
  const max = parseFloat(maxPrice);

  if (isNaN(min) || isNaN(max)) return "";

  if (min === max) {
    return `₹${min} L`;
  }
  return `₹${min}L - ₹${max}L`;
}

/**
 * Parses comma-separated image URLs
 */
export function parseImageUrls(urls: string): string[] {
  if (!urls) return [];
  return urls
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.length > 0);
}

/**
 * Extracts Google Maps src from embed iframe code
 */
export function extractMapsSrc(embedCode: string): string {
  if (!embedCode) return "";
  const srcMatch = embedCode.match(/src="([^"]*)"/);
  return srcMatch ? srcMatch[1] : "";
}
