import { useState } from 'react';
import { getUserById } from '../data/mockData';
import type { PostComment, PostLike, Profile, StudentPost } from '../types/models';

interface PostCardProps {
  post: StudentPost;
  profile?: Profile;
  likes: PostLike[];
  comments: PostComment[];
  onToast?: (message: string) => void;
}

function PostCard({ post, profile, likes, comments, onToast }: PostCardProps) {
  const author = getUserById(post.user_id);
  const [liked, setLiked] = useState(false);
  const [likedCount, setLikedCount] = useState(likes.length);
  const [commentOpen, setCommentOpen] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [localComments, setLocalComments] = useState<PostComment[]>(comments);

  const toggleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    setLikedCount((prev) => (nextLiked ? prev + 1 : Math.max(0, prev - 1)));
    if (nextLiked) {
      onToast?.('Liked post');
    }
  };

  const addComment = () => {
    if (!commentInput.trim()) {
      return;
    }
    const nextComment: PostComment = {
      comment_id: `local-${post.post_id}-${Date.now()}`,
      post_id: post.post_id,
      user_id: 'u1',
      content: commentInput.trim(),
      created_at: new Date().toISOString().slice(0, 10),
    };
    setLocalComments((prev) => [nextComment, ...prev]);
    setCommentInput('');
    setCommentOpen(true);
    onToast?.('Comment added');
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
        <button
          type="button"
          className="button button-secondary"
          onClick={() => setCommentOpen((prev) => !prev)}
        >
          Comments ({localComments.length})
        </button>
      </div>
      {commentOpen && (
        <div className="comment-panel">
          <div className="comment-input-row">
            <input
              value={commentInput}
              onChange={(event) => setCommentInput(event.target.value)}
              placeholder="Write a campus-safe comment..."
            />
            <button type="button" className="button button-primary" onClick={addComment}>
              Add
            </button>
          </div>
          <div className="comment-list">
            {localComments.map((comment) => (
              <article key={comment.comment_id} className="comment-item">
                <p>{comment.content}</p>
                <p className="muted">{comment.created_at}</p>
              </article>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default PostCard;
