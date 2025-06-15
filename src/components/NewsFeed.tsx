
import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import { usePosts } from '@/hooks/usePosts';

const NewsFeed = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="flex-1 max-w-2xl">
        <PostCreator />
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 max-w-2xl">
      <PostCreator />
      
      {/* AI-Powered Feed Header */}
      <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-blue-700">AI-Curated Feed</span>
        </div>
        <p className="text-sm text-gray-600">
          Your personalized feed is optimized based on your interests, engagement patterns, and trending topics.
        </p>
      </div>

      <div className="space-y-0">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">No posts yet</p>
          <p className="text-gray-400">Be the first to share something!</p>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
