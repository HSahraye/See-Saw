import { useEffect, useMemo, useState } from 'react';
import AdminReportCard from '../components/AdminReportCard';
import Toast from '../components/Toast';
import { reports, users, verificationRequests } from '../data/mockData';
import type { Report } from '../types/models';

function AdminDashboardPage() {
  const [adminReports, setAdminReports] = useState<Report[]>(reports);
  const [toast, setToast] = useState('');
  const reportedListings = useMemo(
    () => adminReports.filter((report) => report.listing_id && report.status !== 'resolved'),
    [adminReports],
  );
  const reportedUsers = useMemo(
    () => adminReports.filter((report) => report.reported_user_id && report.status !== 'resolved'),
    [adminReports],
  );

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleReview = (reportId: string) => {
    setAdminReports((prev) =>
      prev.map((report) =>
        report.report_id === reportId ? { ...report, status: 'reviewing' } : report,
      ),
    );
    setToast('Report reviewed');
  };

  const handleRemoveListing = (reportId: string) => {
    setAdminReports((prev) => prev.filter((report) => report.report_id !== reportId));
    setToast('Listing removed from report queue');
  };

  const handleSuspendUser = (reportId: string) => {
    setAdminReports((prev) =>
      prev.map((report) =>
        report.report_id === reportId ? { ...report, status: 'resolved' } : report,
      ),
    );
    setToast('User suspended and report resolved');
  };

  return (
    <section>
      <div className="page-header">
        <h1>Admin Trust & Safety</h1>
        <p>University-grade moderation queue and verification management.</p>
      </div>
      <Toast message={toast} />
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
        {adminReports.map((report) => (
          <AdminReportCard
            key={report.report_id}
            report={report}
            onReview={handleReview}
            onRemoveListing={handleRemoveListing}
            onSuspendUser={handleSuspendUser}
          />
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
