import { useState } from 'react';
import { getUserById } from '../data/mockData';
import type { PostComment, PostLike, Profile, StudentPost } from '../types/models';

interface PostCardProps {
  post: StudentPost;
  profile?: Profile;
  likes: PostLike[];
  comments: PostComment[];
}

function PostCard({ post, profile, likes, comments }: PostCardProps) {
  const author = getUserById(post.user_id);
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(likes.length);

  const toggleLike = () => {
    setLiked((prev) => !prev);
    setLikedCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <article className="card post-card">
      <div className="post-head">
        <img src={profile?.avatar_url} alt={author?.full_name} className="avatar-small" />
        <div>
          <strong>{author?.full_name}</strong>
          <p className="muted">
            {profile?.major} · {post.visibility} · {post.created_at}
          </p>
        </div>
      </div>
      <p>{post.content}</p>
      <img src={post.image_path} alt="Post visual" className="post-image" />
      <div className="post-actions">
        <button type="button" className="button button-secondary" onClick={toggleLike}>
          {liked ? 'Unlike' : 'Like'} ({likedCount})
        </button>
        <button type="button" className="button button-secondary">
          Comments ({comments.length})
        </button>
      </div>
      {comments.length > 0 && (
        <div className="comment-preview">
          <p className="muted">Latest comment</p>
          <p>{comments[0].content}</p>
        </div>
      )}
    </article>
  );
}

export default PostCard;
