import { Link } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import { currentUserId, listings } from '../data/mockData';

function MyListingsPage() {
  const myListings = listings.filter((listing) => listing.seller_id === currentUserId);
  return (
    <section>
      <div className="page-header page-header-split">
        <div>
          <h1>My Listings</h1>
          <p>Manage active and sold listing inventory.</p>
        </div>
        <Link to="/create-listing" className="button button-primary">
          + Create Listing
        </Link>
      </div>
      <div className="listing-grid">
        {myListings.map((listing) => (
          <ListingCard key={listing.listing_id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default MyListingsPage;
