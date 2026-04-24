import { Link, useParams } from 'react-router-dom';
import TrustBadge from '../components/TrustBadge';
import {
  bids,
  comments,
  getCategoryById,
  getConditionById,
  getListingById,
  getProfileByUserId,
  getUserById,
  reactions,
} from '../data/mockData';

function ListingDetailPage() {
  const { listingId } = useParams();
  const listing = listingId ? getListingById(listingId) : undefined;

  if (!listing) {
    return <p>Listing not found.</p>;
  }

  const seller = getUserById(listing.seller_id);
  const profile = getProfileByUserId(listing.seller_id);
  const listingComments = comments.filter((comment) => comment.target_type === 'listing' && comment.target_id === listing.listing_id);
  const listingLikes = reactions.filter((reaction) => reaction.target_type === 'listing' && reaction.target_id === listing.listing_id);
  const listingBids = bids.filter((bid) => bid.listing_id === listing.listing_id);

  return (
    <section className="detail-layout">
      <article className="card detail-main">
        <img src={listing.image_urls[0]} alt={listing.title} className="detail-image" />
        <h1>{listing.title}</h1>
        <p className="price">${listing.price.toFixed(2)}</p>
        <div className="badge-row">
          <TrustBadge label="Verified SFSU Student" />
          <TrustBadge label={listing.listing_type === 'auction' ? 'Auction' : 'Fixed Price'} variant="warning" />
          {listing.campus_pickup && <TrustBadge label="Campus Pickup" variant="success" />}
        </div>
        <p>{listing.description}</p>
        <p className="muted">
          {getCategoryById(listing.category_id)?.name} · {getConditionById(listing.condition_id)?.label}
        </p>
        <p className="muted">Course Codes: {listing.course_codes.join(', ') || 'N/A'}</p>
        <p className="muted">Tags: {listing.tags.join(', ')}</p>
        <div className="detail-actions">
          <button type="button" className="button button-primary">
            Message Seller
          </button>
          {listing.listing_type === 'auction' && (
            <button type="button" className="button button-secondary">
              Place Bid
            </button>
          )}
          <button type="button" className="button button-danger">
            Report Listing
          </button>
        </div>
      </article>

      <aside className="side-stack">
        <div className="card">
          <h3>Seller Profile</h3>
          <p>
            <Link to={`/profile/${listing.seller_id}`}>{seller?.full_name}</Link>
          </p>
          <p className="muted">{profile?.major}</p>
          <p className="muted">{seller?.email}</p>
        </div>
        <div className="card">
          <h3>Activity</h3>
          <p>{listingLikes.length} likes</p>
          <p>{listingComments.length} comments</p>
          <p>{listingBids.length} bids</p>
        </div>
        <div className="card">
          <h3>Comments</h3>
          {listingComments.map((comment) => (
            <p key={comment.comment_id}>{comment.content}</p>
          ))}
        </div>
      </aside>
    </section>
  );
}

export default ListingDetailPage;
