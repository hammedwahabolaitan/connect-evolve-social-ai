
import React, { useState } from 'react';
import { Image, Video, Calendar, MapPin, Smile } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const PostCreator = () => {
  const [postContent, setPostContent] = useState('');
  const { toast } = useToast();

  const handlePost = () => {
    if (postContent.trim()) {
      console.log('Creating post:', postContent);
      toast({
        title: "Post Created",
        description: "Your post has been shared successfully!",
      });
      setPostContent('');
    }
  };

  const handleMediaClick = (type: string) => {
    toast({
      title: `Add ${type}`,
      description: `${type} upload feature coming soon!`,
    });
  };

  return (
    <Card className="p-4 mb-6">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-medium">
          You
        </div>
        <div className="flex-1">
          <Textarea
            placeholder="What's on your mind? Share your thoughts with AI-powered insights..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="border-0 bg-gray-50 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500"
            rows={3}
          />
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleMediaClick('Photo')}
                className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors"
              >
                <Image className="w-5 h-5" />
                <span className="text-sm">Photo</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Video')}
                className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
              >
                <Video className="w-5 h-5" />
                <span className="text-sm">Video</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Event')}
                className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Event</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Location')}
                className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <MapPin className="w-5 h-5" />
                <span className="text-sm">Location</span>
              </button>
              <button 
                onClick={() => handleMediaClick('Feeling')}
                className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
              >
                <Smile className="w-5 h-5" />
                <span className="text-sm">Feeling</span>
              </button>
            </div>
            
            <Button 
              onClick={handlePost}
              disabled={!postContent.trim()}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6"
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostCreator;
