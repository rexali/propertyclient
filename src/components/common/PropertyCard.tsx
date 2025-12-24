import React, { ChangeEvent, useState } from 'react';
import { Heart, Share2, MapPin, Bed, Bath, Square, Phone, Star, CreditCard, ShoppingCartIcon, Plus } from 'lucide-react';
import { Property } from '../../types';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { savePropertyAPI } from '../pages/api/savePropertyAPI';
import { toast } from 'sonner';
import { removeSavedPropertyAPI } from '../pages/api/removeSavedProperty';
import { handlePriceFormat } from '../../utils/handlePriceFormat';
import { handleSimpleShare } from '../../utils/handleSimpleShare';
import { makePaymentWithPopupAPI } from '../pages/payment/makePaymentWithPopupAPI';
import { Link, useNavigate } from 'react-router-dom';
import { fetchDataAPI } from '../../api/fetchDataAPI';
import { isExistingAPI } from '../pages/api/isExistingAPI';
import Image from './Image';

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: any) => void;
  showStatus?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails, showStatus = false }) => {
  const { favorites, addFavorite, removeFavorite } = useProperty();
  const { isAuthenticated, user, admin } = useAuth();
  const isFavorite = favorites.includes(String(property?.id));
  const [checkInCheckOutForm, setCheckInCheckOutForm] = useState(false);
  const [checkInCheckOutData, setCheckInCheckOutData] = useState({
    checkIn: '',
    checkOut: '',
    propertyId: '',
    propertyPrice: 0,
    userId: user?.userId
  });
  const navigate = useNavigate();

  const handleFavoriteClick = async (propertyId: number, userId: number) => {
    if (!isAuthenticated) {
      toast("Please login to save favorite properties");
      return;
    }
    let { success } = await isExistingAPI(userId, propertyId, 'favourites');

    if (success) {
      if (await removeSavedPropertyAPI({ propertyId, userId })) {
        toast("Property removed!");
        removeFavorite(String(property.id));
      }
    } else {
      if (await savePropertyAPI({ PropertyId: propertyId, UserId: userId })) {
        toast("Property added!");
        addFavorite(String(property.id));
      }
    }
  };



  async function handleContineCheckOut(propertyId: string, propertyPrice: number): Promise<void> {
    console.log(JSON.parse(window.localStorage.getItem('checkoutData') || '{}'));

    if (!isAuthenticated) {
      toast("Please login first to book a room");
      return;
    }

    await makePaymentWithPopupAPI({
      propertyId: propertyId,
      amount: propertyPrice,
      userId: user?.userId || admin?.userId,
      email: user?.email
    });

  }

  async function handleSend(): Promise<void> {
    window.localStorage.setItem('checkoutData', JSON.stringify(checkInCheckOutData));
    setCheckInCheckOutForm(false);
    await handleContineCheckOut(checkInCheckOutData.propertyId, checkInCheckOutData.propertyPrice);
    setTimeout(() => {
      setCheckInCheckOutData(prev => ({
        ...prev,
        propertyPrice: 0,
        checkIn: '',
        checkOut: '',
        propertyId: '',
      }))
    }, 3000);

  }


  function handleChangeCheckInCheckOut(event: ChangeEvent<HTMLInputElement>, propertyId: string, propertyPrice: number): void {
    const { name, value } = event.target;
    setCheckInCheckOutData(prev => ({
      ...prev,
      propertyId,
      propertyPrice,
      [name]: value
    }))

  }


  const getStatusBadge = () => {
    if (showStatus) return null;  // property.status==='occupied'

    const statusConfig = {
      sold: { text: 'SOLD', bg: 'bg-yellow-500' },
      for_sale: { text: 'FOR SALE', bg: 'bg-red-500' },
      occupied: { text: 'OCCUPIED', bg: 'bg-brown-500' },
      for_rent: { text: 'FOR RENT', bg: 'bg-green-500' },
      for_vacation: { text: 'FOR VACATION', bg: 'bg-violet-500' },
    };

    const config = statusConfig[property.status];
    if (!config) return null;

    return (
      <div className={`absolute top-4 left-4 px-3 py-1 ${config.bg} text-white text-xs font-bold rounded-full z-10`}>
        {config.text}
      </div>
    );
  };

  async function addPropertyToCartAPI(id: number, userId: string | undefined) {
    if (!isAuthenticated) {
      toast('Please login first!');
      return;
    }
    let { success } = await isExistingAPI(userId, id, 'carts');

    if (!success) {
      let result = await fetchDataAPI(
        BASE_URL_LOCAL + '/api/v1/carts',
        {
          method: "POST",
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ PropertyId: id, UserId: userId })
        });

      if (result.cart) {
        toast('Success! Property added');
        return;
      }
      toast('Fail! No Property added');
    } else {
      toast('Property already added');
    }

  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <Link to={'/properties/' + property?.id}>
          <Image
            src={BASE_URL_LOCAL + "/uploads/" + property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </Link>

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
            onClick={() => handleSimpleShare(property)}
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
          <span className="text-2xl font-bold text-blue-600">{handlePriceFormat(property.price)}</span>
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
            <Image
              src={BASE_URL_LOCAL + "/uploads/" + property.agent.avatar}
              alt={property.agent.name}
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{property.agent.name?.split(' ')[0]}</p>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-xs text-gray-600">{property.agent.experience} yrs exp</span>
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
                toast(`Calling ${(property.agent as any).phone}`)
              }}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              title="Contact Agent"
            >
              <Phone className="h-4 w-4" />
            </button>
            {/* <button
              onClick={() => onViewDetails(property?.id)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              >
              <Eye className="h-4 w-4"/>
            </button> */}

            {property.status === 'for_vacation' && (
              <button
                onClick={async () => {
                  await addPropertyToCartAPI(property.id as number, user?.userId);
                }}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <span className="text-sm"><Plus className="h-4 w-4" /></span>
                <ShoppingCartIcon className="h-4 w-4" />
              </button>
            )}

            {property.status === 'for_vacation' && (
              <button
                onClick={() => {
                  // setCheckInCheckOutForm(true);
                  navigate('/checkout/' + property.id);
                }}
                className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                <CreditCard className="h-4 w-4" />
                <span className="text-sm">Book</span>
              </button>
            )}
          </div>
        </div>

        {/* Check in and out Modal */}
        {checkInCheckOutForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-xl font-bold mb-4">Enter check in/out date?</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                <input
                  type="date"
                  name="checkIn"
                  onChange={(e) => handleChangeCheckInCheckOut(e, property.id as any, property.price)}
                  value={checkInCheckOutData.checkIn}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                <input
                  type="date"
                  name="checkOut"
                  onChange={(e) => handleChangeCheckInCheckOut(e, property.id as any, property.price)}
                  value={checkInCheckOutData.checkOut}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setCheckInCheckOutForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Continue to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;