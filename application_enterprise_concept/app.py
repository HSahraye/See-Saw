import os

from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder="static", template_folder="templates")
CORS(
    app,
    resources={
        r"/api/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://bright-cactus-2c745b.netlify.app",
            ]
        }
    },
)


LISTINGS = [
    {
        "listing_id": "l1",
        "title": "CSC 648 Team Workflow Notes Bundle",
        "description": "Sprint planning templates, retrospective notes, and backlog examples from CSC 648.",
        "price": 25.0,
        "category": "Course Materials",
        "condition": "like new",
        "listing_type": "fixed",
        "image_url": "https://images.unsplash.com/photo-1456324463128-7ff6903988d8?w=900",
        "seller_id": "u1",
        "seller_name": "Maya Nguyen",
        "seller_major": "Computer Science",
        "is_verified": True,
        "pickup_location": "J. Paul Leonard Library",
        "course_code": "CSC 648",
        "tags": ["software engineering", "notes", "agile"],
        "current_highest_bid": None,
        "created_at": "2026-03-01T10:00:00",
        "status": "active",
    },
    {
        "listing_id": "l2",
        "title": "TI-84 Plus Graphing Calculator",
        "description": "Fully functional TI-84 Plus with case and charger, ideal for MATH 226.",
        "price": 70.0,
        "category": "Electronics",
        "condition": "good",
        "listing_type": "fixed",
        "image_url": "https://images.unsplash.com/photo-1596496050827-8299e0220de1?w=900",
        "seller_id": "u2",
        "seller_name": "Luis Hernandez",
        "seller_major": "Business Administration",
        "is_verified": True,
        "pickup_location": "Student Center",
        "course_code": "MATH 226",
        "tags": ["calculator", "math", "exam prep"],
        "current_highest_bid": None,
        "created_at": "2026-03-03T14:20:00",
        "status": "active",
    },
    {
        "listing_id": "l3",
        "title": "BIOL 230 Lab Coat + Goggles Set",
        "description": "Sanitized lab coat with protective goggles used for one semester.",
        "price": 30.0,
        "category": "Dorm Supplies",
        "condition": "like new",
        "listing_type": "fixed",
        "image_url": "https://images.unsplash.com/photo-1582719478170-0f66f5d9ffb2?w=900",
        "seller_id": "u3",
        "seller_name": "Rina Patel",
        "seller_major": "Biology",
        "is_verified": True,
        "pickup_location": "Quad",
        "course_code": "BIOL 230",
        "tags": ["lab", "biology", "safety gear"],
        "current_highest_bid": None,
        "created_at": "2026-03-06T09:35:00",
        "status": "active",
    },
    {
        "listing_id": "l4",
        "title": "Custom Mechanical Keyboard",
        "description": "75% custom keyboard with tactile switches; auction closes this week.",
        "price": 95.0,
        "category": "Electronics",
        "condition": "like new",
        "listing_type": "auction",
        "image_url": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
        "seller_id": "u4",
        "seller_name": "Derek Kim",
        "seller_major": "Computer Engineering",
        "is_verified": True,
        "pickup_location": "Dorm Lobby",
        "course_code": "CSC 413",
        "tags": ["keyboard", "setup", "auction"],
        "current_highest_bid": 110.0,
        "created_at": "2026-03-07T16:45:00",
        "status": "active",
    },
    {
        "listing_id": "l5",
        "title": "MATH 226 Textbook (7th Edition)",
        "description": "Minimal highlights, includes formula sheet and solved examples booklet.",
        "price": 42.0,
        "category": "Textbooks",
        "condition": "good",
        "listing_type": "fixed",
        "image_url": "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=900",
        "seller_id": "u5",
        "seller_name": "Ella Tran",
        "seller_major": "Mathematics",
        "is_verified": True,
        "pickup_location": "Student Center",
        "course_code": "MATH 226",
        "tags": ["textbook", "calculus", "study"],
        "current_highest_bid": None,
        "created_at": "2026-03-10T11:15:00",
        "status": "active",
    },
    {
        "listing_id": "l6",
        "title": "Graduation Ceremony Ticket",
        "description": "One extra graduation ticket, transfer handled in person on campus.",
        "price": 55.0,
        "category": "Graduation Tickets",
        "condition": "new",
        "listing_type": "auction",
        "image_url": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900",
        "seller_id": "u6",
        "seller_name": "Omar Ali",
        "seller_major": "Marketing",
        "is_verified": True,
        "pickup_location": "J. Paul Leonard Library",
        "course_code": "BUS 300",
        "tags": ["graduation", "ticket", "event"],
        "current_highest_bid": 63.0,
        "created_at": "2026-03-11T18:05:00",
        "status": "active",
    },
]

PROFILES = [
    {
        "user_id": "u1",
        "name": "Maya Nguyen",
        "email": "maya@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
        "cover_url": "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200",
        "major": "Computer Science",
        "year": "Senior",
        "bio": "Building student apps and running safe campus meetup trades.",
        "joined_at": "2024-01-10",
        "is_verified": True,
        "trust_score": 96,
        "rating": 4.9,
        "total_sales": 21,
        "response_rate": 98,
        "badges": ["Verified Student", "Top Seller", "Fast Responder", "Safe Meetup"],
        "preferred_meetup_spots": ["Library", "Student Center"],
        "courses": ["CSC 648", "CSC 413"],
    },
    {
        "user_id": "u2",
        "name": "Luis Hernandez",
        "email": "luis@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
        "cover_url": "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200",
        "major": "Business Administration",
        "year": "Junior",
        "bio": "Dorm setup and electronics bundle seller focused on fair pricing.",
        "joined_at": "2024-03-17",
        "is_verified": True,
        "trust_score": 88,
        "rating": 4.6,
        "total_sales": 14,
        "response_rate": 93,
        "badges": ["Verified Student", "Reliable Seller"],
        "preferred_meetup_spots": ["Student Center", "Quad"],
        "courses": ["BUS 300", "MATH 226"],
    },
    {
        "user_id": "u3",
        "name": "Rina Patel",
        "email": "rina@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1542204625-de293a0f3d98?w=300",
        "cover_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
        "major": "Biology",
        "year": "Senior",
        "bio": "Lab kits, notes, and science resources shared with the campus community.",
        "joined_at": "2023-11-02",
        "is_verified": True,
        "trust_score": 92,
        "rating": 4.8,
        "total_sales": 17,
        "response_rate": 95,
        "badges": ["Verified Student", "Safe Meetup"],
        "preferred_meetup_spots": ["Library", "Quad"],
        "courses": ["BIOL 230", "CSC 648"],
    },
    {
        "user_id": "u4",
        "name": "Derek Kim",
        "email": "derek@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
        "cover_url": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200",
        "major": "Computer Engineering",
        "year": "Sophomore",
        "bio": "Auction-based gadget listings and custom keyboard enthusiast.",
        "joined_at": "2025-01-12",
        "is_verified": True,
        "trust_score": 79,
        "rating": 4.4,
        "total_sales": 9,
        "response_rate": 89,
        "badges": ["Verified Student", "Fast Responder"],
        "preferred_meetup_spots": ["Dorm Lobby", "Quad"],
        "courses": ["CSC 413", "MATH 226"],
    },
    {
        "user_id": "u5",
        "name": "Ella Tran",
        "email": "ella@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300",
        "cover_url": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
        "major": "Mathematics",
        "year": "Senior",
        "bio": "Textbook quality checker and peer tutoring session provider.",
        "joined_at": "2023-09-01",
        "is_verified": True,
        "trust_score": 97,
        "rating": 4.9,
        "total_sales": 26,
        "response_rate": 99,
        "badges": ["Verified Student", "Top Seller", "Fast Responder"],
        "preferred_meetup_spots": ["Library", "Student Center"],
        "courses": ["MATH 226", "CSC 413"],
    },
    {
        "user_id": "u6",
        "name": "Omar Ali",
        "email": "omar@sfsu.edu",
        "avatar_url": "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300",
        "cover_url": "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200",
        "major": "Marketing",
        "year": "Junior",
        "bio": "Graduation and event exchange coordinator for verified students.",
        "joined_at": "2024-02-18",
        "is_verified": True,
        "trust_score": 84,
        "rating": 4.5,
        "total_sales": 11,
        "response_rate": 91,
        "badges": ["Verified Student", "Community Helper"],
        "preferred_meetup_spots": ["Student Center", "Library"],
        "courses": ["BUS 300", "CSC 648"],
    },
]

MOCK_POSTS = [
    {
        "post_id": "sp1",
        "user_id": "u1",
        "content": "Wrapped another safe meetup at the library.",
    }
]

MOCK_MESSAGES = [
    {
        "message_id": "m1",
        "thread_id": "t1",
        "listing_id": "l1",
        "body": "Can we meet at Student Center this afternoon?",
    }
]

MOCK_NOTIFICATIONS = [
    {"notification_id": "n1", "title": "You were outbid", "type": "outbid"}
]

MOCK_REPORTS = [
    {"report_id": "rep1", "reason": "Suspicious listing behavior", "status": "open"}
]


@app.route("/")
def root():
    return jsonify(
        {
            "name": "SeeSaw Enterprise Concept API",
            "status": "ok",
            "note": "Placeholder Flask backend for frontend mock integration.",
        }
    )


@app.route("/api/listings")
def get_listings():
    # TODO: Replace with MySQL query once backend integration starts.
    return jsonify(LISTINGS)


@app.route("/api/listings/<listing_id>", methods=["GET"])
def get_listing_by_id(listing_id):
    for listing in LISTINGS:
        if str(listing.get("listing_id")) == str(listing_id):
            return jsonify(listing)
    return jsonify({"error": "Listing not found"}), 404


@app.route("/api/users")
def get_users():
    # TODO: Replace with User and Profile service query layer.
    users = [
        {
            "user_id": profile["user_id"],
            "full_name": profile["name"],
            "email": profile["email"],
        }
        for profile in PROFILES
    ]
    return jsonify(users)


@app.route("/api/profiles/<user_id>", methods=["GET"])
def get_profile(user_id: str):
    profile = next((profile for profile in PROFILES if profile["user_id"] == user_id), None)
    if not profile:
        return jsonify({"error": "Profile not found"}), 404
    return jsonify(profile)


@app.route("/api/posts")
def get_posts():
    # TODO: Replace with social feed service and post visibility filters.
    return jsonify(MOCK_POSTS)


@app.route("/api/messages")
def get_messages():
    # TODO: Replace with authenticated inbox/thread query.
    return jsonify(MOCK_MESSAGES)


@app.route("/api/notifications")
def get_notifications():
    # TODO: Replace with notification service and unread counters.
    return jsonify(MOCK_NOTIFICATIONS)


@app.route("/api/admin/reports")
def get_admin_reports():
    # TODO: Replace with trust/safety moderation queue data source.
    return jsonify(MOCK_REPORTS)


@app.route("/favicon.ico")
def favicon():
    return send_from_directory("static", "favicon.ico", mimetype="image/vnd.microsoft.icon")


if __name__ == "__main__":
    # Render (and similar PaaS) injects PORT at runtime.
    port = int(os.getenv("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=False)
