
import React from 'react';
import { Plus, Video } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const StoriesSection = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const handleCreateStory = () => {
    toast({
      title: "Create Story",
      description: "Story creation feature coming soon!",
    });
  };

  const handleViewStory = (name: string) => {
    toast({
      title: "View Story",
      description: `Viewing ${name}'s story...`,
    });
  };

  const stories = [
    { id: 1, name: 'Sarah Wilson', avatar: '👩‍💼', hasNew: true },
    { id: 2, name: 'John Smith', avatar: '👨‍💻', hasNew: true },
    { id: 3, name: 'Emily Davis', avatar: '👩‍🎨', hasNew: false },
    { id: 4, name: 'Mike Johnson', avatar: '👨‍🚀', hasNew: true },
    { id: 5, name: 'Lisa Brown', avatar: '👩‍🔬', hasNew: false },
  ];

  return (
    <Card className="mb-6 p-4 border border-gray-200 rounded-lg">
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {/* Create Story Button */}
        <div className="flex-shrink-0">
          <button
            onClick={handleCreateStory}
            className="relative w-24 h-32 bg-white border-2 border-gray-200 rounded-lg hover:shadow-md transition-shadow overflow-hidden group"
          >
            <div className="h-24 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Your avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-2xl">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white">
              <Plus className="w-4 h-4 text-white" />
            </div>
            <div className="h-8 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-900">Create story</span>
            </div>
          </button>
        </div>

        {/* Stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0">
            <button
              onClick={() => handleViewStory(story.name)}
              className="relative w-24 h-32 bg-white rounded-lg overflow-hidden hover:shadow-md transition-shadow group"
            >
              <div className={`h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center relative ${
                story.hasNew ? 'ring-4 ring-blue-500 ring-offset-2' : ''
              }`}>
                <span className="text-white text-3xl">{story.avatar}</span>
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-blue-500">
                  <span className="text-lg">{story.avatar}</span>
                </div>
              </div>
              <div className="absolute bottom-2 left-1 right-1">
                <span className="text-xs font-medium text-white drop-shadow-lg text-center block">
                  {story.name.split(' ')[0]}
                </span>
              </div>
              {story.hasNew && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
              )}
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StoriesSection;
