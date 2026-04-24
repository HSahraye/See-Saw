import type {
  Bid,
  CampusMeetupSpot,
  Category,
  Comment,
  Condition,
  Course,
  Listing,
  Message,
  Notification,
  PostComment,
  PostLike,
  Profile,
  ProfileBadge,
  Reaction,
  Report,
  Review,
  SFSUVerification,
  StudentPost,
  TrustScore,
  UniversityTenant,
  User,
  VerificationRequest,
  Wishlist,
  WishlistItem,
} from '../types/models';

// TODO(backend-integration): replace these in-memory exports with typed API calls to Flask routes.
export const classComplianceBanner =
  'SFSU Software Engineering Project CSC 648-848, Spring 2026. For Demonstration Only';

export const users: User[] = [
  { user_id: 'u1', email: 'maya@sfsu.edu', full_name: 'Maya Nguyen', role: 'student', is_active: true, created_at: '2025-08-20' },
  { user_id: 'u2', email: 'luis@sfsu.edu', full_name: 'Luis Hernandez', role: 'student', is_active: true, created_at: '2025-08-22' },
  { user_id: 'u3', email: 'rina@sfsu.edu', full_name: 'Rina Patel', role: 'student', is_active: true, created_at: '2025-08-24' },
  { user_id: 'u4', email: 'derek@sfsu.edu', full_name: 'Derek Kim', role: 'student', is_active: true, created_at: '2025-08-25' },
  { user_id: 'u5', email: 'ella@sfsu.edu', full_name: 'Ella Tran', role: 'student', is_active: true, created_at: '2025-08-27' },
  { user_id: 'u6', email: 'omar@sfsu.edu', full_name: 'Omar Ali', role: 'student', is_active: true, created_at: '2025-08-29' },
];

export const profiles: Profile[] = [
  {
    profile_id: 'p1',
    user_id: 'u1',
    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300',
    cover_url: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200',
    major: 'Computer Science',
    year: 'Senior',
    bio: 'Building student apps and flipping clean electronics around campus.',
    campus: 'SFSU Main Campus',
    response_rate: 98,
    joined_date: '2024-01-10',
  },
  {
    profile_id: 'p2',
    user_id: 'u2',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    cover_url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200',
    major: 'Business Administration',
    year: 'Junior',
    bio: 'Dorm-friendly setup specialist. Always open to bundle deals.',
    campus: 'SFSU Main Campus',
    response_rate: 93,
    joined_date: '2024-03-17',
  },
  {
    profile_id: 'p3',
    user_id: 'u3',
    avatar_url: 'https://images.unsplash.com/photo-1542204625-de293a0f3d98?w=300',
    cover_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200',
    major: 'Biology',
    year: 'Senior',
    bio: 'Lab materials and science notes, organized and affordable.',
    campus: 'SFSU Main Campus',
    response_rate: 95,
    joined_date: '2023-11-02',
  },
  {
    profile_id: 'p4',
    user_id: 'u4',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    cover_url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200',
    major: 'Computer Engineering',
    year: 'Sophomore',
    bio: 'Auction-first seller for gadgets and keyboard gear.',
    campus: 'SFSU Main Campus',
    response_rate: 89,
    joined_date: '2025-01-12',
  },
  {
    profile_id: 'p5',
    user_id: 'u5',
    avatar_url: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300',
    cover_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
    major: 'Mathematics',
    year: 'Senior',
    bio: 'Textbook quality checker and tutoring side hustler.',
    campus: 'SFSU Main Campus',
    response_rate: 99,
    joined_date: '2023-09-01',
  },
  {
    profile_id: 'p6',
    user_id: 'u6',
    avatar_url: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300',
    cover_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200',
    major: 'Marketing',
    year: 'Junior',
    bio: 'Event merch and grad ticket exchange coordinator.',
    campus: 'SFSU Main Campus',
    response_rate: 91,
    joined_date: '2024-02-18',
  },
];

export const categories: Category[] = [
  { category_id: 'c1', name: 'Textbooks' },
  { category_id: 'c2', name: 'Electronics' },
  { category_id: 'c3', name: 'Dorm Supplies' },
  { category_id: 'c4', name: 'Furniture' },
  { category_id: 'c5', name: 'SFSU Merch' },
  { category_id: 'c6', name: 'Course Materials' },
  { category_id: 'c7', name: 'Services' },
  { category_id: 'c8', name: 'Graduation Tickets' },
];

export const conditions: Condition[] = [
  { condition_id: 'cond1', label: 'new' },
  { condition_id: 'cond2', label: 'like new' },
  { condition_id: 'cond3', label: 'good' },
  { condition_id: 'cond4', label: 'fair' },
];

export const courses: Course[] = [
  { course_id: 'course1', code: 'CSC 648', title: 'Software Engineering' },
  { course_id: 'course2', code: 'CSC 413', title: 'Software Development' },
  { course_id: 'course3', code: 'MATH 226', title: 'Calculus II' },
  { course_id: 'course4', code: 'BUS 300', title: 'Business Communication' },
  { course_id: 'course5', code: 'BIOL 230', title: 'Intro Biology' },
];

export const listings: Listing[] = [
  {
    listing_id: 'l1',
    seller_id: 'u1',
    title: 'CSC 648 Team Workflow Notes',
    description: 'Complete notes + sprint templates used in class projects.',
    price: 25,
    listing_type: 'fixed',
    category_id: 'c6',
    condition_id: 'cond2',
    course_codes: ['CSC 648'],
    tags: ['software engineering', 'notes'],
    image_urls: ['https://images.unsplash.com/photo-1456324463128-7ff6903988d8?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-01',
  },
  {
    listing_id: 'l2',
    seller_id: 'u2',
    title: 'TI-84 Plus Graphing Calculator',
    description: 'Works perfectly, includes charger and case.',
    price: 70,
    listing_type: 'fixed',
    category_id: 'c2',
    condition_id: 'cond3',
    course_codes: ['MATH 226'],
    tags: ['calculator', 'math'],
    image_urls: ['https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-03',
  },
  {
    listing_id: 'l3',
    seller_id: 'u3',
    title: 'Biology Lab Coat + Goggles',
    description: 'Used one semester, sanitized and ready.',
    price: 30,
    listing_type: 'fixed',
    category_id: 'c3',
    condition_id: 'cond2',
    course_codes: ['BIOL 230'],
    tags: ['lab', 'biology'],
    image_urls: ['https://images.unsplash.com/photo-1582719478170-0f66f5d9ffb2?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-06',
  },
  {
    listing_id: 'l4',
    seller_id: 'u4',
    title: 'Custom Mechanical Keyboard',
    description: '75% keyboard with tactile switches. Auction closes Friday.',
    price: 95,
    listing_type: 'auction',
    category_id: 'c2',
    condition_id: 'cond2',
    course_codes: ['CSC 413'],
    tags: ['keyboard', 'setup'],
    image_urls: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-07',
  },
  {
    listing_id: 'l5',
    seller_id: 'u5',
    title: 'MATH 226 Textbook 7th Edition',
    description: 'No highlights, includes practice exam booklet.',
    price: 42,
    listing_type: 'fixed',
    category_id: 'c1',
    condition_id: 'cond3',
    course_codes: ['MATH 226'],
    tags: ['textbook'],
    image_urls: ['https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-10',
  },
  {
    listing_id: 'l6',
    seller_id: 'u6',
    title: 'Graduation Ceremony Ticket',
    description: 'One extra ticket for family. Transfer on campus only.',
    price: 55,
    listing_type: 'auction',
    category_id: 'c8',
    condition_id: 'cond1',
    course_codes: [],
    tags: ['graduation', 'event'],
    image_urls: ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-11',
  },
  {
    listing_id: 'l7',
    seller_id: 'u1',
    title: 'SFSU Hoodie Limited Drop',
    description: 'Official merch in charcoal gray, size M.',
    price: 38,
    listing_type: 'fixed',
    category_id: 'c5',
    condition_id: 'cond2',
    course_codes: [],
    tags: ['hoodie', 'merch'],
    image_urls: ['https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=900'],
    status: 'sold',
    campus_pickup: true,
    created_at: '2026-02-23',
  },
  {
    listing_id: 'l8',
    seller_id: 'u2',
    title: 'Dorm Mini Fridge',
    description: 'Energy efficient. Great for suite setup.',
    price: 85,
    listing_type: 'fixed',
    category_id: 'c4',
    condition_id: 'cond3',
    course_codes: [],
    tags: ['dorm', 'appliance'],
    image_urls: ['https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=900'],
    status: 'active',
    campus_pickup: false,
    created_at: '2026-03-13',
  },
  {
    listing_id: 'l9',
    seller_id: 'u3',
    title: 'BUS 300 Presentation Slide Deck',
    description: 'Template + real sample deck graded A.',
    price: 15,
    listing_type: 'fixed',
    category_id: 'c6',
    condition_id: 'cond1',
    course_codes: ['BUS 300'],
    tags: ['templates', 'presentation'],
    image_urls: ['https://images.unsplash.com/photo-1552664730-d307ca884978?w=900'],
    status: 'active',
    campus_pickup: false,
    created_at: '2026-03-14',
  },
  {
    listing_id: 'l10',
    seller_id: 'u4',
    title: 'Desk Lamp + Cable Organizer Kit',
    description: 'Minimal desk setup bundle.',
    price: 20,
    listing_type: 'fixed',
    category_id: 'c3',
    condition_id: 'cond2',
    course_codes: [],
    tags: ['desk', 'dorm'],
    image_urls: ['https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-15',
  },
  {
    listing_id: 'l11',
    seller_id: 'u5',
    title: 'CSC 413 Weekly Tutoring Session',
    description: 'One-hour session, remote or campus meetup.',
    price: 30,
    listing_type: 'fixed',
    category_id: 'c7',
    condition_id: 'cond1',
    course_codes: ['CSC 413'],
    tags: ['tutoring', 'services'],
    image_urls: ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900'],
    status: 'active',
    campus_pickup: false,
    created_at: '2026-03-16',
  },
  {
    listing_id: 'l12',
    seller_id: 'u6',
    title: 'Adjustable Standing Desk',
    description: 'Solid condition, pickup near dorm lobby.',
    price: 120,
    listing_type: 'auction',
    category_id: 'c4',
    condition_id: 'cond3',
    course_codes: [],
    tags: ['furniture', 'desk'],
    image_urls: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=900'],
    status: 'active',
    campus_pickup: true,
    created_at: '2026-03-17',
  },
];

export const posts: StudentPost[] = [
  { post_id: 'sp1', user_id: 'u1', content: 'Wrapped another campus meetup with a safe handoff at the library.', image_path: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900', created_at: '2026-03-18', visibility: 'campus' },
  { post_id: 'sp2', user_id: 'u2', content: 'Dorm setup upgrade day. Listing a few extras this weekend.', image_path: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=900', created_at: '2026-03-18', visibility: 'campus' },
  { post_id: 'sp3', user_id: 'u3', content: 'BIOL 230 prep packs are now ready. DM for details.', image_path: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=900', created_at: '2026-03-17', visibility: 'campus' },
  { post_id: 'sp4', user_id: 'u4', content: 'Keyboard auction closing soon. Highest bid wins!', image_path: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=900', created_at: '2026-03-17', visibility: 'campus' },
  { post_id: 'sp5', user_id: 'u5', content: 'Math final week: posting solved examples tonight.', image_path: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900', created_at: '2026-03-16', visibility: 'campus' },
  { post_id: 'sp6', user_id: 'u6', content: 'Graduation ticket exchange is active. Please use verified profiles only.', image_path: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900', created_at: '2026-03-15', visibility: 'campus' },
  { post_id: 'sp7', user_id: 'u1', content: 'New listing: software engineering retrospective templates.', image_path: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=900', created_at: '2026-03-14', visibility: 'campus' },
  { post_id: 'sp8', user_id: 'u3', content: 'Lab safety meetup spot recommendation: Student Center lobby.', image_path: 'https://images.unsplash.com/photo-1517519014922-8fc06b814ca0?w=900', created_at: '2026-03-13', visibility: 'campus' },
];

export const postLikes: PostLike[] = [
  { like_id: 'pl1', post_id: 'sp1', user_id: 'u2', created_at: '2026-03-18' },
  { like_id: 'pl2', post_id: 'sp1', user_id: 'u4', created_at: '2026-03-18' },
  { like_id: 'pl3', post_id: 'sp2', user_id: 'u1', created_at: '2026-03-18' },
  { like_id: 'pl4', post_id: 'sp3', user_id: 'u5', created_at: '2026-03-18' },
  { like_id: 'pl5', post_id: 'sp4', user_id: 'u6', created_at: '2026-03-18' },
];

export const postComments: PostComment[] = [
  { comment_id: 'pc1', post_id: 'sp1', user_id: 'u5', content: 'Library handoff spot is always smooth.', created_at: '2026-03-18' },
  { comment_id: 'pc2', post_id: 'sp2', user_id: 'u3', content: 'Drop your desk lamp link please.', created_at: '2026-03-18' },
  { comment_id: 'pc3', post_id: 'sp4', user_id: 'u1', content: 'Current top bid?', created_at: '2026-03-17' },
  { comment_id: 'pc4', post_id: 'sp6', user_id: 'u2', content: 'Great reminder on verification.', created_at: '2026-03-15' },
];

export const profileBadges: ProfileBadge[] = [
  { badge_id: 'b1', user_id: 'u1', badge_type: 'verified', label: 'Verified Student', earned_at: '2024-01-12' },
  { badge_id: 'b2', user_id: 'u1', badge_type: 'seller', label: 'Top Seller', earned_at: '2025-02-12' },
  { badge_id: 'b3', user_id: 'u1', badge_type: 'response', label: 'Fast Responder', earned_at: '2025-11-09' },
  { badge_id: 'b4', user_id: 'u1', badge_type: 'safety', label: 'Safe Meetup', earned_at: '2026-01-04' },
  { badge_id: 'b5', user_id: 'u2', badge_type: 'verified', label: 'Verified Student', earned_at: '2024-03-17' },
  { badge_id: 'b6', user_id: 'u3', badge_type: 'verified', label: 'Verified Student', earned_at: '2023-11-05' },
];

export const trustScores: TrustScore[] = [
  { trust_score_id: 'ts1', user_id: 'u1', rating_average: 4.9, completed_sales: 21, response_rate: 98, report_count: 0, verification_level: 'gold', score: 96 },
  { trust_score_id: 'ts2', user_id: 'u2', rating_average: 4.6, completed_sales: 14, response_rate: 93, report_count: 0, verification_level: 'silver', score: 88 },
  { trust_score_id: 'ts3', user_id: 'u3', rating_average: 4.8, completed_sales: 17, response_rate: 95, report_count: 0, verification_level: 'gold', score: 92 },
  { trust_score_id: 'ts4', user_id: 'u4', rating_average: 4.4, completed_sales: 9, response_rate: 89, report_count: 1, verification_level: 'silver', score: 79 },
  { trust_score_id: 'ts5', user_id: 'u5', rating_average: 4.9, completed_sales: 26, response_rate: 99, report_count: 0, verification_level: 'gold', score: 97 },
  { trust_score_id: 'ts6', user_id: 'u6', rating_average: 4.5, completed_sales: 11, response_rate: 91, report_count: 0, verification_level: 'silver', score: 84 },
];

export const reviews: Review[] = [
  { review_id: 'r1', listing_id: 'l7', reviewer_id: 'u2', reviewee_id: 'u1', rating: 5, comment: 'Exactly as described, quick handoff.', created_at: '2026-02-28' },
  { review_id: 'r2', listing_id: 'l5', reviewer_id: 'u1', reviewee_id: 'u5', rating: 5, comment: 'Book condition was excellent.', created_at: '2026-03-01' },
  { review_id: 'r3', listing_id: 'l8', reviewer_id: 'u4', reviewee_id: 'u2', rating: 4, comment: 'Good seller and fair price.', created_at: '2026-03-03' },
  { review_id: 'r4', listing_id: 'l3', reviewer_id: 'u6', reviewee_id: 'u3', rating: 5, comment: 'Lab kit was super clean.', created_at: '2026-03-05' },
];

export const comments: Comment[] = [
  { comment_id: 'co1', user_id: 'u2', target_type: 'listing', target_id: 'l1', content: 'Still available for pickup today?', created_at: '2026-03-02' },
  { comment_id: 'co2', user_id: 'u5', target_type: 'listing', target_id: 'l4', content: 'Can you share the switch type?', created_at: '2026-03-08' },
  { comment_id: 'co3', user_id: 'u1', target_type: 'listing', target_id: 'l6', content: 'Is transfer handled at Student Center?', created_at: '2026-03-12' },
];

export const reactions: Reaction[] = [
  { reaction_id: 're1', user_id: 'u3', target_type: 'listing', target_id: 'l1', reaction_type: 'like' },
  { reaction_id: 're2', user_id: 'u6', target_type: 'listing', target_id: 'l1', reaction_type: 'like' },
  { reaction_id: 're3', user_id: 'u2', target_type: 'listing', target_id: 'l4', reaction_type: 'like' },
];

export const bids: Bid[] = [
  { bid_id: 'bid1', listing_id: 'l4', bidder_id: 'u1', amount: 104, created_at: '2026-03-18', status: 'active' },
  { bid_id: 'bid2', listing_id: 'l4', bidder_id: 'u5', amount: 110, created_at: '2026-03-18', status: 'winning' },
  { bid_id: 'bid3', listing_id: 'l6', bidder_id: 'u2', amount: 63, created_at: '2026-03-18', status: 'winning' },
];

export const wishlists: Wishlist[] = [
  { wishlist_id: 'w1', user_id: 'u1', created_at: '2026-02-01' },
  { wishlist_id: 'w2', user_id: 'u3', created_at: '2026-02-11' },
];

export const wishlistItems: WishlistItem[] = [
  { wishlist_item_id: 'wi1', wishlist_id: 'w1', listing_id: 'l12' },
  { wishlist_item_id: 'wi2', wishlist_id: 'w1', listing_id: 'l8' },
  { wishlist_item_id: 'wi3', wishlist_id: 'w2', listing_id: 'l2' },
];

export const messages: Message[] = [
  { message_id: 'm1', thread_id: 't1', listing_id: 'l4', sender_id: 'u1', receiver_id: 'u4', body: 'Hey Derek, can you meet near the Quad at 3pm?', created_at: '2026-03-18 10:15' },
  { message_id: 'm2', thread_id: 't1', listing_id: 'l4', sender_id: 'u4', receiver_id: 'u1', body: 'Yes, I can do 3:15 by the Quad bench.', created_at: '2026-03-18 10:17' },
  { message_id: 'm3', thread_id: 't2', listing_id: 'l2', sender_id: 'u3', receiver_id: 'u2', body: 'Is the calculator firmware updated?', created_at: '2026-03-18 09:03' },
];

export const notifications: Notification[] = [
  { notification_id: 'n1', user_id: 'u1', type: 'outbid', title: 'You were outbid', body: 'Your bid on Custom Mechanical Keyboard was surpassed.', read: false, created_at: '2026-03-18 08:25' },
  { notification_id: 'n2', user_id: 'u1', type: 'winning_bid', title: 'You are winning', body: 'You are currently the top bidder for Graduation Ceremony Ticket.', read: false, created_at: '2026-03-18 09:10' },
  { notification_id: 'n3', user_id: 'u1', type: 'message', title: 'New message from Derek Kim', body: 'Replied about meetup timing for keyboard listing.', read: false, created_at: '2026-03-18 10:17' },
  { notification_id: 'n4', user_id: 'u1', type: 'listing_activity', title: 'Listing liked', body: '2 students liked your CSC 648 notes listing.', read: true, created_at: '2026-03-17 18:55' },
  { notification_id: 'n5', user_id: 'u1', type: 'admin', title: 'Admin review update', body: 'A reported listing in your watchlist has been removed.', read: true, created_at: '2026-03-17 11:05' },
];

export const reports: Report[] = [
  { report_id: 'rep1', reporter_id: 'u5', listing_id: 'l12', reason: 'Suspicious price history change', status: 'open', created_at: '2026-03-18' },
  { report_id: 'rep2', reporter_id: 'u3', reported_user_id: 'u4', reason: 'No show at agreed meetup location', status: 'reviewing', created_at: '2026-03-17' },
  { report_id: 'rep3', reporter_id: 'u2', listing_id: 'l6', reason: 'Potential duplicate graduation ticket posting', status: 'open', created_at: '2026-03-17' },
];

export const sfsuVerifications: SFSUVerification[] = users.map((user) => ({
  verification_id: `v-${user.user_id}`,
  user_id: user.user_id,
  university_email: user.email,
  verified: user.email.endsWith('@sfsu.edu'),
  verified_at: '2025-08-30',
}));

export const universityTenants: UniversityTenant[] = [
  {
    tenant_id: 'tenant1',
    university_name: 'San Francisco State University',
    domain: 'sfsu.edu',
    logo_path: '/static/uploads/sfsu-logo.png',
    portal_embed_enabled: true,
    created_at: '2025-07-01',
  },
];

export const verificationRequests: VerificationRequest[] = [
  {
    request_id: 'vr1',
    user_id: 'u6',
    university_email: 'omar@sfsu.edu',
    status: 'pending',
    token: 'verify-token-omega',
    created_at: '2026-03-17',
    verified_at: null,
  },
];

export const meetupSpots: CampusMeetupSpot[] = [
  { spot_id: 'ms1', tenant_id: 'tenant1', name: 'Library', address: 'J. Paul Leonard Library', safety_level: 'high', description: 'Public entrance with cameras and security nearby.' },
  { spot_id: 'ms2', tenant_id: 'tenant1', name: 'Student Center', address: 'Cesar Chavez Student Center', safety_level: 'high', description: 'High foot traffic and indoor seating.' },
  { spot_id: 'ms3', tenant_id: 'tenant1', name: 'Quad', address: 'Campus Quad Central Walkway', safety_level: 'medium', description: 'Open-air meetup area, best during daytime.' },
  { spot_id: 'ms4', tenant_id: 'tenant1', name: 'Dorm Lobby', address: 'Village at Centennial Square Lobby', safety_level: 'standard', description: 'Convenient pickup for on-campus residents.' },
];

export const currentUserId = 'u1';

export function getUserById(userId: string) {
  return users.find((user) => user.user_id === userId);
}

export function getProfileByUserId(userId: string) {
  return profiles.find((profile) => profile.user_id === userId);
}

export function getListingById(listingId: string) {
  return listings.find((listing) => listing.listing_id === listingId);
}

export function getCategoryById(categoryId: string) {
  return categories.find((category) => category.category_id === categoryId);
}

export function getConditionById(conditionId: string) {
  return conditions.find((condition) => condition.condition_id === conditionId);
}
