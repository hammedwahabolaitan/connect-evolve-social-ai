
import React, { useState } from 'react';
import { Bell, MessageSquare, Users, Search, Settings, User, LogOut, Home, Video, Store, Group } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out",
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };

  const navItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Video, label: 'Watch', active: false },
    { icon: Store, label: 'Marketplace', active: false },
    { icon: Group, label: 'Groups', active: false },
  ];

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left Section - Logo & Search */}
          <div className="flex items-center space-x-4 flex-1">
            <button 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              onClick={() => window.location.reload()}
            >
              SocialAI
            </button>
            
            <div className="max-w-xs w-full">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search SocialAI" 
                  className="pl-10 bg-gray-100 border-0 focus:bg-white focus:ring-1 focus:ring-blue-500 h-10 rounded-full"
                />
              </form>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className="hidden md:flex items-center space-x-2 flex-1 justify-center max-w-md">
            {navItems.map((item, index) => (
              <button
                key={index}
                className={`flex items-center justify-center w-28 h-12 rounded-lg transition-colors relative ${
                  item.active 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={() => toast({ title: item.label, description: `Opening ${item.label}...` })}
              >
                <item.icon className="w-6 h-6" />
                {item.active && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-md" />
                )}
              </button>
            ))}
          </div>

          {/* Right Section - User Actions */}
          <div className="flex items-center space-x-2 flex-1 justify-end">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100 rounded-full w-10 h-10"
              onClick={handleFriendsClick}
            >
              <Users className="w-5 h-5 text-gray-600" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100 rounded-full w-10 h-10"
              onClick={handleMessagesClick}
            >
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                3
              </Badge>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative hover:bg-gray-100 rounded-full w-10 h-10"
              onClick={handleNotificationClick}
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs min-w-[18px] h-[18px] flex items-center justify-center p-0 rounded-full">
                5
              </Badge>
            </Button>
            
            <div className="h-6 w-px bg-gray-300 mx-2" />
            
            <button 
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
              onClick={handleProfileClick}
            >
              {user?.user_metadata?.avatar_url ? (
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <span className="text-white text-sm font-medium">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </span>
              )}
            </button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-gray-100 rounded-full w-10 h-10"
              onClick={handleSettingsClick}
            >
              <Settings className="w-4 h-4 text-gray-600" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:bg-red-50 rounded-full w-10 h-10"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
