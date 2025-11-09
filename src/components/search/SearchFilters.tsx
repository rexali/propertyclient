import React, { useState } from 'react';
import { Search, SlidersHorizontal, MapPin, DollarSign, Bed, Bath, Home } from 'lucide-react';
import { FilterOptions } from '../../types';

interface SearchFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: Partial<FilterOptions>) => void;
  compact?: boolean;
  onNavigate: (page: string, pageData?: any) => void
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ filters, onFiltersChange, compact = false, onNavigate }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'villa', label: 'Villa' },
    { value: 'townhouse', label: 'Townhouse' },
  ];

  const bedroomOptions = [
    { value: 0, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
    { value: 5, label: '5+' },
  ];

  const bathroomOptions = [
    { value: 0, label: 'Any' },
    { value: 1, label: '1+' },
    { value: 2, label: '2+' },
    { value: 3, label: '3+' },
    { value: 4, label: '4+' },
  ];

  const priceRanges = [
    { min: 0, max: 10000000, label: 'Any Price' },
    { min: 0, max: 300000, label: 'Under $300k' },
    { min: 300000, max: 500000, label: '$300k - $500k' },
    { min: 500000, max: 750000, label: '$500k - $750k' },
    { min: 750000, max: 1000000, label: '$750k - $1M' },
    { min: 1000000, max: 10000000, label: 'Over $1M' },
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
  ];

  if (compact) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Location Search */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search location..."
              value={filters.location}
              onChange={(e) => onFiltersChange({ location: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Property Type */}
          <select
            value={filters.propertyType}
            onChange={(e) => onFiltersChange({ propertyType: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {propertyTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>

          {/* Search Button */}
          <button
            onClick={() => onNavigate('properties')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">

            <Search className="h-4 w-4 mr-2" />
            Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Main Search */}
      {/* Location */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
        <MapPin className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Enter location..."
          value={filters.location}
          onChange={(e) => onFiltersChange({ location: e.target.value })}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {/* Location */}
        {/* <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <MapPin className="absolute left-3 top-9 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter location..."
            value={filters.location}
            onChange={(e) => onFiltersChange({ location: e.target.value })}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div> */}

        {/* Property Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={filters.propertyType}
              onChange={(e) => onFiltersChange({ propertyType: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
          <div className="relative">
            <Bed className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={filters.bedrooms}
              onChange={(e) => onFiltersChange({ bedrooms: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {bedroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
          <div className="relative">
            <Bath className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <select
              value={filters.bathrooms}
              onChange={(e) => onFiltersChange({ bathrooms: parseInt(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {bathroomOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          {/* Advanced Filters */}
        </button>

        {/* Sort */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onFiltersChange({ sortBy: e.target.value as FilterOptions['sortBy'] })}
            className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <select
                  onChange={(e) => {
                    const range = priceRanges.find(r => `${r.min}-${r.max}` === e.target.value);
                    if (range) {
                      onFiltersChange({ minPrice: range.min, maxPrice: range.max });
                    }
                  }}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
                >
                  {priceRanges.map((range) => (
                    <option key={`${range.min}-${range.max}`} value={`${range.min}-${range.max}`}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Price Range */}
            <div className="space-y-4 ">
              <label className="block text-sm font-medium text-gray-700">Custom Price Range</label>
              <div className="flex flex-col space-y-4">
                <input
                  type="number"
                  placeholder="Min price"
                  value={filters.minPrice || ''}
                  onChange={(e) => onFiltersChange({ minPrice: parseInt(e.target.value) || 0 })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input
                  type="number"
                  placeholder="Max price"
                  value={filters.maxPrice || ''}
                  onChange={(e) => onFiltersChange({ maxPrice: parseInt(e.target.value) || 10000000 })}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => {
            onFiltersChange({
              location: '',
              minPrice: 0,
              maxPrice: 10000000,
              bedrooms: 0,
              bathrooms: 0,
              propertyType: '',
              sortBy: 'newest',
            });
          }}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
        >
          Clear All
        </button>
        <button className="px-8 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center">
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;