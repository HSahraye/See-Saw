import { useState } from 'react';
import { currentUserId, getProfileByUserId, getUserById } from '../data/mockData';

function SettingsPage() {
  const user = getUserById(currentUserId);
  const profile = getProfileByUserId(currentUserId);
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [major, setMajor] = useState(profile?.major ?? '');
  const [year, setYear] = useState(profile?.year ?? '');
  const [saved, setSaved] = useState(false);

  if (!user || !profile) {
    return <p>Settings unavailable.</p>;
  }

  return (
    <section>
      <div className="page-header">
        <h1>Settings & Edit Profile</h1>
        <p>Profile edits, privacy controls, and notifications preferences.</p>
      </div>
      <form
        className="card form-grid"
        onSubmit={(event) => {
          event.preventDefault();
          setSaved(true);
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
            <input type="checkbox" defaultChecked />
            Show campus profile publicly within SFSU tenant
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            Allow messages only from verified students
          </label>
        </fieldset>
        <fieldset>
          <legend>Notification Settings</legend>
          <label>
            <input type="checkbox" defaultChecked />
            Bid updates
          </label>
          <label>
            <input type="checkbox" defaultChecked />
            New messages
          </label>
          <label>
            <input type="checkbox" defaultChecked />
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
          Save Settings
        </button>
      </form>
    </section>
  );
}

export default SettingsPage;
