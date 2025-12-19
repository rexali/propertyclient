import React, { useState } from 'react';
import {
  User, Home, BarChart3, Plus, Heart, MessageCircle, Bell,
  Users, TrendingUp,
  ShoppingBag,
} from 'lucide-react';
import { useProperty } from '../../../context/PropertyContext';
import { PropertiesTab } from './property/PropertiesTab';
import { useAuth } from '../../../context/AuthContext';
import PropertyAdd from './property/PropertyAdd';
import ProfileTab from './profile/ProfileTab';
import { UsersTab } from './user/UsersTab';
import SavedTab from './favourites/SavedTabs';
import { MessagesTab } from './messages/MessagesTab';
import { NotificationsTab } from './notifications/NotificatonsTab';
import { getAllUsersAPI } from '../api/admin/profile/getAllUsersAPI';
import { useNavigate } from 'react-router-dom';
import { BookingsTab } from './bookings/BookingsTabs';
import { ReviewsTab } from './reviews/ReviewsTab';
import CartsTab from './carts/CartsTab';

let users = [];
(async () => {
  let data = await getAllUsersAPI();
  users = data?.users;
})();

const AdminDashboard: React.FC = () => {
  const { admin, logout } = useAuth();
  const { properties } = useProperty();
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'properties', name: 'Properties', icon: Home },
    { id: 'bookings', name: 'Bookings', icon: Home },
    { id: 'add-property', name: 'Property', icon: Plus },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'reviews', name: 'Reviews', icon: Home },
    { id: 'carts', name: 'Carts', icon: ShoppingBag },
    { id: 'reports', name: 'Reports', icon: BarChart3 },
    { id: 'analysis', name: 'Analysis', icon: TrendingUp },

    // { id: 'sales', name: 'Sales Progress', icon: TrendingUp }
  ];

  const stats = [
    { label: 'Total Properties', value: properties?.length, icon: Home, color: 'blue' },
    { label: 'Active Users', value: users?.length, icon: Users, color: 'green' },
    { label: 'Properties Sold', value: properties?.filter(p => p.status === 'sold')?.length, icon: TrendingUp, color: 'yellow' },
    { label: 'Total Revenue', value: '$2.4M', icon: BarChart3, color: 'purple' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileTab />;
      case 'properties':
        return <PropertiesTab onNavigate={navigate} />;
      case 'bookings':
        return <BookingsTab />;
      case 'add-property':
        return <PropertyAdd setOpen={undefined} />;
      case 'favorites':
        return <SavedTab onNavigate={navigate} />;
      case 'messages':
        return <MessagesTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'users':
        return <UsersTab />;
      case 'reviews':
        return <ReviewsTab />;
      case 'carts':
        return <CartsTab onNavigate={navigate} />;
      case 'reports':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reports & Analytics</h2>
            <div className="text-center py-12">
              <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Reports and analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Market Analysis</h2>
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Market analysis tools coming soon...</p>
            </div>
          </div>
        );
      default:
        return <ProfileTab />;
    }
  };

  if (!admin?.role) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin access required</h2>
          <button
            onClick={() => navigate('/admin-login')}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Admin Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Admin Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mr-4">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back, {admin.fullName}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
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
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-red-100 text-red-700 border border-red-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
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

export default AdminDashboard;