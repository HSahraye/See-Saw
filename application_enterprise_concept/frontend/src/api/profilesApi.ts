const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5001';

export interface FlaskProfile {
  user_id: string;
  name: string;
  email: string;
  avatar_url: string;
  cover_url: string;
  major: string;
  year: string;
  bio: string;
  joined_at: string;
  is_verified: boolean;
  trust_score: number;
  rating: number;
  total_sales: number;
  response_rate: number;
  badges: string[];
  preferred_meetup_spots: string[];
  courses: string[];
}

export async function getProfileById(userId: string): Promise<FlaskProfile> {
  const response = await fetch(`${API_BASE_URL}/api/profiles/${userId}`);
  if (!response.ok) {
    throw new Error(`Unable to load profile ${userId}: ${response.status}`);
  }
  return (await response.json()) as FlaskProfile;
}
