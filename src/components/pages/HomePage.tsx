import React, { useEffect } from 'react';
import { Star, Users, Award, ChevronRight, TrendingUp } from 'lucide-react';
import PropertyCard from '../common/PropertyCard';
import SearchFilters from '../search/SearchFilters';
import { useProperty } from '../../context/PropertyContext';
import { getPropertiesAPI } from '../dashboard/api/admin/property/getPropertiesAPI';

interface HomePageProps {
  onNavigate: (page: string, data?: any) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { properties, setProperties, filters, setFilters, setCategoryProperties } = useProperty();
  const featuredProperties = properties?.filter(p => p.isFeatured).slice(0, 6);
  const popularProperties = properties?.filter(p => p.status).slice(0, 8);
  const newProperties = properties?.filter(p => p.status)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);
  const soldProperties = properties?.filter(p => p.status === 'sold').slice(0, 4);

  const handleViewProperty = (property: any) => {
    onNavigate('property-details', property);
  };

  const categories = [
    { name: 'Apartments', count: properties?.filter(p => p.type === 'apartment').length, icon: '🏢' },
    { name: 'Houses', count: properties?.filter(p => p.type === 'house').length, icon: '🏠' },
    { name: 'Condos', count: properties?.filter(p => p.type === 'condo').length, icon: '🏘️' },
    { name: 'Villas', count: properties?.filter(p => p.type === 'villa').length, icon: '🏖️' },
  ];

  const stats = [
    { label: 'Properties Sold', value: '2,847', icon: TrendingUp },
    { label: 'Happy Clients', value: '1,963', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Expert Agents', value: '124', icon: Star },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Jennifer Lopez',
      role: 'Home Buyer',
      content: 'PropertyHub made finding our dream home so easy. The team was professional and guided us through every step.',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 5,
    },
    {
      id: 2,
      name: 'Robert Johnson',
      role: 'Property Investor',
      content: 'Excellent service and market knowledge. I have invested in multiple properties through PropertyHub with great returns.',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 5,
    },
    {
      id: 3,
      name: 'Maria Garcia',
      role: 'First-time Buyer',
      content: 'As a first-time buyer, I was nervous, but the PropertyHub team made everything clear and stress-free.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
      rating: 5,
    },
  ];

  const faqs = [
    {
      question: 'How do I search for properties?',
      answer: 'You can use our advanced search filters to find properties by location, price range, property type, and more. Simply enter your criteria and browse the results.',
    },
    {
      question: 'Can I save my favorite properties?',
      answer: 'Yes! Create an account to save your favorite properties and get notified about price changes and similar listings.',
    },
    {
      question: 'How do I contact a property agent?',
      answer: 'Each property listing includes the agent\'s contact information. You can call, email, or use our contact form to reach out directly.',
    },
    {
      question: 'Are virtual tours available?',
      answer: 'Many of our properties offer virtual tours and high-quality photo galleries to help you explore properties remotely.',
    },
  ];

  const partners = [
    { name: 'Bank of America', logo: '🏛️' },
    { name: 'Wells Fargo', logo: '🏦' },
    { name: 'Chase', logo: '💳' },
    { name: 'Coldwell Banker', logo: '🏢' },
    { name: 'RE/MAX', logo: '🏠' },
    { name: 'Century 21', logo: '🔑' },
  ];

  useEffect(() => {
    (async () => {
      let data = await getPropertiesAPI();
      setProperties(data?.properties);
    })();
  }, [])
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-teal-800 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Luxury homes"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your <span className="text-teal-300">Dream Home</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover the perfect property with our comprehensive real estate platform.
            From luxury villas to cozy apartments, we have it all.
          </p>
          <button
            onClick={() => onNavigate('properties')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            Explore Properties to Rent or Buy
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Search Properties</h2>
            <p className="text-lg text-gray-600">Find your perfect property with our advanced search</p>
          </div>
          <SearchFilters
            filters={filters}
            onFiltersChange={setFilters}
            compact={true}
            onNavigate={onNavigate}
          />
        </div>
      </section>

      {/* Property Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Property Categories</h2>
            <p className="text-lg text-gray-600">Browse properties by type</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  onNavigate('properties');
                  setTimeout(() => {
                    setCategoryProperties(properties.filter(property => property.type === category.name.toLowerCase().replace(/.$/, '')));
                  }, 200);
                }}
                className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center border-2 border-transparent hover:border-blue-500"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} Properties</p>
                <ChevronRight className="h-5 w-5 mx-auto mt-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Marketing Message */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-teal-300" />
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured</h2>
              <p className="text-lg text-gray-600">Hand-picked premium properties</p>
            </div>
            <button
              onClick={() => onNavigate('properties')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties?.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewProperty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Properties */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular</h2>
              <p className="text-lg text-gray-600">Most viewed properties this week</p>
            </div>
            <button
              onClick={() => onNavigate('properties')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" */}
            {popularProperties?.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewProperty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Newly Added</h2>
              <p className="text-lg text-gray-600">Latest additions to our portfolio</p>
            </div>
            <button
              onClick={() => onNavigate('properties')}
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All <ChevronRight className="h-5 w-5 ml-1" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newProperties?.slice(0, 3).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewProperty}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Recently Sold */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centerm mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Recently Sold</h2>
            <p className="text-lg text-gray-600">See what sold in your area</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {soldProperties?.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={handleViewProperty}
                showStatus={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centerm mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to find your dream property</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Properties</h3>

              <p className="text-gray-600">Use our advanced filters to find properties that match your criteria</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Schedule Viewing</h3>
              <p className="text-gray-600">Contact our expert agents to schedule a property viewing</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Make an Offer</h3>
              <p className="text-gray-600">Work with our team to make a competitive offer and close the deal</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centerm mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from satisfied customers</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centerm mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Get answers to common questions</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-centerm mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Partners</h2>
            <p className="text-lg text-gray-600">Trusted by leading financial institutions</p>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{partner.logo}</div>
                <div className="text-sm text-gray-600">{partner.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;