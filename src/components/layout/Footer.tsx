import React from 'react';
import { Home, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  
  const quickLinks = [
    { name: 'Home', href: 'home' },
    { name: 'Properties', href: 'properties' },
    { name: 'Services', href: 'services' },
    { name: 'About Us', href: 'about' },
    { name: 'Contact', href: 'contact' },
  ];

  const propertyTypes = [
    { name: 'Apartments', href: 'properties' },
    { name: 'Houses', href: 'properties' },
    { name: 'Condos', href: 'properties' },
    { name: 'Villas', href: 'properties' },
    { name: 'Townhouses', href: 'properties' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-2xl font-bold text-white">PropertyHub</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Your trusted partner in finding the perfect property. We offer comprehensive real estate solutions
              with a focus on quality service and customer satisfaction.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Real Estate Ave, Property City, PC 12345</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@propertyhub.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              {propertyTypes.map((type) => (
                <li key={type.name}>
                  <button
                    onClick={() => onNavigate(type.href)}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {type.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-4 mb-4 md:mb-0">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 bg-gray-800 rounded-full hover:bg-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
          <div className="text-center md:text-right text-gray-400 text-sm">
            <p>&copy; 2024 PropertyHub. All rights reserved.</p>
            <p className="mt-1">
              <span className="hover:text-white cursor-pointer transition-colors duration-200">Privacy Policy</span>
              {' | '}
              <span className="hover:text-white cursor-pointer transition-colors duration-200">Terms of Service</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;