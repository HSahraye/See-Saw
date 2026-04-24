-- SeeSaw Enterprise Concept schema (MySQL-compatible)
-- Includes original CSC648 marketplace entities plus social/enterprise extensions.

CREATE TABLE User (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  role ENUM('student', 'admin') DEFAULT 'student',
  is_active BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Profile (
  profile_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  avatar_url VARCHAR(255),
  cover_url VARCHAR(255),
  major VARCHAR(120),
  year_label VARCHAR(40),
  bio TEXT,
  campus VARCHAR(120),
  joined_date DATE,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Category (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE ConditionLevel (
  condition_id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE Listing (
  listing_id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  category_id INT NOT NULL,
  condition_id INT NOT NULL,
  title VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  listing_type ENUM('fixed', 'auction') NOT NULL DEFAULT 'fixed',
  status ENUM('active', 'sold', 'removed') DEFAULT 'active',
  campus_pickup BOOLEAN DEFAULT TRUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES User(user_id),
  FOREIGN KEY (category_id) REFERENCES Category(category_id),
  FOREIGN KEY (condition_id) REFERENCES ConditionLevel(condition_id)
);

CREATE TABLE Listing_Image (
  image_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255),
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id)
);

CREATE TABLE Tag (
  tag_id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE Listing_Tag (
  listing_tag_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (tag_id) REFERENCES Tag(tag_id)
);

CREATE TABLE Course (
  course_id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(30) NOT NULL UNIQUE,
  title VARCHAR(180) NOT NULL
);

CREATE TABLE Listing_Course (
  listing_course_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  course_id INT NOT NULL,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE Bid (
  bid_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  bidder_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  status ENUM('active', 'winning', 'outbid') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (bidder_id) REFERENCES User(user_id)
);

CREATE TABLE `Order` (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  buyer_id INT NOT NULL,
  seller_id INT NOT NULL,
  final_price DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
  completed_at DATETIME NULL,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (buyer_id) REFERENCES User(user_id),
  FOREIGN KEY (seller_id) REFERENCES User(user_id)
);

CREATE TABLE Wishlist (
  wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Wishlist_Item (
  wishlist_item_id INT AUTO_INCREMENT PRIMARY KEY,
  wishlist_id INT NOT NULL,
  listing_id INT NOT NULL,
  FOREIGN KEY (wishlist_id) REFERENCES Wishlist(wishlist_id),
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id)
);

CREATE TABLE Message (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  thread_id VARCHAR(64) NOT NULL,
  listing_id INT,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  body TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (sender_id) REFERENCES User(user_id),
  FOREIGN KEY (receiver_id) REFERENCES User(user_id)
);

CREATE TABLE Review (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  listing_id INT NOT NULL,
  reviewer_id INT NOT NULL,
  reviewee_id INT NOT NULL,
  rating TINYINT NOT NULL,
  comment TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id),
  FOREIGN KEY (reviewer_id) REFERENCES User(user_id),
  FOREIGN KEY (reviewee_id) REFERENCES User(user_id)
);

CREATE TABLE Reaction (
  reaction_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  target_type ENUM('listing', 'post', 'comment') NOT NULL,
  target_id INT NOT NULL,
  reaction_type ENUM('like', 'helpful') DEFAULT 'like',
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Comment (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  target_type ENUM('listing', 'post') NOT NULL,
  target_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Notification (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  type VARCHAR(40) NOT NULL,
  title VARCHAR(180) NOT NULL,
  body TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE Report (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  reporter_id INT NOT NULL,
  reported_user_id INT NULL,
  listing_id INT NULL,
  reason TEXT NOT NULL,
  status ENUM('open', 'reviewing', 'resolved') DEFAULT 'open',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reporter_id) REFERENCES User(user_id),
  FOREIGN KEY (reported_user_id) REFERENCES User(user_id),
  FOREIGN KEY (listing_id) REFERENCES Listing(listing_id)
);

CREATE TABLE SFSU_Verification (
  verification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  university_email VARCHAR(255) NOT NULL,
  verified BOOLEAN DEFAULT FALSE,
  verified_at DATETIME NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- Enterprise/social expansion tables.

CREATE TABLE StudentPost (
  post_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  image_path VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  visibility ENUM('campus', 'public-school', 'private') DEFAULT 'campus',
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE PostLike (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES StudentPost(post_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE PostComment (
  comment_id INT AUTO_INCREMENT PRIMARY KEY,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES StudentPost(post_id),
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE ProfileBadge (
  badge_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  badge_type VARCHAR(60) NOT NULL,
  label VARCHAR(80) NOT NULL,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE TrustScore (
  trust_score_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL UNIQUE,
  rating_average DECIMAL(3,2) DEFAULT 0.00,
  completed_sales INT DEFAULT 0,
  response_rate INT DEFAULT 0,
  report_count INT DEFAULT 0,
  verification_level VARCHAR(40) DEFAULT 'basic',
  score INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE UniversityTenant (
  tenant_id INT AUTO_INCREMENT PRIMARY KEY,
  university_name VARCHAR(180) NOT NULL,
  domain VARCHAR(180) NOT NULL UNIQUE,
  logo_path VARCHAR(255),
  portal_embed_enabled BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE VerificationRequest (
  request_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  university_email VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  token VARCHAR(255) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  verified_at DATETIME NULL,
  FOREIGN KEY (user_id) REFERENCES User(user_id)
);

CREATE TABLE CampusMeetupSpot (
  spot_id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  name VARCHAR(120) NOT NULL,
  address VARCHAR(255) NOT NULL,
  safety_level VARCHAR(40) NOT NULL,
  description TEXT,
  FOREIGN KEY (tenant_id) REFERENCES UniversityTenant(tenant_id)
);

CREATE TABLE PortalEmbedConfig (
  config_id INT AUTO_INCREMENT PRIMARY KEY,
  tenant_id INT NOT NULL,
  allowed_domains TEXT NOT NULL,
  theme_color VARCHAR(20) NOT NULL,
  sso_enabled BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (tenant_id) REFERENCES UniversityTenant(tenant_id)
);
