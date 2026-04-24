import { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import { currentUserId, getProfileByUserId, getUserById } from '../data/mockData';

function SettingsPage() {
  const user = getUserById(currentUserId);
  const profile = getProfileByUserId(currentUserId);
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [major, setMajor] = useState(profile?.major ?? '');
  const [year, setYear] = useState(profile?.year ?? '');
  const [privacyCampusProfile, setPrivacyCampusProfile] = useState(true);
  const [privacyVerifiedOnly, setPrivacyVerifiedOnly] = useState(true);
  const [notifyBid, setNotifyBid] = useState(true);
  const [notifyMessage, setNotifyMessage] = useState(true);
  const [notifyAdmin, setNotifyAdmin] = useState(true);
  const [saved, setSaved] = useState(false);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!user || !profile) {
    return <p>Settings unavailable.</p>;
  }

  return (
    <section>
      <div className="page-header">
        <h1>Settings & Edit Profile</h1>
        <p>Profile edits, privacy controls, and notifications preferences.</p>
      </div>
      <Toast message={toast} />
      <form
        className="card form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
          setToast('Profile saved');
        }}
      >
        <label>
          Avatar (Placeholder)
          <input type="file" disabled />
        </label>
        <label>
          Bio
          <textarea value={bio} onChange={(event) => setBio(event.target.value)} rows={4} />
        </label>
        <label>
          Major
          <input value={major} onChange={(event) => setMajor(event.target.value)} />
        </label>
        <label>
          Year
          <input value={year} onChange={(event) => setYear(event.target.value)} />
        </label>
        <fieldset>
          <legend>Privacy Settings</legend>
          <label>
            <input
              type="checkbox"
              checked={privacyCampusProfile}
              onChange={(event) => setPrivacyCampusProfile(event.target.checked)}
            />
            Show campus profile publicly within SFSU tenant
          </label>
          <label>
            <input
              type="checkbox"
              checked={privacyVerifiedOnly}
              onChange={(event) => setPrivacyVerifiedOnly(event.target.checked)}
            />
            Allow messages only from verified students
          </label>
        </fieldset>
        <fieldset>
          <legend>Notification Settings</legend>
          <label>
            <input
              type="checkbox"
              checked={notifyBid}
              onChange={(event) => setNotifyBid(event.target.checked)}
            />
            Bid updates
          </label>
          <label>
            <input
              type="checkbox"
              checked={notifyMessage}
              onChange={(event) => setNotifyMessage(event.target.checked)}
            />
            New messages
          </label>
          <label>
            <input
              type="checkbox"
              checked={notifyAdmin}
              onChange={(event) => setNotifyAdmin(event.target.checked)}
            />
            Admin actions
          </label>
        </fieldset>
        <article className="card settings-summary">
          <h4>Verification</h4>
          <p>{user.email}</p>
          <p className="muted">Status: Verified @sfsu.edu</p>
        </article>
        {saved && <p className="success-text">Profile settings saved in demo state.</p>}
        <button type="submit" className="button button-primary">
          Save Profile
        </button>
      </form>
    </section>
  );
}

export default SettingsPage;
