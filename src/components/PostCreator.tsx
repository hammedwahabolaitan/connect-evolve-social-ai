
import React, { useState } from 'react';
import { Image, Video, Calendar, MapPin, Smile, Camera, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '@/hooks/usePosts';

const PostCreator = () => {
  const [postContent, setPostContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();
  const { createPost } = usePosts();

  const handlePost = async () => {
    if (postContent.trim()) {
      await createPost(postContent.trim());
      setPostContent('');
      setIsExpanded(false);
    }
  };

  const handleMediaClick = (type: string) => {
    console.log(`${type} upload coming soon!`);
  };

  if (!user) return null;

  const mediaOptions = [
    { icon: Camera, label: 'Photo/Video', color: 'text-green-600', bg: 'hover:bg-green-50' },
    { icon: Users, label: 'Tag people', color: 'text-blue-600', bg: 'hover:bg-blue-50' },
    { icon: Smile, label: 'Feeling/Activity', color: 'text-yellow-600', bg: 'hover:bg-yellow-50' },
    { icon: MapPin, label: 'Check in', color: 'text-red-600', bg: 'hover:bg-red-50' },
  ];

  return (
    <Card className="mb-6 border border-gray-200 rounded-lg shadow-sm">
      <div className="p-4">
        <div className="flex space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
            {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="flex-1">
            <Textarea
              placeholder={`What's on your mind, ${user.user_metadata?.full_name?.split(' ')[0] || 'there'}?`}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              className="border-0 bg-gray-50 resize-none focus:bg-white focus:ring-1 focus:ring-blue-500 rounded-3xl px-4 py-3 text-lg placeholder-gray-500"
              rows={isExpanded ? 3 : 1}
            />
          </div>
        </div>
        
        {isExpanded && (
          <>
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-gray-700 mr-2">Add to your post</span>
                {mediaOptions.map((option, index) => (
                  <button 
                    key={index}
                    onClick={() => handleMediaClick(option.label)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${option.bg}`}
                    title={option.label}
                  >
                    <option.icon className={`w-6 h-6 ${option.color}`} />
                  </button>
                ))}
              </div>
              
              <Button 
                onClick={handlePost}
                disabled={!postContent.trim()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Post
              </Button>
            </div>
          </>
        )}
        
        {!isExpanded && (
          <Separator className="my-4" />
        )}
        
        {!isExpanded && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleMediaClick('Live Video')}
                className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Video className="w-6 h-6 text-red-500" />
                <span className="font-medium">Live video</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Photo/Video')}
                className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Camera className="w-6 h-6 text-green-500" />
                <span className="font-medium">Photo/video</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Feeling/Activity')}
                className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors"
              >
                <Smile className="w-6 h-6 text-yellow-500" />
                <span className="font-medium">Feeling/activity</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default PostCreator;
