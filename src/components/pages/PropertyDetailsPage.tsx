import React, { ChangeEvent, useState } from 'react';
import {
  ChevronLeft, ChevronRight, Heart, Share2, MapPin, Bed, Bath, Square,
  Car, Wifi, Dumbbell, Waves, Shield, Phone, MessageCircle,
  Facebook, Twitter, Copy, Star,
  Send,
  MailIcon,
  CreditCard,
  Plus,
  ShoppingCartIcon
} from 'lucide-react';
import { useProperty } from '../../context/PropertyContext';
import { useAuth } from '../../context/AuthContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { savePropertyAPI } from './api/savePropertyAPI';
import { toast } from 'sonner';
import { removeSavedPropertyAPI } from './api/removeSavedProperty';
import { getPropertyAPI } from './api/getPropertyAPI';
import { handleViewLocation } from '../../utils/handleViewLocation';
import { addMessageAPI } from '../dashboard/api/admin/messages/addMessageAPI';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { handleSimpleShare } from '../../utils/handleSimpleShare';
import { ReviewList } from './components/ReviewList';
import ReviewAdd from './components/ReviewAdd';
import { makePaymentWithPopupAPI } from './payment/makePaymentWithPopupAPI';
import { fetchDataAPI } from '../../api/fetchDataAPI';
import { isExistingAPI } from './api/isExistingAPI';
import { getPropertyById } from '../../mocks';

const PropertyDetailsPage: React.FC = () => {
  const { isAuthenticated, user, admin } = useAuth();
  const { favorites, addFavorite, removeFavorite, setProperty, property } = useProperty();
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = params.id || location.state;

  const initialMessage = {
    recipientId: property?.UserId || '', // agentId or email
    senderId: user?.userId || admin?.userId || '',  // user, userId
    subject: '',
    content: '',
    PropertyId: propertyId || '',
    UserId: user?.userId || admin?.userId || '',
  };

  const [checkInCheckOutForm, setCheckInCheckOutForm] = useState(false);
  const [checkInCheckOutData, setCheckInCheckOutData] = useState({
    checkIn: '',
    checkOut: '',
    propertyId: '',
    propertyPrice: 0,
    userId: user?.userId
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMessage, setContactMessage] = useState(initialMessage);
  const isFavorite = favorites.includes(property?.id as any);


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

  async function handleContineCheckOut(propertyId: string, propertyPrice: number): Promise<void> {
    console.log(JSON.parse(window.localStorage.getItem('checkoutData') || '{}'));

    await makePaymentWithPopupAPI({
      propertyId,
      amount: propertyPrice,
      userId: user?.userId || admin?.userId,
      email: user?.email
    });
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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property?.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property?.images.length) % property?.images.length);
  };

  const handleSetContactMessage = (e: { target: { name: string, value: string, type: string } }) => {
    const { name, value } = e.target;
    setContactMessage({
      ...contactMessage,
      [name]: value
    })
  }

  const handlePhoneCall = (property: any) => {
    if (!isAuthenticated) {
      toast("Please login first to call");
      return;
    }
    window.location.assign(`tel:+234` + property?.agent?.phone.replace(/^./, ''));
  }

  const handleSendEmail = (property: any) => {
    if (!isAuthenticated) {
      toast("Please login first to send email");
      return;
    }
    window.location.assign(`mailto:` + property?.agent?.email) as any;
  }

  const handleSendSMS = (property: any) => {
    if (!isAuthenticated) {
      toast("Please login first to send sms");
      return;
    }
    window.location.assign(`sms//:+234` + property?.agent?.phone.replace(/^./, ''));
  }

  const handleFavoriteClick = async (propertyId: number, userId: number) => {
    if (!isAuthenticated) {
      toast("Please login to save a property");
      return;
    }
    let { success } = await isExistingAPI(userId, propertyId, 'favourites');

    if (success) {
      if (await removeSavedPropertyAPI({ propertyId, userId })) {
        toast("Property removed!");
        removeFavorite(String(property?.id));
      }
    } else {
      if (await savePropertyAPI({ PropertyId: propertyId, UserId: userId })) {
        toast("Property added!");
        addFavorite(property?.id as any);
      }
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing property: ${property?.title}`;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
      default:
        if (navigator.share) {
          navigator.share({ title: property?.title, text, url });
        }
    }
  };

  const handleContactAgent = () => {
    if (!isAuthenticated) {
      toast('Please login to contact agents')
      return;
    }
    setShowContactForm(true);
  };

  const handleSendMessage = async () => {
    // Simulate sending message
    console.log('Submitting message ..', contactMessage);
    let result = await addMessageAPI(contactMessage);
    if (result) {
      toast('Message sent to agent!');
      setShowContactForm(false);
      setContactMessage(initialMessage);
    } else {
      toast('Message failed!')
    }
  };



  async function addPropertyToCartAPI(id: number, userId: string | undefined) {
    if (!isAuthenticated) {
      toast('Please login first!');
      return;
    }
    let { success } = await isExistingAPI(userId, id, 'carts');

    if (success) {
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

  const amenityIcons: { [key: string]: any } = {
    'City View': MapPin,
    'Gym': Dumbbell,
    'Parking': Car,
    'Pool': Waves,
    'Security System': Shield,
    'WiFi': Wifi,
    'Garage': Car,
    'Garden': Waves,
    'Home Theater': Square,
    'Balcony': Square,
    'Concierge': Shield,
    'Doorman': Shield,
    'Rooftop Access': MapPin,
    'Laundry': Square,
    'Storage': Square,
    'Water View': Waves,
    'Private Deck': Square,
    'Modern Kitchen': Square,
    'Walk-in Closets': Square,
    'Backyard': Waves,
    'Fireplace': Square,
    'Updated Kitchen': Square,
    'Hardwood Floors': Square,
  };

  React.useEffect(() => {
    (async () => {
      let data;
      try {
        data = await getPropertyAPI(propertyId);
      } catch (error) {
        console.log(error);
      }
      
      let mockProperty = getPropertyById(propertyId as number);      
      let _property = Object.keys(data ?? {}).length ? data : mockProperty;
      setProperty({
        ..._property
      })

    })();
  }, [propertyId])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Properties
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96 md:h-[500px]">
            <img
              src={property?.images[currentImageIndex] ? BASE_URL_LOCAL + "/uploads/" + property?.images[currentImageIndex] : property?.images[currentImageIndex]}
              alt={property?.title}
              className="w-full h-full object-cover"
              crossOrigin=''
            />

            {/* Image Navigation */}
            {property?.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors duration-200"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Status Badge */}
            {property?.status !== 'for_sale' && (
              <div className={`absolute top-4 left-4 px-4 py-2 rounded-full text-white font-bold ${property?.status === 'sold' ? 'bg-red-500' : 'bg-green-500'
                }`}>
                {property?.status.replace('_', ' ').toUpperCase()}
              </div>
            )}

            {/* Featured Badge */}
            {property?.isFeatured && (
              <div className="absolute top-4 right-4 px-4 py-2 bg-orange-500 text-white rounded-full font-bold">
                FEATURED
              </div>
            )}

            {/* Action Buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={() => handleFavoriteClick(property?.id as number, user?.userId as unknown as number)}
                className={`p-3 rounded-full transition-all duration-200 ${isFavorite
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white'
                  }`}
              >
                <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <div className="relative group">
                <button
                  onClick={() => handleSimpleShare(property)}
                  className="p-3 bg-white/90 rounded-full text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
                <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
                  <div className="bg-white rounded-lg shadow-lg p-2 flex space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <Facebook className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-2 text-blue-400 hover:bg-blue-50 rounded-lg"
                    >
                      <Twitter className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Indicators */}
            {property?.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {property?.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Info */}
              <div className="lg:col-span-2">
                <div className="flex justify-between items-start mb-4">
                  <h1 className="text-3xl font-bold text-gray-900">{property?.title}</h1>
                  <span className="text-3xl font-bold text-blue-600">{formatPrice(property?.price)}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <div className="flex items-center text-gray-600 mb-6">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span className="text-lg">{property?.location}</span>
                  </div>
                  {/* ratings */}
                  <div className="flex items-center space-x-1">
                    {property?.rating === 0 && <Star className="h-4 w-4 text-yellow-400 fill-current" />}
                    {[...Array(property?.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < property?.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill={i < property?.rating ? "#facc15" : "none"}
                      />
                    ))}
                    <span className="text-sm text-gray-600">{property?.rating}</span>
                  </div>
                </div>

                {/* Property Details */}
                <div className="flex flex-wrap gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">{property?.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">{property?.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center">
                    <Square className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">{property?.area} sq ft</span>
                  </div>
                  <div className="flex items-center">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium capitalize">
                      {property?.type}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                  <p className="text-gray-700 leading-relaxed">{property?.description}</p><br />
                  <p className="text-gray-700 leading-relaxed">SKU: {property?.sku ?? ''}</p>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {property?.amenities.map((amenity, index) => {
                      const Icon = amenityIcons[amenity] || Square;
                      return (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <Icon className="h-5 w-5 text-blue-600 mr-3" />
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Map Section */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
                  <div className="bg-gray-200 h-64 rounded-lg overflow-hidden">
                    <div className="text-center text-gray-600">
                      <p className="h-96 bg-gray-300 flex items-center justify-center">
                        <iframe className='w-full' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.9764542677494!2d8.542524274532385!3d11.976131035921783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11ae8132a0dd23b3%3A0x1d15892c04225543!2sAlmubarak%20Waqf%20Foundation!5e0!3m2!1sen!2sng!4v1759930542722!5m2!1sen!2sng" width="100%" height="450" style={{ border: 0 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">Lat: {property?.coordinates.lat}, Lng: {property?.coordinates.lng}</p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  {/* Agent Card */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={property?.agent?.avatar ? BASE_URL_LOCAL + '/uploads/' + property?.agent?.avatar : ''}
                        alt={property?.agent?.name}
                        className="w-16 h-16 rounded-full mr-4"
                        crossOrigin=''
                      />
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{property?.agent?.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{property?.agent?.experience} years experience</span>
                        </div>
                      </div>
                    </div>
                    {/* Send Email */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center text-gray-600">
                        <button
                          onClick={() => {
                            handleSendEmail(property);
                          }}
                          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"

                        >
                          <MailIcon className="h-4 w-4 mr-2" />
                          Email</button>
                      </div>
                      {/* Send SMS */}
                      <div className="flex items-center text-gray-600">
                        <button
                          onClick={() => {
                            handleSendSMS(property);
                          }}
                          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <MessageCircle className="h-4 w-4 mr-2" />
                          SMS</button>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          handlePhoneCall(property)
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call Agent
                      </button>
                      <button
                        onClick={() => {
                          handleContactAgent()
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send Message
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      {property.status === 'for_vacation' && (
                        <button
                          onClick={() => {
                            // setCheckInCheckOutForm(true);
                            navigate('/checkout/' + property.id);
                          }}
                          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"

                        // className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"   
                        >
                          <CreditCard className="h-4 w-4 mr-2" />
                          <span className="text-sm">Book Now</span>
                        </button>
                      )}
                      {property.status === 'for_vacation' && (
                        <button
                          onClick={async () => {
                            await addPropertyToCartAPI(property.id as number, user?.userId);
                          }}
                          className="w-full flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"

                        // className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <span className="text-sm"><Plus className="h-4 w-4" /></span>
                          <ShoppingCartIcon className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        id='position'
                        onClick={() => {
                          handleViewLocation(property?.location);
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        <MapPin className="h-4 w-4 mr-1" /> <span>View on Map</span>
                      </button>
                      <button
                        id='location'
                        onClick={() => {
                          handleViewLocation(property?.location);
                        }}
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Virtual Tour
                      </button>
                      <button
                        onClick={() => {
                          if (!isAuthenticated) {
                            toast("Please login first to before you schedule a visit");
                            return;
                          }
                          navigate('/contact')
                        }
                        }
                        className="w-full flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        Schedule Viewing
                      </button>

                      <button
                        onClick={() => {
                          navigate('/providers/' + property.UserId)
                        }
                        }
                        className="w-full flex items-center justify-center px-4 py-3 bg-green-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                      >
                        View more from {property?.User?.Profile?.name ?? 'Provider'}
                      </button>
                    </div>
                  </div>

                  {/* Property Stats */}
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Property Details</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Property ID:</span>
                        <span className="font-medium">{property?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Listed:</span>
                        <span className="font-medium">
                          {new Date(property?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Updated:</span>
                        <span className="font-medium">
                          {new Date(property?.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium capitalize ${property?.status === 'for_sale' ? 'text-green-600' :
                          property?.status === 'sold' ? 'text-red-600' : 'text-green-600'
                          }`}>
                          {property?.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Review section */}
          <ReviewList reviews={property?.Reviews as any || [{
            id: '1',
            PropertyId: 1,
            reviewer: 'anonymous',
            content: 'Good one',
            rating: 4,
            createdAt: '12-8-2025'
          }]} />
          <ReviewAdd propertyId={propertyId} />
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Contact {property?.agent?.name}</h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
              <input
                type="text"
                name="email"
                value={property?.agent?.email}
                disabled
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
              <input
                type="text"
                name="email"
                disabled
                value={user?.email || admin?.email}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={contactMessage.subject}
                onChange={handleSetContactMessage}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                name='content'
                value={contactMessage.content}
                onChange={handleSetContactMessage}
                placeholder="Hi, I'm interested in this property?. Please contact me with more information."
                className="w-full p-3 border border-gray-300 rounded-lg h-32 mb-4 resize-none"
                rows={4}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowContactForm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Contact Form Modal */}
      {checkInCheckOutForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-xl font-bold mb-4">Enter Check in and Check out date?</h3>

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
  );
};

export default PropertyDetailsPage;