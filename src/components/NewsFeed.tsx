
import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';
import StoriesSection from './StoriesSection';
import { usePosts } from '@/hooks/usePosts';
import { Card } from '@/components/ui/card';

const NewsFeed = () => {
  const { posts, loading } = usePosts();

  if (loading) {
    return (
      <div className="flex-1 max-w-2xl">
        <StoriesSection />
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
      <StoriesSection />
      <PostCreator />
      
      {/* AI-Powered Feed Header */}
      <Card className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-blue-700">AI-Curated Feed</span>
        </div>
        <p className="text-sm text-gray-600">
          Your personalized feed is optimized based on your interests, engagement patterns, and trending topics.
        </p>
      </Card>

      <div className="space-y-4">
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>

      {posts.length === 0 && (
        <Card className="text-center py-16 border-dashed">
          <div className="mb-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📝</span>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500">Be the first to share something with the community!</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NewsFeed;
