import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Property, FilterOptions } from '../types';

interface PropertyState {
  properties: Property[];
  catgoryProperties: Property[];
  filteredProperties: Property[];
  favorites: string[];
  selectedProperty: Property | null;
  filters: FilterOptions;
  loading: boolean;
  property: Property;
}

type PropertyAction =
  { type: 'SET_PROPERTIES'; payload: Property[] }
  | { type: 'SET_CATEGORY_PROPERTIES'; payload: Property[] }
  | { type: 'SET_PROPERTY'; payload: Property }
  | { type: 'SET_FILTERED_PROPERTIES'; payload: Property[] }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'SET_SELECTED_PROPERTY'; payload: Property | null }
  | { type: 'SET_FILTERS'; payload: Partial<FilterOptions> }
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean };

const initialState: PropertyState = {
  catgoryProperties: [],
  properties: [],
  filteredProperties: [],
  favorites: [],
  selectedProperty: null,

  filters: {
    location: '',
    minPrice: 0,
    maxPrice: 10000000,
    bedrooms: 0,
    bathrooms: 0,
    propertyType: '',
    sortBy: 'newest',
  },

  loading: false,

  property: {
    id: 0,
    title: '',
    price: 0,
    location: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: 'apartment',
    status: 'for_sale',
    images: [],
    description: '',
    amenities: [],
    agent: {
      name: '',
      email: '',
      phone: '',
      avatar: '',
      experience: 0
    },
    isFeatured: false,
    isSponsored: false,
    createdAt: '',
    updatedAt: '',
    coordinates: {
      lat: 0,
      lng: 0
    },
    address: '',
    localGovt: '',
    state: '',
    country: ''
  }
};

const propertyReducer = (state: PropertyState, action: PropertyAction): PropertyState => {
  switch (action.type) {
    case 'SET_PROPERTIES':
      return { ...state, properties: action.payload };
    case 'SET_CATEGORY_PROPERTIES':
      return { ...state, filteredProperties: action.payload };
    case 'SET_PROPERTY':
      return { ...state, property: action.payload };
    case 'SET_FILTERED_PROPERTIES':
      return { ...state, filteredProperties: action.payload };
    case 'ADD_FAVORITE':
      return { ...state, favorites: [...state.favorites, action.payload] };
    case 'REMOVE_FAVORITE':
      return { ...state, favorites: state.favorites.filter(id => id !== action.payload) };
    case 'SET_SELECTED_PROPERTY':
      return { ...state, selectedProperty: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'ADD_PROPERTY':
      return { ...state, properties: [...state.properties, action.payload] };
    case 'UPDATE_PROPERTY':
      return {
        ...state,
        properties: state.properties.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PROPERTY':
      return {
        ...state,
        properties: state.properties.filter(p => p.id !== action.payload as unknown as number),
      };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

interface PropertyContextType extends PropertyState {
  addFavorite: (propertyId: string) => void;
  removeFavorite: (propertyId: string) => void;
  setSelectedProperty: (property: Property | null) => void;
  setFilters: (filters: Partial<FilterOptions>) => void;
  addProperty: (property: Property) => void;
  setProperties: (property: Property[]) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (propertyId: string) => void;
  filterProperties: () => void;
  setLoading: (loading: boolean) => void;
  setProperty: (property: Property) => void;
  setCategoryProperties: (properties: Property[]) => void;
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);


export const PropertyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [state, dispatch] = useReducer(propertyReducer, initialState);

  const addFavorite = (propertyId: string) => {
    dispatch({ type: 'ADD_FAVORITE', payload: propertyId });
  };

  const setProperties = (properties: Property[]) => {
    dispatch({ type: 'SET_PROPERTIES', payload: properties });
  };

  const setCategoryProperties = (properties: Property[]) => {
    dispatch({ type: 'SET_CATEGORY_PROPERTIES', payload: properties });
  };

  const setProperty = (property: Property) => {
    dispatch({ type: 'SET_PROPERTY', payload: property });
  };

  const removeFavorite = (propertyId: string) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: propertyId });
  };

  const setSelectedProperty = (property: Property | null) => {
    dispatch({ type: 'SET_SELECTED_PROPERTY', payload: property });
  };

  const setFilters = (filters: Partial<FilterOptions>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    filterProperties();
  };

  const addProperty = (property: Property) => {
    dispatch({ type: 'ADD_PROPERTY', payload: property });
  };

  const updateProperty = (property: Property) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: property });
  };

  const deleteProperty = (propertyId: string) => {
    dispatch({ type: 'DELETE_PROPERTY', payload: propertyId });
  };

  const filterProperties = () => {
    let filtered = [...state?.properties];

    if (state.filters.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(state.filters.location.toLowerCase())
      );
    }

    if (state.filters.propertyType) {
      filtered = filtered.filter(p => p.type === state.filters.propertyType);
    }

    filtered = filtered.filter(
      p =>
        p.price >= state.filters.minPrice &&
        p.price <= state.filters.maxPrice &&
        p.bedrooms >= state.filters.bedrooms &&
        p.bathrooms >= state.filters.bathrooms
    );

    // Sort
    switch (state.filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
    }

    dispatch({ type: 'SET_FILTERED_PROPERTIES', payload: filtered });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  return (
    <PropertyContext.Provider
      value={{
        ...state,
        addFavorite,
        removeFavorite,
        setSelectedProperty,
        setFilters,
        addProperty,
        updateProperty,
        deleteProperty,
        filterProperties,
        setLoading,
        setProperties,
        setProperty,
        setCategoryProperties
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (context === undefined) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};