import type { Report } from '../types/models';

interface AdminReportCardProps {
  report: Report;
  onReview: (reportId: string) => void;
  onRemoveListing: (reportId: string) => void;
  onSuspendUser: (reportId: string) => void;
}

function AdminReportCard({ report, onReview, onRemoveListing, onSuspendUser }: AdminReportCardProps) {
  return (
    <article className="card report-card">
      <h4>Report #{report.report_id}</h4>
      <p>{report.reason}</p>
      <p className="muted">Status: {report.status}</p>
      <div className="report-actions">
        <button type="button" className="button button-secondary" onClick={() => onReview(report.report_id)}>
          Review
        </button>
        <button type="button" className="button button-danger" onClick={() => onRemoveListing(report.report_id)}>
          Remove Listing
        </button>
        <button type="button" className="button button-danger" onClick={() => onSuspendUser(report.report_id)}>
          Suspend User
        </button>
      </div>
    </article>
  );
}

export default AdminReportCard;
