import React, { useCallback, useState } from 'react';
import { Grid3X3, List, MapPin, Filter } from 'lucide-react';
import PropertyCard from '../common/PropertyCard';
import SearchFilters from '../search/SearchFilters';
import { useProperty } from '../../context/PropertyContext';
import { BASE_URL_LOCAL } from '../../constants/constants';
import {
  useNavigate,
  useSearchParams
} from 'react-router-dom';
import { SimplePagination } from '../common/SimplePagination';
import { searchPropertiesAPI } from './api/searchPropertiesAPI';

const PropertiesPage: React.FC = () => {
  const {
    filters,
    setFilters,
    filterProperties,
    // setProperties 
  } = useProperty();
  const [propertys, setPropertys] = useState<any>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProperties, setTotalProperties] = useState(1);
  const [searchParams, _] = useSearchParams();
  const propertyType = searchParams.get('state') || searchParams.get('location') || '';
  const navigate = useNavigate();
  const sponsoredListing = propertys.filter((property: any) => property.isFeatured === true || property.isSponsored === true);

  // const [searchParams, _] = useSearchParams();
  // get search params
  // const _searchParams = {
  //   location: searchParams.get('location') || '',
  // state: searchParams.get('state') || '',
  // localGovt: searchParams.get('localGovt') || '',
  //   minPrice: searchParams.get('minPrice') || 0,
  //   maxPrice: searchParams.get('maxprice') || 1000000,
  //   bedrooms: searchParams.get('bedrooms') || 0,
  //   bathrooms: searchParams.get('bathrooms') || 0,
  //   propertyType: searchParams.get('propertyType') || '',
  //   sortBy: searchParams.get('newest') || 'newest',
  // };

  const itemsPerPage = 4;
  const totalPages = Math.ceil(totalProperties / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const getFilteredData = useCallback(async (filters: any, currentPage: number) => {
    let result = await searchPropertiesAPI({ ...filters, page: currentPage })
    setPropertys(result?.properties || []);
    setTotalProperties(result?.propertyCount || 1)
  }, [currentPage])

  React.useEffect(() => {
    filterProperties();
    getFilteredData(filters, currentPage);
  }, [currentPage]);

  const handleViewProperty = (value: any) => {
    navigate('/properties/' + value, { state: value });
  };


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Search{': ' + propertyType.substring(0, 1).toUpperCase() + propertyType.replace(/^./, '').toLowerCase()}</h1>
          <p className="text-lg text-gray-600">
            {totalProperties} properties found
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
                onNavigate={navigate}
                getFilteredData={getFilteredData}
              />
            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* View Mode Toggle and Results Info */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, totalProperties)} of {totalProperties} results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* No Results */}
            {propertys?.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-500 mb-4">
                  <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No properties found</h3>
                  <p>Try adjusting your search criteria</p>
                </div>
              </div>
            )}

            {/* Sponsored Properties Grid View */}
            {viewMode === 'grid' && totalProperties > 0 && (
              <div>
                <h5 className="text-xs text-gray-900 mb-2">Sponsored</h5>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {sponsoredListing?.map((property: any) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onViewDetails={handleViewProperty}
                    />
                  ))}
                </div><br /><br />
              </div>
            )}

            <h5 className="text-1xl text-gray-900 mb-2">Properties</h5>

            {/* Properties Grid View */}
            {viewMode === 'grid' && totalProperties > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {propertys?.map((property: any) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    onViewDetails={handleViewProperty}
                  />
                ))}
              </div>
            )}

            {/* Properties List View */}
            {viewMode === 'list' && totalProperties > 0 && (
              <div className="space-y-6">
                {propertys?.map((property: any) => (
                  <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                      <div className="sm:w-80 h-48 sm:h-auto relative">
                        <img
                          src={property.images[0] ? BASE_URL_LOCAL + "/uploads/" + property.images[0] : property.images[0]}
                          alt={property.title}
                          style={{ height: 210 }}
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
                            onClick={() => handleViewProperty(property.id)}
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
            <SimplePagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;