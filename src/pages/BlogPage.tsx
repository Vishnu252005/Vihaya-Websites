import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/SEOHead';
import { fetchAllSocialPosts, SocialPost } from '../services/socialService';

export const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchAllSocialPosts(9).then((items) => {
      if (mounted) {
        setPosts(items);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Blog & Social Updates - Vihaya"
        description="Latest updates from Vihaya: articles, announcements, and real-time posts from Instagram and LinkedIn."
        canonicalUrl="https://vihaya.app/blog"
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Vihaya Blog</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Articles and real-time social updates.</p>
          </div>

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">No posts available right now.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow"
                  whileHover={{ y: -4 }}
                >
                  {post.mediaUrl && (
                    <img src={post.mediaUrl} alt={post.platform} className="w-full h-48 object-cover" />
                  )}
                  <div className="p-4">
                    <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      {post.platform}
                    </div>
                    {post.text && (
                      <p className="mt-1 text-sm text-gray-800 dark:text-gray-200 line-clamp-3">{post.text}</p>
                    )}
                    <div className="mt-3 text-xs text-gray-400">
                      {post.timestamp ? new Date(post.timestamp).toLocaleString() : ''}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BlogPage;

