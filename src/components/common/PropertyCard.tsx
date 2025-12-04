import React from 'react';
import { Heart, Share2, MapPin, Bed, Bath, Square, Phone, Star } from 'lucide-react';
import { Property } from '../../types';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { savePropertyAPI } from '../pages/api/savePropertyAPI';
import { toast } from 'sonner';
import { removeSavedPropertyAPI } from '../pages/api/removeSavedProperty';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: any) => void;
  showStatus?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, showStatus = false }) => {
  const { favorites, addFavorite, removeFavorite } = useProperty();
  const { isAuthenticated, user } = useAuth();
  const isFavorite = favorites.includes(String(property?.id));


  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleFavoriteClick = async (propertyId: number, userId: number) => {
    if (!isAuthenticated) {
      toast("Please login to save favorite properties");
      return;
    }

    if (isFavorite) {
      if (await removeSavedPropertyAPI({ propertyId, userId })) {
        toast("Property removed!");
        removeFavorite(String(property.id));
      }
    } else {
      if (await savePropertyAPI({ propertyId, userId })) {
        toast("Property added!");
        addFavorite(String(property.id));
      }
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this amazing property: ${property.title}`,
        url: window.location.href + "/" + property.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Property link copied to clipboard!');
    }
  };

  const getStatusBadge = () => {
    if (!showStatus || property.status === 'for_sale') return null;

    const statusConfig = {
      sold: { text: 'SOLD', bg: 'bg-red-500' },
      for_sale: { text: 'FOR SALE', bg: 'bg-red-500' },
      occupied: { text: 'OCCUPIED', bg: 'bg-yellow-500' },
      for_rent: { text: 'FOR RENT', bg: 'bg-green-500' },
    };

    const config = statusConfig[property.status];
    if (!config) return null;

    return (
      <div className={`absolute top-4 left-4 px-3 py-1 ${config.bg} text-white text-xs font-bold rounded-full z-10`}>
        {config.text}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0] ? BASE_URL_LOCAL + "/uploads/" + property.images[0] : property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          crossOrigin=''
        />

        {getStatusBadge()}

        {property.isFeatured && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full z-10">
            FEATURED
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button
            onClick={() => handleFavoriteClick(property.id as number, user?.userId as unknown as number)}
            className={`p-2 rounded-full transition-all duration-200 ${isFavorite
              ? 'bg-red-500 text-white'
              : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
              }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShareClick}
            className="p-2 bg-white/90 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200"
          >
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
          <span className="text-2xl font-bold text-blue-600">{formatPrice(property.price)}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex justify-between items-center mb-4 text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bedrooms} bed</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.bathrooms} bath</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span className="text-sm">{property.area} sqft</span>
            </div>
          </div>
        </div>

        {/* Agent Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center">
            <img
              src={BASE_URL_LOCAL + "/uploads/" + JSON.parse(property.agent as any).avatar}
              alt={JSON.parse(property.agent as any).name}
              className="w-8 h-8 rounded-full mr-2"
              crossOrigin=''
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{JSON.parse(property.agent as any).name}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs text-gray-600">{JSON.parse(property.agent as any).experience} years exp</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  toast("Please login first to call the agent");
                  return;
                }
                toast(`Calling ${JSON.parse(property.agent as any).phone}`)
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Contact Agent"
            >
              <Phone className="h-4 w-4" />
            </button>
            <button
              onClick={() => onViewDetails(property?.id)}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;