import ListingCard from '../components/ListingCard';
import { currentUserId, listings, wishlistItems, wishlists } from '../data/mockData';

function WishlistPage() {
  const wishlist = wishlists.find((item) => item.user_id === currentUserId);
  const listingIds = wishlistItems
    .filter((item) => item.wishlist_id === wishlist?.wishlist_id)
    .map((item) => item.listing_id);
  const items = listings.filter((listing) => listingIds.includes(listing.listing_id));

  return (
    <section>
      <div className="page-header">
        <h1>Wishlist</h1>
        <p>Saved marketplace items for quick follow-up and bidding.</p>
      </div>
      <div className="listing-grid">
        {items.map((listing) => (
          <ListingCard key={listing.listing_id} listing={listing} />
        ))}
      </div>
    </section>
  );
}

export default WishlistPage;
