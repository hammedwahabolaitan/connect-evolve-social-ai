
import React from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import NewsFeed from '@/components/NewsFeed';
import RightPanel from '@/components/RightPanel';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          
          {/* Main Content */}
          <NewsFeed />
          
          {/* Right Panel */}
          <div className="hidden xl:block">
            <RightPanel />
          </div>
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-6 right-6">
        <button className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center">
          <span className="text-xl">🤖</span>
        </button>
      </div>
    </div>
  );
};

export default Index;
