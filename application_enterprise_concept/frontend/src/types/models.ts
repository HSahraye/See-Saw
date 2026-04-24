export type ListingType = 'fixed' | 'auction';
export type ConditionLevel = 'new' | 'like new' | 'good' | 'fair';

export interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: 'student' | 'admin';
  is_active: boolean;
  created_at: string;
}

export interface Profile {
  profile_id: string;
  user_id: string;
  avatar_url: string;
  cover_url: string;
  major: string;
  year: string;
  bio: string;
  campus: string;
  response_rate: number;
  joined_date: string;
}

export interface Listing {
  listing_id: string;
  seller_id: string;
  title: string;
  description: string;
  price: number;
  listing_type: ListingType;
  category_id: string;
  condition_id: string;
  course_codes: string[];
  tags: string[];
  image_urls: string[];
  status: 'active' | 'sold';
  campus_pickup: boolean;
  created_at: string;
}

export interface ListingImage {
  image_id: string;
  listing_id: string;
  image_path: string;
  alt_text: string;
}

export interface Category {
  category_id: string;
  name: string;
}

export interface Tag {
  tag_id: string;
  label: string;
}

export interface ListingTag {
  listing_tag_id: string;
  listing_id: string;
  tag_id: string;
}

export interface Condition {
  condition_id: string;
  label: ConditionLevel;
}

export interface Bid {
  bid_id: string;
  listing_id: string;
  bidder_id: string;
  amount: number;
  created_at: string;
  status: 'active' | 'winning' | 'outbid';
}

export interface Order {
  order_id: string;
  listing_id: string;
  buyer_id: string;
  seller_id: string;
  final_price: number;
  status: 'pending' | 'completed' | 'cancelled';
  completed_at: string | null;
}

export interface Wishlist {
  wishlist_id: string;
  user_id: string;
  created_at: string;
}

export interface WishlistItem {
  wishlist_item_id: string;
  wishlist_id: string;
  listing_id: string;
}

export interface Message {
  message_id: string;
  thread_id: string;
  listing_id: string;
  sender_id: string;
  receiver_id: string;
  body: string;
  created_at: string;
}

export interface Review {
  review_id: string;
  listing_id: string;
  reviewer_id: string;
  reviewee_id: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Reaction {
  reaction_id: string;
  user_id: string;
  target_type: 'listing' | 'post' | 'comment';
  target_id: string;
  reaction_type: 'like' | 'helpful';
}

export interface Comment {
  comment_id: string;
  user_id: string;
  target_type: 'listing' | 'post';
  target_id: string;
  content: string;
  created_at: string;
}

export interface Notification {
  notification_id: string;
  user_id: string;
  type: 'outbid' | 'winning_bid' | 'message' | 'listing_activity' | 'admin' | 'verification';
  title: string;
  body: string;
  read: boolean;
  created_at: string;
}

export interface Report {
  report_id: string;
  reporter_id: string;
  reported_user_id?: string;
  listing_id?: string;
  reason: string;
  status: 'open' | 'reviewing' | 'resolved';
  created_at: string;
}

export interface Course {
  course_id: string;
  code: string;
  title: string;
}

export interface SFSUVerification {
  verification_id: string;
  user_id: string;
  university_email: string;
  verified: boolean;
  verified_at: string | null;
}

export interface StudentPost {
  post_id: string;
  user_id: string;
  content: string;
  image_path: string;
  created_at: string;
  visibility: 'campus' | 'public-school' | 'private';
}

export interface PostLike {
  like_id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface PostComment {
  comment_id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface ProfileBadge {
  badge_id: string;
  user_id: string;
  badge_type: string;
  label: string;
  earned_at: string;
}

export interface TrustScore {
  trust_score_id: string;
  user_id: string;
  rating_average: number;
  completed_sales: number;
  response_rate: number;
  report_count: number;
  verification_level: string;
  score: number;
}

export interface UniversityTenant {
  tenant_id: string;
  university_name: string;
  domain: string;
  logo_path: string;
  portal_embed_enabled: boolean;
  created_at: string;
}

export interface VerificationRequest {
  request_id: string;
  user_id: string;
  university_email: string;
  status: 'pending' | 'approved' | 'rejected';
  token: string;
  created_at: string;
  verified_at: string | null;
}

export interface CampusMeetupSpot {
  spot_id: string;
  tenant_id: string;
  name: string;
  address: string;
  safety_level: 'high' | 'medium' | 'standard';
  description: string;
}

export interface PortalEmbedConfig {
  config_id: string;
  tenant_id: string;
  allowed_domains: string[];
  theme_color: string;
  sso_enabled: boolean;
  created_at: string;
}
