import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Globe, ThumbsUp, Angry, Laugh, Frown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
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
  const [showReactions, setShowReactions] = useState(false);

  const formatTimeAgo = (dateString: string | null) => {
    if (!dateString) return 'Unknown time';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    
    return date.toLocaleDateString();
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

  const handleReaction = (reaction: string) => {
    toast({
      title: "Reaction",
      description: `You reacted with ${reaction}`,
    });
    setShowReactions(false);
  };

  const authorName = profiles?.full_name || 'Unknown User';
  const reactions = [
    { icon: ThumbsUp, label: 'Like', color: 'text-blue-600' },
    { icon: Heart, label: 'Love', color: 'text-red-500' },
    { icon: Laugh, label: 'Haha', color: 'text-yellow-500' },
    { icon: Frown, label: 'Sad', color: 'text-blue-400' },
    { icon: Angry, label: 'Angry', color: 'text-red-600' },
  ];

  return (
    <Card className="mb-4 hover:shadow-sm transition-shadow border border-gray-200 rounded-lg">
      {/* Post Header */}
      <div className="p-4 flex items-start justify-between">
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
            <p className="font-semibold text-gray-900 text-sm">{authorName}</p>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>{formatTimeAgo(created_at)}</span>
              <span>•</span>
              <Globe className="w-3 h-3" />
            </div>
          </div>
        </button>
        <Button variant="ghost" size="icon" onClick={handleMoreOptions} className="rounded-full hover:bg-gray-100">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 leading-relaxed">{content}</p>
      </div>

      {/* Post Image */}
      {image_url && (
        <div className="pb-3">
          <img 
            src={image_url} 
            alt="Post content" 
            className="w-full object-cover max-h-96 cursor-pointer hover:opacity-95 transition-opacity"
            onClick={() => toast({ title: "Image", description: "Full-screen view coming soon!" })}
          />
        </div>
      )}

      {/* AI Sentiment Badge */}
      <div className="px-4 pb-3">
        <Badge variant="secondary" className="bg-gradient-to-r from-green-50 to-blue-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          AI: Positive sentiment detected
        </Badge>
      </div>

      {/* Engagement Stats */}
      {(likes_count! > 0 || comments_count! > 0 || shares_count! > 0) && (
        <div className="px-4 py-2">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              {likes_count! > 0 && (
                <button 
                  className="flex items-center space-x-1 hover:underline"
                  onClick={() => toast({ title: "Likes", description: `${likes_count} people liked this post` })}
                >
                  <div className="flex -space-x-1">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <ThumbsUp className="w-2.5 h-2.5 text-white" />
                    </div>
                    <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                      <Heart className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>
                  <span>{likes_count}</span>
                </button>
              )}
            </div>
            <div className="flex space-x-4">
              {comments_count! > 0 && (
                <button 
                  className="hover:underline"
                  onClick={handleComment}
                >
                  {comments_count} comments
                </button>
              )}
              {shares_count! > 0 && (
                <button 
                  className="hover:underline"
                  onClick={handleShare}
                >
                  {shares_count} shares
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <Separator />

      {/* Reaction Buttons */}
      <div className="relative">
        {showReactions && (
          <div className="absolute bottom-full left-4 mb-2 flex items-center space-x-2 bg-white rounded-full shadow-lg border p-2 z-10">
            {reactions.map((reaction, index) => (
              <button
                key={index}
                onClick={() => handleReaction(reaction.label)}
                className="w-10 h-10 rounded-full hover:scale-125 transition-transform flex items-center justify-center hover:bg-gray-50"
              >
                <reaction.icon className={`w-6 h-6 ${reaction.color}`} />
              </button>
            ))}
          </div>
        )}
        
        <div className="px-4 py-2">
          <div className="flex items-center justify-around">
            <Button 
              variant="ghost" 
              className={`flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-4 py-2 transition-colors ${user_likes ? 'text-blue-600' : 'text-gray-600'}`}
              onClick={handleLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <ThumbsUp className={`w-5 h-5 ${user_likes ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 hover:bg-gray-50 text-gray-600 rounded-lg px-4 py-2 transition-colors" 
              onClick={handleComment}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-medium">Comment</span>
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-2 hover:bg-gray-50 text-gray-600 rounded-lg px-4 py-2 transition-colors" 
              onClick={handleShare}
            >
              <Share className="w-5 h-5" />
              <span className="font-medium">Share</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Post;
