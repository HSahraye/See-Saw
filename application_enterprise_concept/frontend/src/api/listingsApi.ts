import type { Listing } from '../types/models';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5001';

interface FlaskListing {
  listing_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  listing_type: 'fixed' | 'auction';
  image_url: string;
  seller_id: string;
  course_code: string;
  tags: string[];
  status: 'active' | 'sold';
}

const CATEGORY_ID_BY_NAME: Record<string, string> = {
  Textbooks: 'c1',
  Electronics: 'c2',
  'Dorm Supplies': 'c3',
  Furniture: 'c4',
  'SFSU Merch': 'c5',
  'Course Materials': 'c6',
  Services: 'c7',
  'Graduation Tickets': 'c8',
};

const CONDITION_ID_BY_NAME: Record<string, string> = {
  new: 'cond1',
  'like new': 'cond2',
  good: 'cond3',
  fair: 'cond4',
};

function mapFlaskListingToFrontend(listing: FlaskListing): Listing {
  return {
    listing_id: listing.listing_id,
    seller_id: listing.seller_id,
    title: listing.title,
    description: listing.description,
    price: listing.price,
    listing_type: listing.listing_type,
    category_id: CATEGORY_ID_BY_NAME[listing.category] ?? 'c6',
    condition_id: CONDITION_ID_BY_NAME[listing.condition] ?? 'cond3',
    course_codes: listing.course_code ? [listing.course_code] : [],
    tags: listing.tags ?? [],
    image_urls: [listing.image_url],
    status: listing.status ?? 'active',
    campus_pickup: true,
    created_at: new Date().toISOString().slice(0, 10),
  };
}

export async function getListings(): Promise<Listing[]> {
  const response = await fetch(`${API_BASE_URL}/api/listings`);
  if (!response.ok) {
    throw new Error(`Unable to load listings: ${response.status}`);
  }
  const data = (await response.json()) as FlaskListing[];
  return data.map(mapFlaskListingToFrontend);
}

export async function getListingById(listingId: string): Promise<Listing> {
  const response = await fetch(`${API_BASE_URL}/api/listings/${listingId}`);
  if (!response.ok) {
    throw new Error(`Unable to load listing ${listingId}: ${response.status}`);
  }
  const data = (await response.json()) as FlaskListing;
  return mapFlaskListingToFrontend(data);
}
