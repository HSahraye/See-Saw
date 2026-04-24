import type { Profile, TrustScore, User } from '../types/models';
import TrustBadge from './TrustBadge';

interface ProfileCardProps {
  profile: Profile;
  user: User;
  trustScore?: TrustScore;
  badgeLabels: string[];
}

function ProfileCard({ profile, user, trustScore, badgeLabels }: ProfileCardProps) {
  return (
    <section className="card profile-hero">
      <div className="profile-cover" style={{ backgroundImage: `url(${profile.cover_url})` }} />
      <div className="profile-body">
        <img src={profile.avatar_url} alt={user.full_name} className="avatar-large" />
        <div>
          <h2>{user.full_name}</h2>
          <p className="muted">{user.email} · Verified University Email</p>
          <p>{profile.bio}</p>
          <p className="muted">
            {profile.major} · {profile.year} · Joined {profile.joined_date}
          </p>
          <div className="badge-row">
            {badgeLabels.map((badge) => (
              <TrustBadge key={badge} label={badge} variant="success" />
            ))}
          </div>
        </div>
        <div className="metrics-panel">
          <h4>Trust Metrics</h4>
          <p>Trust Score: {trustScore?.score ?? '--'}</p>
          <p>Rating: {trustScore?.rating_average ?? '--'} / 5.0</p>
          <p>Total Sales: {trustScore?.completed_sales ?? '--'}</p>
          <p>Response Rate: {trustScore?.response_rate ?? '--'}%</p>
        </div>
      </div>
    </section>
  );
}

export default ProfileCard;
