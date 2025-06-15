
import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PostProps {
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
}

const Post: React.FC<PostProps> = ({ 
  author, 
  avatar, 
  timeAgo, 
  content, 
  image, 
  likes, 
  comments, 
  shares 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const { toast } = useToast();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    toast({
      title: isLiked ? "Post Unliked" : "Post Liked",
      description: isLiked ? "Removed from liked posts" : "Added to liked posts",
    });
  };

  const handleComment = () => {
    toast({
      title: "Comments",
      description: "Comment feature coming soon!",
    });
  };

  const handleShare = () => {
    toast({
      title: "Post Shared",
      description: "Post has been shared to your timeline",
    });
  };

  const handleMoreOptions = () => {
    toast({
      title: "Post Options",
      description: "More options menu coming soon!",
    });
  };

  const handleAuthorClick = () => {
    toast({
      title: "Profile",
      description: `Opening ${author}'s profile...`,
    });
  };

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={handleAuthorClick}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {avatar}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{author}</p>
            <p className="text-sm text-gray-500">{timeAgo}</p>
          </div>
        </button>
        <Button variant="ghost" size="icon" onClick={handleMoreOptions}>
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-800 leading-relaxed">{content}</p>
      </div>

      {/* Post Image */}
      {image && (
        <div className="px-4 pb-3">
          <img 
            src={image} 
            alt="Post content" 
            className="w-full rounded-lg object-cover max-h-96 cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => toast({ title: "Image", description: "Full-screen view coming soon!" })}
          />
        </div>
      )}

      {/* AI Sentiment Badge */}
      <div className="px-4 pb-3">
        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>AI: Positive sentiment detected</span>
        </div>
      </div>

      {/* Engagement Stats */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <button 
            className="hover:underline"
            onClick={() => toast({ title: "Likes", description: `${likeCount} people liked this post` })}
          >
            {likeCount} likes
          </button>
          <div className="flex space-x-4">
            <button 
              className="hover:underline"
              onClick={handleComment}
            >
              {comments} comments
            </button>
            <button 
              className="hover:underline"
              onClick={handleShare}
            >
              {shares} shares
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <Button 
            variant="ghost" 
            className={`flex items-center space-x-2 hover:bg-red-50 ${isLiked ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            <span>Like</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 hover:bg-blue-50 text-gray-600" onClick={handleComment}>
            <MessageCircle className="w-5 h-5" />
            <span>Comment</span>
          </Button>
          <Button variant="ghost" className="flex items-center space-x-2 hover:bg-green-50 text-gray-600" onClick={handleShare}>
            <Share className="w-5 h-5" />
            <span>Share</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Post;
