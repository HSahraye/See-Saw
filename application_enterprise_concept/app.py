from flask import Flask, jsonify, send_from_directory

app = Flask(__name__, static_folder="static", template_folder="templates")


MOCK_LISTINGS = [
    {"listing_id": "l1", "title": "CSC 648 Team Workflow Notes", "price": 25.0},
    {"listing_id": "l2", "title": "TI-84 Plus Graphing Calculator", "price": 70.0},
]

MOCK_USERS = [
    {"user_id": "u1", "full_name": "Maya Nguyen", "email": "maya@sfsu.edu"},
    {"user_id": "u2", "full_name": "Luis Hernandez", "email": "luis@sfsu.edu"},
]

MOCK_PROFILES = {
    "u1": {
        "user_id": "u1",
        "major": "Computer Science",
        "year": "Senior",
        "trust_score": 96,
    }
}

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
    return jsonify(MOCK_LISTINGS)


@app.route("/api/users")
def get_users():
    # TODO: Replace with User and Profile service query layer.
    return jsonify(MOCK_USERS)


@app.route("/api/profiles/<profile_id>")
def get_profile(profile_id: str):
    # TODO: Replace with profile repository and trust-score joins.
    profile = MOCK_PROFILES.get(profile_id)
    if not profile:
        return jsonify({"error": "profile not found"}), 404
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
    app.run(debug=True, port=5001)
