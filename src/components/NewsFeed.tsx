
import React from 'react';
import PostCreator from './PostCreator';
import Post from './Post';

const NewsFeed = () => {
  const posts = [
    {
      author: 'Emma Thompson',
      avatar: 'ET',
      timeAgo: '2 hours ago',
      content: 'Just finished an amazing AI workshop! The future of technology is incredibly exciting. Can\'t wait to implement these new machine learning techniques in my projects. 🚀',
      likes: 24,
      comments: 8,
      shares: 3,
    },
    {
      author: 'David Rodriguez',
      avatar: 'DR',
      timeAgo: '4 hours ago',
      content: 'Working on a new social media app with AI-powered content moderation. It\'s fascinating how natural language processing can help create safer online spaces.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&h=300&fit=crop',
      likes: 45,
      comments: 12,
      shares: 7,
    },
    {
      author: 'Sarah Kim',
      avatar: 'SK',
      timeAgo: '6 hours ago',
      content: 'The integration of facial recognition in social platforms is both exciting and concerning. We need to balance innovation with privacy rights. What are your thoughts?',
      likes: 67,
      comments: 23,
      shares: 15,
    },
    {
      author: 'Michael Zhang',
      avatar: 'MZ',
      timeAgo: '8 hours ago',
      content: 'Building recommendation systems that truly understand user preferences while respecting privacy is the holy grail of social media AI. Progress is looking promising!',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop',
      likes: 89,
      comments: 31,
      shares: 22,
    },
  ];

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
        {posts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>

      {/* Load More */}
      <div className="text-center py-8">
        <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105">
          Load More Posts
        </button>
      </div>
    </div>
  );
};

export default NewsFeed;
