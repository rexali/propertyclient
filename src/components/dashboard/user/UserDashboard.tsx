import React, { useState } from 'react';
import {
  User, Heart, MessageCircle, Bell, Home,
  HomeIcon,
  Wallet,
  ShoppingBagIcon,
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
// import { mockNotifications } from '../../../data/mockData';
import ProfileTab from './profile/ProfileTab';
import SavedPropertiesTab from './favourites/SavedPropertiesTab';
import { MessagesTab } from './messages/MessagesTab';
import { NotificationsTab } from './notifications/NotificatonsTab';
import { useNavigate } from 'react-router-dom';
import { BASE_URL_LOCAL } from '../../../constants/constants';
import { PropertiesTab } from '../admin/property/PropertiesTab';
import { BookingsTab } from '../admin/bookings/BookingsTabs';
import { ReviewsTab } from '../admin/reviews/ReviewsTab';
import CartsTab from '../admin/carts/CartsTab';


const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth() as any;
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate()


  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'messages', name: 'Messages', icon: MessageCircle },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'properties', name: 'Properties', icon: HomeIcon },
    { id: 'bookings', name: 'Bookings', icon: Wallet },
    { id: 'reviews', name: 'Reviews', icon: Wallet },
    { id: 'carts', name: 'Carts', icon: ShoppingBagIcon },

  ];
  // const userNotifications = mockNotifications.slice(0, 5);

  const handleViewProperty = (value: any) => {
    navigate('/properties/' + value, { state: value });
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
      case 'properties':
        if (user.role === 'provider') {
          return <PropertiesTab onNavigate={navigate} />;
        }
        return;
      case 'reviews':
        if (user.role === 'provider') {
          return <ReviewsTab />;
        }
        return;
      case 'carts':
        return <CartsTab onNavigate={navigate} />;
      case 'bookings':
        return <BookingsTab />;
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
            onClick={() => navigate('/login')}
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
              {user.profile?.image ? (<img
                crossOrigin=""
                src={BASE_URL_LOCAL + "/uploads/" + user.profile?.image}
                alt={user.profile?.name}
                width={10}
                height={10}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />) : <User className="h-20 w-20 text-black" />}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.fullName}!</h1>
                <p className="text-gray-600">Manage your properties and preferences</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/properties')}
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
                if (user.role === 'provider') {

                  return (<button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.name}
                  </button>
                  );


                } else if (user.role === 'user') {

                  if (tab.name === 'Properties' || tab.name === 'Reviews') {
                    return;
                  }

                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
                        }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.name}
                      {/* {tab.id === 'favorites' && favorites.length > 0 && (
                      <span className="ml-auto bg-blue-600 text-white text-xs rounded-full px-2 py-1">
                        {favorites.length}
                      </span>
                    )} */}
                      {/* {tab.id === 'notifications' && userNotifications.filter(n => !n.isRead).length > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        {userNotifications.filter(n => !n.isRead).length}
                      </span>
                    )} */}
                    </button>
                  );
                }
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