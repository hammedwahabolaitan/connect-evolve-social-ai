
import React from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePosts } from '@/hooks/usePosts';

interface PostProps {
  id: string;
  content: string;
  image_url?: string | null;
  likes_count: number | null;
  comments_count: number | null;
  shares_count: number | null;
  created_at: string | null;
  profiles: {
    full_name: string | null;
    username?: string | null;
    avatar_url?: string | null;
  } | null;
  user_likes: boolean;
}

const Post: React.FC<PostProps> = ({ 
  id,
  content,
  image_url,
  likes_count,
  comments_count,
  shares_count,
  created_at,
  profiles,
  user_likes
}) => {
  const { toast } = useToast();
  const { toggleLike } = usePosts();

  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return 'Unknown time';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const handleLike = () => {
    toggleLike(id);
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
    const authorName = profiles?.full_name || 'Unknown User';
    toast({
      title: "Profile",
      description: `Opening ${authorName}'s profile...`,
    });
  };

  const getInitials = (name: string | null) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  const authorName = profiles?.full_name || 'Unknown User';

  return (
    <Card className="mb-4 hover:shadow-lg transition-shadow">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between">
        <button 
          onClick={handleAuthorClick}
          className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {profiles?.avatar_url ? (
              <img src={profiles.avatar_url} alt={authorName} className="w-full h-full rounded-full object-cover" />
            ) : (
              getInitials(authorName)
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{authorName}</p>
            <p className="text-sm text-gray-500">{formatTimeAgo(created_at)}</p>
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
      {image_url && (
        <div className="px-4 pb-3">
          <img 
            src={image_url} 
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
            onClick={() => toast({ title: "Likes", description: `${likes_count || 0} people liked this post` })}
          >
            {likes_count || 0} likes
          </button>
          <div className="flex space-x-4">
            <button 
              className="hover:underline"
              onClick={handleComment}
            >
              {comments_count || 0} comments
            </button>
            <button 
              className="hover:underline"
              onClick={handleShare}
            >
              {shares_count || 0} shares
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-around">
          <Button 
            variant="ghost" 
            className={`flex items-center space-x-2 hover:bg-red-50 ${user_likes ? 'text-red-500' : 'text-gray-600'}`}
            onClick={handleLike}
          >
            <Heart className={`w-5 h-5 ${user_likes ? 'fill-current' : ''}`} />
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
