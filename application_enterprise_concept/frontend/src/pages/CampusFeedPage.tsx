import PostCard from '../components/PostCard';
import { postComments, postLikes, posts, profiles } from '../data/mockData';

function CampusFeedPage() {
  return (
    <section>
      <div className="page-header">
        <h1>Campus Feed</h1>
        <p>Instagram-style student social layer connected to marketplace trust and activity.</p>
      </div>
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard
            key={post.post_id}
            post={post}
            profile={profiles.find((profile) => profile.user_id === post.user_id)}
            likes={postLikes.filter((like) => like.post_id === post.post_id)}
            comments={postComments.filter((comment) => comment.post_id === post.post_id)}
          />
        ))}
      </div>
    </section>
  );
}

export default CampusFeedPage;
