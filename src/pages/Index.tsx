
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NewsFeed from '@/components/NewsFeed';
import RightPanel from '@/components/RightPanel';
import { MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();

  const handleAIAssistantClick = () => {
    toast({
      title: "AI Assistant",
      description: "AI chat assistant coming soon!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block w-80">
            <div className="sticky top-20">
              <Sidebar />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <NewsFeed />
          </div>
          
          {/* Right Panel */}
          <div className="hidden xl:block w-80">
            <div className="sticky top-20">
              <RightPanel />
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button 
          onClick={handleAIAssistantClick}
          className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center group"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default Index;
