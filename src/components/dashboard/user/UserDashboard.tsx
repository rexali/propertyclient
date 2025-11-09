import React, { useState } from 'react';
import { 
  User, Heart, MessageCircle, Bell, Home,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { useProperty } from '../../../context/PropertyContext';
import { mockNotifications} from '../../../data/mockData';
import { Property } from '../../../types';
import ProfileTab from './profile/ProfileTab';
import SavedPropertiesTab from './favourites/SavedPropertiesTab';
import { MessagesTab } from './messages/MessagesTab';
import { NotificationsTab } from './notifications/NotificatonsTab';


interface UserDashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth();
  const {favorites } = useProperty();
  const [activeTab, setActiveTab] = useState('profile');
  

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ];
  const userNotifications = mockNotifications.slice(0, 5);

  const handleViewProperty = (property: Property) => {
    onNavigate('property-details', property);
  };


  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'favorites':
        return <SavedPropertiesTab onNavigate={handleViewProperty} />;
      case 'messages':
        return <MessagesTab />;
      case 'notifications':
        return <NotificationsTab />;
      default:
        return <ProfileTab />;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h2>
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <img
                src={user.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.fullName}!</h1>
                <p className="text-gray-600">Manage your properties and preferences</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => onNavigate('properties')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Home className="h-4 w-4 mr-2" />
                Browse Properties
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                    {tab.id === 'favorites' && favorites.length > 0 && (
                      <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {favorites.length}
                      </span>
                    )}
                    {tab.id === 'notifications' && userNotifications.filter(n => !n.isRead).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {userNotifications.filter(n => !n.isRead).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;