import React from 'react';
import { 
  Search, Home, Calculator, FileText, Users, Shield, 
  TrendingUp, Award, CheckCircle, Star 
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: string) => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const services = [
    {
      id: 1,
      title: 'Property Buying',
      description: 'Find your dream property with our comprehensive buying services. We guide you through every step of the purchasing process.',
      icon: Home,
      features: ['Property Search', 'Market Analysis', 'Negotiation Support', 'Documentation Assistance'],
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
    {
      id: 2,
      title: 'Property Selling',
      description: 'Maximize your property value with our expert selling services. Professional marketing and proven strategies.',
      icon: TrendingUp,
      features: ['Property Valuation', 'Professional Photography', 'Marketing Strategy', 'Buyer Screening'],
      image: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
    {
      id: 3,
      title: 'Property Investment',
      description: 'Build your real estate portfolio with our investment advisory services. Expert guidance for maximum returns.',
      icon: Calculator,
      features: ['Investment Analysis', 'Portfolio Management', 'Market Research', 'ROI Calculations'],
      image: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
    {
      id: 4,
      title: 'Property Management',
      description: 'Comprehensive property management services for landlords and property owners. Hassle-free rental management.',
      icon: Shield,
      features: ['Tenant Screening', 'Rent Collection', 'Maintenance Coordination', 'Financial Reporting'],
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
    {
      id: 5,
      title: 'Legal Documentation',
      description: 'Complete legal support for all property transactions. Ensure your deals are legally sound and protected.',
      icon: FileText,
      features: ['Contract Preparation', 'Legal Review', 'Title Verification', 'Registration Support'],
      image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
    {
      id: 6,
      title: 'Consultation Services',
      description: 'Expert real estate consultation to help you make informed decisions. Professional advice tailored to your needs.',
      icon: Users,
      features: ['Market Analysis', 'Investment Planning', 'Risk Assessment', 'Strategic Planning'],
      image: 'https://images.pexels.com/photos/2089698/pexels-photo-2089698.jpeg?auto=compress&cs=tinysrgb&w=600&h=400',
    },
  ];

  const whyChooseUs = [
    {
      title: 'Expert Team',
      description: 'Our team of experienced professionals brings years of real estate expertise to every transaction.',
      icon: Award,
    },
    {
      title: 'Proven Track Record',
      description: 'Over 2,000 successful property transactions and counting, with a 98% client satisfaction rate.',
      icon: TrendingUp,
    },
    {
      title: 'Comprehensive Support',
      description: 'End-to-end support from initial consultation to final handover, we are with you every step.',
      icon: Shield,
    },
    {
      title: '24/7 Availability',
      description: 'Round-the-clock support to address your queries and provide assistance whenever you need it.',
      icon: Users,
    },
  ];

  const testimonials = [
    {
      name: 'David Thompson',
      role: 'Property Investor',
      content: 'PropertyHub helped me build a successful real estate portfolio. Their investment advice has been invaluable.',
      rating: 5,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    },
    {
      name: 'Lisa Chen',
      role: 'Home Buyer',
      content: 'The buying process was smooth and stress-free. They found us the perfect home within our budget.',
      rating: 5,
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    },
    {
      name: 'Robert Martinez',
      role: 'Property Owner',
      content: 'Their property management service has been exceptional. My rental properties are in great hands.',
      rating: 5,
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    },
  ];

  const stats = [
    { label: 'Properties Sold', value: '2,847+' },
    { label: 'Happy Clients', value: '1,963+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Expert Agents', value: '124+' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-teal-800 text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800"
            alt="Real estate services"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="text-teal-300">Services</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Comprehensive real estate solutions tailored to your needs. From buying and selling 
            to investment and management, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our comprehensive range of services ensures that all your real estate needs are met 
              with professionalism and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <Icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose PropertyHub?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We combine industry expertise with personalized service to deliver exceptional results 
              for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl opacity-90">Numbers that speak for our success</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-600">What our satisfied clients say about our services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
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

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today to discuss your real estate needs and see how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => onNavigate('contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('properties')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;