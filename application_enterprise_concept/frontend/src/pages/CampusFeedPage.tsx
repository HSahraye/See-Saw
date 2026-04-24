import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Toast from '../components/Toast';
import { postComments, postLikes, posts, profiles } from '../data/mockData';

function CampusFeedPage() {
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timer = window.setTimeout(() => setToast(''), 1800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <section>
      <div className="page-header">
        <h1>Campus Feed</h1>
        <p>Instagram-style student social layer connected to marketplace trust and activity.</p>
      </div>
      <Toast message={toast} />
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            post={post}
            profile={profiles.find((profile) => profile.user_id === post.user_id)}
            likes={postLikes.filter((like) => like.post_id === post.post_id)}
            comments={postComments.filter((comment) => comment.post_id === post.post_id)}
            onToast={setToast}
          />
        ))}
      </div>
    </section>
  );
}

export default CampusFeedPage;
