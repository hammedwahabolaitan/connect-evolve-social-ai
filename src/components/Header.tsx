
import React from 'react';
import { Bell, MessageSquare, Users, Search, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const { toast } = useToast();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 5 new notifications",
    });
  };

  const handleMessagesClick = () => {
    toast({
      title: "Messages",
      description: "You have 3 new messages",
    });
  };

  const handleFriendsClick = () => {
    toast({
      title: "Friends",
      description: "Opening friends list...",
    });
  };

  const handleSettingsClick = () => {
    toast({
      title: "Settings",
      description: "Opening settings panel...",
    });
  };

  const handleProfileClick = () => {
    toast({
      title: "Profile",
      description: "Opening your profile...",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('search') as string;
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  return (
    <header className="bg-white shadow-md border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              onClick={() => window.location.reload()}
            >
              SocialAI
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                name="search"
                placeholder="Search for friends, posts, or topics..." 
                className="pl-10 bg-gray-50 border-0 focus:bg-white focus:ring-2 focus:ring-blue-500"
              />
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-blue-50"
              onClick={handleFriendsClick}
            >
              <Users className="w-5 h-5 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-blue-50"
              onClick={handleMessagesClick}
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-blue-50"
              onClick={handleNotificationClick}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-blue-50"
              onClick={handleSettingsClick}
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </Button>
            <button 
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handleProfileClick}
            >
              <User className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
