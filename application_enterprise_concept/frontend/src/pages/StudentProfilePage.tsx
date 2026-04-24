import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProfileById, type FlaskProfile } from '../api/profilesApi';
import ListingCard from '../components/ListingCard';
import PostCard from '../components/PostCard';
import ProfileCard from '../components/ProfileCard';
import ReviewCard from '../components/ReviewCard';
import Toast from '../components/Toast';
import {
  courses,
  comments,
  getProfileByUserId,
  getUserById,
  meetupSpots,
  listings,
  postComments,
  postLikes,
  posts,
  profileBadges,
  reviews,
  trustScores,
} from '../data/mockData';
import type { Profile, TrustScore, User } from '../types/models';

const tabs = ['posts', 'listings', 'reviews', 'comments', 'about'] as const;

function StudentProfilePage() {
  const { userId = 'u1' } = useParams();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('posts');
  const [toast, setToast] = useState('');
  const [apiProfile, setApiProfile] = useState<FlaskProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [profileError, setProfileError] = useState('');

  const fallbackUser = getUserById(userId);
  const fallbackProfile = getProfileByUserId(userId);
  const fallbackTrustScore = trustScores.find((score) => score.user_id === userId);

  const userListings = useMemo(() => listings.filter((listing) => listing.seller_id === userId), [userId]);
  const userPosts = useMemo(() => posts.filter((post) => post.user_id === userId), [userId]);
  const userReviews = useMemo(() => reviews.filter((review) => review.reviewee_id === userId), [userId]);
  const userComments = useMemo(() => comments.filter((comment) => comment.user_id === userId), [userId]);
  const badgeLabelsFromMock = profileBadges
    .filter((badge) => badge.user_id === userId)
    .map((badge) => badge.label);
  const activeListingsCount = userListings.filter((listing) => listing.status === 'active').length;
  const soldListingsCount = userListings.filter((listing) => listing.status === 'sold').length;

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let isMounted = true;
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        setProfileError('');
        const profile = await getProfileById(userId);
        if (isMounted) {
          setApiProfile(profile);
        }
      } catch {
        if (isMounted) {
          setApiProfile(null);
          setProfileError(
            'Flask profile API unavailable. Showing local demo profile data when possible.',
          );
        }
      } finally {
        if (isMounted) {
          setIsLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  const user: User | undefined = apiProfile
    ? {
        user_id: apiProfile.user_id,
        email: apiProfile.email,
        full_name: apiProfile.name,
        role: 'student',
        is_active: true,
        created_at: apiProfile.joined_at,
      }
    : fallbackUser;

  const profile: Profile | undefined = apiProfile
    ? {
        profile_id: `api-profile-${apiProfile.user_id}`,
        user_id: apiProfile.user_id,
        avatar_url: apiProfile.avatar_url,
        cover_url: apiProfile.cover_url,
        major: apiProfile.major,
        year: apiProfile.year,
        bio: apiProfile.bio,
        campus: 'SFSU Main Campus',
        response_rate: apiProfile.response_rate,
        joined_date: apiProfile.joined_at,
      }
    : fallbackProfile;

  const trustScore: TrustScore | undefined = apiProfile
    ? {
        trust_score_id: `api-trust-${apiProfile.user_id}`,
        user_id: apiProfile.user_id,
        rating_average: apiProfile.rating,
        completed_sales: apiProfile.total_sales,
        response_rate: apiProfile.response_rate,
        report_count: 0,
        verification_level: apiProfile.is_verified ? 'verified' : 'basic',
        score: apiProfile.trust_score,
      }
    : fallbackTrustScore;

  const badgeLabels = apiProfile?.badges?.length ? apiProfile.badges : badgeLabelsFromMock;

  if (isLoadingProfile) {
    return <article className="card">Loading profile from Flask...</article>;
  }

  if (!user || !profile) {
    return <article className="card error-box">Profile unavailable.</article>;
  }

  const meetupSpotsDisplay = apiProfile?.preferred_meetup_spots?.length
    ? apiProfile.preferred_meetup_spots
    : meetupSpots.map((spot) => spot.name);
  const coursesDisplay = apiProfile?.courses?.length
    ? apiProfile.courses
    : courses.map((course) => course.code);

  return (
    <section>
      <ProfileCard profile={profile} user={user} trustScore={trustScore} badgeLabels={badgeLabels} />
      <Toast message={toast} />
      {profileError && <article className="error-box">{profileError}</article>}
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
              onToast={setToast}
            />
          ))}
        </div>
      )}
      {activeTab === 'listings' && (
        <div className="stack">
          <article className="card listing-summary">
            <h3>Listing Performance</h3>
            <p>Active Listings: {activeListingsCount}</p>
            <p>Sold Listings: {soldListingsCount}</p>
          </article>
          <div className="listing-grid">
            {userListings.map((listing) => (
              <ListingCard key={listing.listing_id} listing={listing} />
            ))}
          </div>
        </div>
      )}
      {activeTab === 'reviews' && (
        <div className="stack">
          {userReviews.length > 0 ? (
            userReviews.map((review) => <ReviewCard key={review.review_id} review={review} />)
          ) : (
            <article className="card">
              <h3>No reviews yet</h3>
              <p className="muted">This profile has no completed review cycle yet.</p>
            </article>
          )}
          <article className="card">
            <h4>Reputation Snapshot</h4>
            <p>{trustScore?.rating_average ?? 0} / 5 overall rating</p>
            <p>{trustScore?.completed_sales ?? 0} completed campus sales</p>
          </article>
        </div>
      )}
      {activeTab === 'comments' && (
        <div className="stack">
          {userComments.length > 0 ? (
            userComments.map((comment) => (
              <article key={comment.comment_id} className="card">
                <p>{comment.content}</p>
                <p className="muted">
                  On {comment.target_type} {comment.target_id}
                </p>
              </article>
            ))
          ) : (
            <article className="card">
              <p className="muted">No direct comments yet.</p>
            </article>
          )}
          <article className="card">
            <h4>Community Voice</h4>
            <p>Student tone is constructive, responsive, and meetup-focused.</p>
          </article>
        </div>
      )}
      {activeTab === 'about' && (
        <article className="card about-card">
          <h3>About {user.full_name}</h3>
          <p>Major: {profile.major}</p>
          <p>Year: {profile.year}</p>
          <p>Campus: {profile.campus}</p>
          <p>Preferred Meetup: {meetupSpotsDisplay.join(', ')}</p>
          <p>
            Verification Status: {apiProfile?.is_verified === false ? 'Pending verification' : 'Verified'} with{' '}
            {user.email}
          </p>
          <p>Courses: {coursesDisplay.join(', ')}</p>
          <p>Response Rate: {profile.response_rate}%</p>
          <p>Trust Tier: {trustScore?.verification_level ?? 'silver'}</p>
        </article>
      )}
    </section>
  );
}

export default StudentProfilePage;
