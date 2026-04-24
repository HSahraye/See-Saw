import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import ReviewCard from '../components/ReviewCard';
import {
  comments,
  getProfileByUserId,
  getUserById,
  listings,
  postComments,
  postLikes,
  posts,
  profileBadges,
  reviews,
  trustScores,
} from '../data/mockData';

const tabs = ['posts', 'listings', 'reviews', 'comments', 'about'] as const;

function StudentProfilePage() {
  const { userId = 'u1' } = useParams();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('posts');

  const user = getUserById(userId);
  const profile = getProfileByUserId(userId);
  const trustScore = trustScores.find((score) => score.user_id === userId);

  const userListings = useMemo(() => listings.filter((listing) => listing.seller_id === userId), [userId]);
  const userPosts = useMemo(() => posts.filter((post) => post.user_id === userId), [userId]);
  const userReviews = useMemo(() => reviews.filter((review) => review.reviewee_id === userId), [userId]);
  const userComments = useMemo(() => comments.filter((comment) => comment.user_id === userId), [userId]);
  const badgeLabels = profileBadges.filter((badge) => badge.user_id === userId).map((badge) => badge.label);

  if (!user || !profile) {
    return <p>Profile unavailable.</p>;
  }

  return (
    <section>
      <ProfileCard profile={profile} user={user} trustScore={trustScore} badgeLabels={badgeLabels} />
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      {activeTab === 'posts' && (
        <div className="post-grid">
          {userPosts.map((post) => (
            <PostCard
              key={post.post_id}
              post={post}
              profile={profile}
              likes={postLikes.filter((like) => like.post_id === post.post_id)}
              comments={postComments.filter((comment) => comment.post_id === post.post_id)}
            />
          ))}
        </div>
      )}
      {activeTab === 'listings' && (
        <div className="listing-grid">
          {userListings.map((listing) => (
            <ListingCard key={listing.listing_id} listing={listing} />
          ))}
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className="stack">
          {userReviews.map((review) => (
            <ReviewCard key={review.review_id} review={review} />
          ))}
        </div>
      )}
      {activeTab === 'comments' && (
        <div className="stack">
          {userComments.map((comment) => (
            <article key={comment.comment_id} className="card">
              <p>{comment.content}</p>
              <p className="muted">
                On {comment.target_type} {comment.target_id}
              </p>
            </article>
          ))}
        </div>
      )}
      {activeTab === 'about' && (
        <article className="card about-card">
          <h3>About {user.full_name}</h3>
          <p>Major: {profile.major}</p>
          <p>Year: {profile.year}</p>
          <p>Campus: {profile.campus}</p>
          <p>Preferred Meetup: Library, Student Center</p>
          <p>Verification Status: Verified with {user.email}</p>
        </article>
      )}
    </section>
  );
}

export default StudentProfilePage;
