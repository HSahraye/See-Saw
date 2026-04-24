import { getUserById } from '../data/mockData';
import type { Review } from '../types/models';

interface ReviewCardProps {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  const reviewer = getUserById(review.reviewer_id);
  return (
    <article className="card review-card">
      <div className="review-head">
        <strong>{reviewer?.full_name}</strong>
        <span>{'★'.repeat(review.rating)}</span>
      </div>
      <p>{review.comment}</p>
      <p className="muted">{review.created_at}</p>
    </article>
  );
}

export default ReviewCard;
