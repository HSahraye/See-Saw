import type { Report } from '../types/models';

interface AdminReportCardProps {
  report: Report;
}

function AdminReportCard({ report }: AdminReportCardProps) {
  return (
    <article className="card report-card">
      <h4>Report #{report.report_id}</h4>
      <p>{report.reason}</p>
      <p className="muted">Status: {report.status}</p>
      <div className="report-actions">
        <button type="button" className="button button-secondary">
          Review
        </button>
        <button type="button" className="button button-danger">
          Remove Listing
        </button>
        <button type="button" className="button button-danger">
          Suspend User
        </button>
      </div>
    </article>
  );
}

export default AdminReportCard;
