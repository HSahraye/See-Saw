# SeeSaw Enterprise Concept (Clean-Slate CSC648 Demo)

This folder is a **separate clean implementation** of SeeSaw that keeps the original CSC648 project intent while elevating the product into an enterprise-ready **verified campus social marketplace** concept.

## Repository Inspection Summary

- Workspace inspection before build found no existing tracked class files in this workspace path.
- To avoid impacting team code, this concept is isolated in `application_enterprise_concept`.
- Structure intentionally mirrors the class architecture: Flask app entrypoint, React frontend, static/template folders, and SQL schema.

## Product Concept

SeeSaw evolves from a basic student listing app into a campus trust platform:

- Facebook Marketplace style buying/selling
- Instagram-style student posts and profile identity
- LinkedIn-style verification and trust reputation
- University trust/safety moderation workflows
- Future multi-tenant portal embed/SaaS capability

## Folder Layout

```text
application_enterprise_concept/
  README.md
  requirements.txt
  app.py
  database_schema.sql
  frontend/
    package.json
    src/
      main.tsx
      App.tsx
      types/models.ts
      data/mockData.ts
      components/
      pages/
      styles/global.css
  templates/
  static/
    css/
    js/
    uploads/
```

## Implemented Phase 1 Frontend Pages

- Browse / marketplace landing with search + filters (category, course code, condition)
- Listing detail with seller card, comments, reactions, bid context, and report action
- Campus feed (social posts with likes/comments UI)
- Student profile with cover, trust metrics, badges, and tabs:
  - Posts
  - Listings
  - Reviews
  - Comments
  - About
- Create listing form with validation and publish mock flow
- Messages page with inbox, conversation thread, and listing context
- Notifications page
- Admin trust & safety dashboard (reports, moderation buttons, verification queue)
- Settings / edit profile
- Plus wishlist and my listings pages to keep class navigation complete

## Brand Guideline Application

UI palette follows the supplied brand colors:

- `#032539` top/search and primary text tone
- `#1C768F` side/secondary actions
- `#FA991C` primary call-to-action accents
- `#CC4D35` warning/delete actions
- `#E9F8F7` background tone
- `#FFFFFF` card surfaces

The required class banner text is rendered globally on every route:

> SFSU Software Engineering Project CSC 648-848, Spring 2026. For Demonstration Only

## Data Model Coverage

TypeScript interfaces are defined for:

- Original entities: User, Profile, Listing, Listing Image, Category, Tag, Listing_Tag, Condition, Bid, Order, Wishlist, Wishlist_Item, Message, Review, Reaction, Comment, Notification, Report, Course, SFSU_Verification
- Enterprise/social entities: StudentPost, PostLike, PostComment, ProfileBadge, TrustScore, UniversityTenant, VerificationRequest, CampusMeetupSpot, PortalEmbedConfig

Mock dataset includes:

- 6 student users
- 12 listings
- 8 posts
- bids, comments, likes, reviews, notifications, reports
- required categories, course tags, and campus meetup spots

## Backend Placeholder API (Flask)

`app.py` includes placeholder routes for:

- `/`
- `/api/listings`
- `/api/users`
- `/api/profiles/<id>`
- `/api/posts`
- `/api/messages`
- `/api/notifications`
- `/api/admin/reports`

Each route currently returns mock JSON and includes TODO comments for future database integration.

## Database Schema

`database_schema.sql` contains:

- Original marketplace tables
- New enterprise/social tables
- MySQL-compatible definitions with foreign keys

## Run Instructions

### Frontend

```bash
cd application_enterprise_concept/frontend
npm install
npm run dev
```

### Flask API Placeholder

```bash
cd application_enterprise_concept
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

## Mapping to Original Milestones

- Preserves verified student identity concept with `@sfsu.edu` context.
- Keeps marketplace core: browse/search/filter, listings, bids, messages, wishlist, profile/settings.
- Adds trust/safety/admin moderation while respecting no-payment, in-site messaging constraints.
- Keeps mobile-friendly and maintainable, componentized project layout for class inspection.

## Known Limitations (Phase 1)

- Data is mock/in-memory in frontend and Flask placeholders.
- No auth/session enforcement yet.
- No persistent messaging, bidding, or notification updates.
- No real image upload storage pipeline yet.
- No production SSO/portal embed integration yet.

## Next Steps for Real Flask + MySQL Integration

1. Add SQLAlchemy models matching `database_schema.sql`.
2. Replace mock route payloads with repository/service layer queries.
3. Add auth + SFSU email verification flow (token issuance + verification endpoints).
4. Connect frontend data services to Flask API using typed fetch clients.
5. Add admin moderation workflows (report lifecycle and audit history).
