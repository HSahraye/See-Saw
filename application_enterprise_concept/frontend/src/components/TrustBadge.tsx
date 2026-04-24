interface TrustBadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning';
}

function TrustBadge({ label, variant = 'default' }: TrustBadgeProps) {
  return <span className={`trust-badge trust-badge-${variant}`}>{label}</span>;
}

export default TrustBadge;
