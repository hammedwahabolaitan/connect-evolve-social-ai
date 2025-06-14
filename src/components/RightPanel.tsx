
import React from 'react';
import { Calendar, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';

const RightPanel = () => {
  const onlineUsers = [
    { name: 'Alice Cooper', status: 'online', avatar: 'AC' },
    { name: 'Bob Wilson', status: 'online', avatar: 'BW' },
    { name: 'Carol Davis', status: 'away', avatar: 'CD' },
    { name: 'Daniel Brown', status: 'online', avatar: 'DB' },
  ];

  const upcomingEvents = [
    { title: 'AI Tech Meetup', date: 'Tomorrow, 7 PM', attendees: 45 },
    { title: 'Social Media Summit', date: 'Friday, 2 PM', attendees: 120 },
    { title: 'ML Workshop', date: 'Next Week', attendees: 78 },
  ];

  const aiInsights = [
    { metric: 'Engagement Rate', value: '+15%', trend: 'up' },
    { metric: 'New Connections', value: '12', trend: 'up' },
    { metric: 'Content Reach', value: '2.3k', trend: 'up' },
  ];

  return (
    <div className="w-80 space-y-6">
      {/* AI Insights */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
          Your AI Insights
        </h3>
        <div className="space-y-3">
          {aiInsights.map((insight, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <span className="text-sm text-gray-700">{insight.metric}</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-green-600">{insight.value}</span>
                <TrendingUp className="w-3 h-3 text-green-600" />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Based on your last 7 days of activity
        </p>
      </Card>

      {/* Online Friends */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800 flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-600" />
          Active Friends
        </h3>
        <div className="space-y-3">
          {onlineUsers.map((user, index) => (
            <div key={index} className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-xs">
                  {user.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                  user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                }`}></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user.status}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Upcoming Events */}
      <Card className="p-4">
        <h3 className="font-semibold mb-4 text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-purple-600" />
          Upcoming Events
        </h3>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="border-l-4 border-purple-500 pl-3">
              <p className="font-medium text-gray-800 text-sm">{event.title}</p>
              <p className="text-xs text-gray-500">{event.date}</p>
              <p className="text-xs text-purple-600">{event.attendees} attending</p>
            </div>
          ))}
        </div>
      </Card>

      {/* AI Recommendations */}
      <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <h3 className="font-semibold mb-3 text-gray-800">AI Recommendations</h3>
        <div className="space-y-2">
          <div className="text-sm text-gray-700">
            <span className="font-medium">Connect with:</span> 3 AI researchers in your network
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Join:</span> Machine Learning Discussion Group
          </div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Follow:</span> #TechInnovation trending topic
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RightPanel;
