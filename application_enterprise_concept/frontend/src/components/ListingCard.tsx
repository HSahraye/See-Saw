import { Link } from 'react-router-dom';
import { getCategoryById, getConditionById, getProfileByUserId, getUserById } from '../data/mockData';
import type { Listing } from '../types/models';
import TrustBadge from './TrustBadge';

interface ListingCardProps {
  listing: Listing;
}

function ListingCard({ listing }: ListingCardProps) {
  const seller = getUserById(listing.seller_id);
  const sellerProfile = getProfileByUserId(listing.seller_id);
  const category = getCategoryById(listing.category_id);
  const condition = getConditionById(listing.condition_id);

  return (
    <article className="card listing-card clickable-card">
      <Link to={`/listing/${listing.listing_id}`}>
        <img src={listing.image_urls[0]} alt={listing.title} className="listing-image" />
      </Link>
      <div className="listing-content">
        <div className="listing-header">
          <TrustBadge label={listing.listing_type === 'auction' ? 'Auction' : 'Fixed Price'} variant="warning" />
          {listing.campus_pickup && <TrustBadge label="Campus Pickup" variant="success" />}
        </div>
        <h3>
          <Link to={`/listing/${listing.listing_id}`} className="listing-title-link">
            {listing.title}
          </Link>
        </h3>
        <p className="listing-meta">
          {category?.name} · {condition?.label}
        </p>
        <p className="price">${listing.price.toFixed(2)}</p>
        <p className="muted">
          Sold by <Link to={`/profile/${listing.seller_id}`}>{seller?.full_name}</Link> · {sellerProfile?.major}
        </p>
        <div className="listing-actions">
          <Link to={`/profile/${listing.seller_id}`} className="badge-link">
            <TrustBadge label="Verified SFSU Student" variant="default" />
          </Link>
          <Link to={`/listing/${listing.listing_id}`} className="button button-primary">
            View Listing
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ListingCard;
