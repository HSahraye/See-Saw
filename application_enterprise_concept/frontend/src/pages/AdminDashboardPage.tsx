import AdminReportCard from '../components/AdminReportCard';
import { reports, users, verificationRequests } from '../data/mockData';

function AdminDashboardPage() {
  const reportedListings = reports.filter((report) => report.listing_id);
  const reportedUsers = reports.filter((report) => report.reported_user_id);

  return (
    <section>
      <div className="page-header">
        <h1>Admin Trust & Safety</h1>
        <p>University-grade moderation queue and verification management.</p>
      </div>
      <div className="dashboard-grid">
        <article className="card">
          <h3>Reported Listings</h3>
          <p>{reportedListings.length} open listing reports</p>
        </article>
        <article className="card">
          <h3>Reported Users</h3>
          <p>{reportedUsers.length} user conduct reports</p>
        </article>
        <article className="card">
          <h3>Pending Verification Queue</h3>
          <p>{verificationRequests.filter((request) => request.status === 'pending').length} pending requests</p>
        </article>
        <article className="card">
          <h3>Active Students</h3>
          <p>{users.filter((user) => user.is_active).length} verified active users</p>
        </article>
      </div>
      <div className="stack">
        {reports.map((report) => (
          <AdminReportCard key={report.report_id} report={report} />
        ))}
      </div>
      <article className="card">
        <h3>Verification Queue</h3>
        {verificationRequests.map((request) => (
          <div className="queue-row" key={request.request_id}>
            <div>
              <p>{request.university_email}</p>
              <p className="muted">Status: {request.status}</p>
            </div>
            <div className="report-actions">
              <button type="button" className="button button-secondary">
                Approve
              </button>
              <button type="button" className="button button-danger">
                Reject
              </button>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
}

export default AdminDashboardPage;
