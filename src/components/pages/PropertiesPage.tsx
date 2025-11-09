import React, { useState } from 'react';
import { Grid3X3, List, MapPin, Filter } from 'lucide-react';
import PropertyCard from '../common/PropertyCard';
import SearchFilters from '../search/SearchFilters';
import { useProperty } from '../../context/PropertyContext';
import { Property } from '../../types';
import { BASE_URL_LOCAL } from '../../constants/constants';

interface PropertiesPageProps {
  onNavigate: (page: string, data?: any) => void;
}

const PropertiesPage: React.FC<PropertiesPageProps> = ({onNavigate }) => {
  const {filteredProperties, filters, setFilters, filterProperties } = useProperty();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Apply filters when component mounts or filters change
  React.useEffect(() => {
    filterProperties();
  }, [filters]);

  const handleViewProperty = (property: Property) => {
    onNavigate('property-details', property);
  };

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProperties = filteredProperties.slice(startIndex, startIndex + itemsPerPage);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center items-center space-x-2 mt-8">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-2 text-sm font-medium border rounded-md ${
                currentPage === page
                  ? 'text-white bg-blue-600 border-blue-600'
                  : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          );
        })}
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Properties for Sale</h1>
          <p className="text-lg text-gray-600">
            {filteredProperties.length} properties found
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 bg-white rounded-lg shadow-md border border-gray-300"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-8">
              <SearchFilters
                filters={filters}
                onFiltersChange={setFilters} 
                onNavigate={onNavigate}            
                />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* View Mode Toggle and Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredProperties.length)} of {filteredProperties.length} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* No Results */}
            {currentProperties.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No properties found</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              </div>
            )}

            {/* Properties Grid View */}
            {viewMode === 'grid' && currentProperties.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {currentProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewProperty}
                  />
                ))}
              </div>
            )}

            {/* Properties List View */}
            {viewMode === 'list' && currentProperties.length > 0 && (
              <div className="space-y-6">
                {currentProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-80 h-48 sm:h-auto relative">
                        <img
                          // src={property.images[0]}
                          src={property.images[0] ? BASE_URL_LOCAL + "/uploads/" + property.images[0] : property.images[0]}
                          alt={property.title}
                          style={{height:210}}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          crossOrigin=''
                        />
                        {property.isFeatured && (
                          <div className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                          <span className="text-2xl font-bold text-blue-600">
                            {new Intl.NumberFormat('en-NG', {
                              style: 'currency',
                              currency: 'NGN',
                              maximumFractionDigits: 0,
                            }).format(property.price)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-3">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-gray-600 mb-4">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                          <span>{property.area} sqft</span>
                        </div>
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {property.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <img
                              src={property.agent.avatar}
                              alt={property.agent.name}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-600">{property.agent.name}</span>
                          </div>
                          <button
                            onClick={() => handleViewProperty(property)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;