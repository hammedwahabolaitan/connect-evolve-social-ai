
import React from 'react';
import { Users, Calendar, Image, Video, Settings, Heart, MessageCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const Sidebar = () => {
  const { toast } = useToast();

  const menuItems = [
    { icon: Users, label: 'Friends', count: '1.2k', action: () => toast({ title: "Friends", description: "Opening friends list..." }) },
    { icon: Calendar, label: 'Events', count: '3', action: () => toast({ title: "Events", description: "Opening events..." }) },
    { icon: Image, label: 'Photos', count: '247', action: () => toast({ title: "Photos", description: "Opening photo gallery..." }) },
    { icon: Video, label: 'Videos', count: '12', action: () => toast({ title: "Videos", description: "Opening video library..." }) },
    { icon: MessageCircle, label: 'Groups', count: '8', action: () => toast({ title: "Groups", description: "Opening groups..." }) },
    { icon: Heart, label: 'Saved', count: '45', action: () => toast({ title: "Saved", description: "Opening saved posts..." }) },
  ];

  const suggestions = [
    { name: 'Alex Johnson', mutualFriends: 12, avatar: 'AJ' },
    { name: 'Sarah Wilson', mutualFriends: 8, avatar: 'SW' },
    { name: 'Mike Chen', mutualFriends: 15, avatar: 'MC' },
  ];

  const handleAddFriend = (name: string) => {
    toast({
      title: "Friend Request Sent",
      description: `Friend request sent to ${name}`,
    });
  };

  const handleTrendingClick = (tag: string) => {
    toast({
      title: "Trending Topic",
      description: `Viewing posts for ${tag}`,
    });
  };

  return (
    <div className="w-80 space-y-6">
      {/* Quick Navigation */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800">Quick Access</h3>
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <button 
              key={index}
              onClick={item.action}
              className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">{item.label}</span>
              </div>
              <span className="text-sm text-gray-500">{item.count}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Friend Suggestions */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800">People You May Know</h3>
        <div className="space-y-4">
          {suggestions.map((person, index) => (
            <div key={index} className="flex items-center space-x-3">
              <button className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm hover:scale-105 transition-transform">
                {person.avatar}
              </button>
              <div className="flex-1">
                <p className="font-medium text-gray-800 text-sm">{person.name}</p>
                <p className="text-xs text-gray-500">{person.mutualFriends} mutual friends</p>
              </div>
              <button 
                onClick={() => handleAddFriend(person.name)}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline transition-colors"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800">Trending Now</h3>
        <div className="space-y-3">
          {['#AI Technology', '#Social Media', '#Tech Innovation', '#Future Tech'].map((tag, index) => (
            <button 
              key={index} 
              onClick={() => handleTrendingClick(tag)}
              className="block text-blue-600 hover:text-blue-700 cursor-pointer text-sm font-medium hover:underline transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Sidebar;
