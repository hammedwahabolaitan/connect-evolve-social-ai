import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Post {
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

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      // First fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          content,
          image_url,
          likes_count,
          comments_count,
          shares_count,
          created_at,
          user_id
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch profiles for all post authors
      const userIds = postsData?.map(post => post.user_id) || [];
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('id, full_name, username, avatar_url')
        .in('id', userIds);

      // Create a map of profiles by user_id
      const profilesMap = new Map(
        profilesData?.map(profile => [profile.id, profile]) || []
      );

      // Fetch likes for current user if logged in
      let userLikes: string[] = [];
      if (user) {
        const { data: likesData } = await supabase
          .from('likes')
          .select('post_id')
          .eq('user_id', user.id);
        
        userLikes = likesData?.map(like => like.post_id) || [];
      }

      // Combine the data
      const postsWithProfiles = postsData?.map(post => ({
        id: post.id,
        content: post.content,
        image_url: post.image_url,
        likes_count: post.likes_count || 0,
        comments_count: post.comments_count || 0,
        shares_count: post.shares_count || 0,
        created_at: post.created_at,
        profiles: profilesMap.get(post.user_id) || null,
        user_likes: userLikes.includes(post.id),
      })) || [];

      setPosts(postsWithProfiles);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (content: string, imageUrl?: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('posts')
        .insert({
          user_id: user.id,
          content,
          image_url: imageUrl,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    }
  };

  const toggleLike = async (postId: string) => {
    if (!user) return;

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.user_likes) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: user.id,
          });

        if (error) throw error;
      }

      fetchPosts();
    } catch (error) {
      console.error('Error toggling like:', error);
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  return {
    posts,
    loading,
    createPost,
    toggleLike,
    refreshPosts: fetchPosts,
  };
};
