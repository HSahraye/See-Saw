import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getListingById as getListingByIdFromApi } from '../api/listingsApi';
import Toast from '../components/Toast';
import TrustBadge from '../components/TrustBadge';
import {
  bids,
  comments,
  currentUserId,
  getCategoryById,
  getConditionById,
  getListingById as getListingByIdFromMock,
  getProfileByUserId,
  getUserById,
  reactions,
} from '../data/mockData';
import type { Listing } from '../types/models';

function ListingDetailPage() {
  const navigate = useNavigate();
  const { listingId } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoadingListing, setIsLoadingListing] = useState(false);
  const [listingError, setListingError] = useState('');
  const [toast, setToast] = useState('');
  const [liked, setLiked] = useState(false);
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [newComment, setNewComment] = useState('');
  const [listingComments, setListingComments] = useState(
    comments.filter((comment) => comment.target_type === 'listing' && comment.target_id === listingId),
  );
  const [listingLikesCount, setListingLikesCount] = useState(
    reactions.filter((reaction) => reaction.target_type === 'listing' && reaction.target_id === listingId).length,
  );
  const [listingBids, setListingBids] = useState(bids.filter((bid) => bid.listing_id === listingId));
  const highestBid = listingBids.reduce((highest, bid) => Math.max(highest, bid.amount), listing?.price ?? 0);

  useEffect(() => {
    if (!listingId) {
      return;
    }
    let isMounted = true;
    const loadListing = async () => {
      try {
        setIsLoadingListing(true);
        setListingError('');
        const apiListing = await getListingByIdFromApi(listingId);
        if (isMounted) {
          setListing(apiListing);
        }
      } catch {
        const fallbackListing = getListingByIdFromMock(listingId);
        if (isMounted) {
          if (fallbackListing) {
            setListing(fallbackListing);
            setListingError('Flask API unavailable. Showing local demo listing data.');
          } else {
            setListing(null);
            setListingError('Listing not found.');
          }
        }
      } finally {
        if (isMounted) {
          setIsLoadingListing(false);
        }
      }
    };

    loadListing();

    return () => {
      isMounted = false;
    };
  }, [listingId]);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!listingId) {
    return <article className="card error-box">Listing not found.</article>;
  }

  if (isLoadingListing) {
    return <article className="card">Loading listing details from Flask...</article>;
  }

  if (!listing) {
    return <article className="card error-box">{listingError || 'Listing not found.'}</article>;
  }

  const seller = getUserById(listing.seller_id);
  const profile = getProfileByUserId(listing.seller_id);

  const handleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setListingLikesCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    if (nextLiked) {
      setToast('Liked listing');
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) {
      return;
    }
    setListingComments((prev) => [
      {
        comment_id: `local-${Date.now()}`,
        user_id: currentUserId,
        target_type: 'listing',
        target_id: listing.listing_id,
        content: newComment.trim(),
        created_at: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ]);
    setNewComment('');
    setToast('Comment added');
  };

  const handleBidSubmit = () => {
    const parsedBid = Number(bidAmount);
    if (!parsedBid || parsedBid <= highestBid) {
      setToast('Bid must be higher than current highest bid');
      return;
    }
    setListingBids((prev) => [
      ...prev,
      {
        bid_id: `local-bid-${Date.now()}`,
        listing_id: listing.listing_id,
        bidder_id: currentUserId,
        amount: parsedBid,
        created_at: new Date().toISOString().slice(0, 10),
        status: 'winning',
      },
    ]);
    setBidAmount('');
    setShowBidForm(false);
    setToast('Bid placed');
  };

  return (
    <section className="detail-layout">
      <article className="card detail-main">
        <Toast message={toast} />
        {listingError && <article className="error-box">{listingError}</article>}
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
          <button type="button" className="button button-primary" onClick={() => navigate('/messages')}>
            Message Seller
          </button>
          <button type="button" className="button button-secondary" onClick={handleLike}>
            {liked ? 'Unlike' : 'Like'} ({listingLikesCount})
          </button>
          {listing.listing_type === 'auction' && (
            <button
              type="button"
              className="button button-secondary"
              onClick={() => setShowBidForm((prev) => !prev)}
            >
              Place Bid
            </button>
          )}
          <button type="button" className="button button-danger">
            Report Listing
          </button>
        </div>
        {showBidForm && (
          <div className="inline-panel">
            <h4>Place a bid</h4>
            <p className="muted">Current highest bid: ${highestBid.toFixed(2)}</p>
            <div className="comment-input-row">
              <input
                type="number"
                min={highestBid + 1}
                value={bidAmount}
                onChange={(event) => setBidAmount(event.target.value)}
                placeholder="Enter your bid amount"
              />
              <button type="button" className="button button-primary" onClick={handleBidSubmit}>
                Submit Bid
              </button>
            </div>
          </div>
        )}
        <div className="inline-panel">
          <h3>Comments</h3>
          <div className="comment-input-row">
            <input
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              placeholder="Ask a question or leave a note..."
            />
            <button type="button" className="button button-primary" onClick={handleAddComment}>
              Add comment
            </button>
          </div>
          <div className="comment-list">
            {listingComments.map((comment) => (
              <article key={comment.comment_id} className="comment-item">
                <p>{comment.content}</p>
                <p className="muted">{comment.created_at}</p>
              </article>
            ))}
          </div>
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
          <p>{listingLikesCount} likes</p>
          <p>{listingComments.length} comments</p>
          <p>{listingBids.length} bids</p>
          <p>Highest bid: ${highestBid.toFixed(2)}</p>
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
