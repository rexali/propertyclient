
export interface ResponseType {
  status: string;
  data: any
  message: string
}

export interface Property {
  id?: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'apartment' | 'house' | 'condo' | 'villa' | 'townhouse' | 'flat' | 'self-contained' | 'duplex' | 'bungalow';
  status: 'for_sale' | 'sold' | 'occupied' | 'for_rent' | 'for_vacation';
  images: string[];
  description: string;
  amenities: string[];
  agent: Agent;
  isFeatured: boolean;
  isSponsored: boolean;
  createdAt: string;
  updatedAt: string;
  coordinates: {
    lat: number;
    lng: number;
  },
  User?:any
  UserId?:number;
  address: string,
  localGovt: string,
  state: string,
  country: string,
  sku?:string;
  Reviews?:any,
  rating?:any,
  availability?:boolean
}

export interface Agent {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  experience: number;
}

export interface User {
  userId?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address?: string;
  state?: string;
  country?: string;
  avatar?: string;
  role: 'user' | 'provider';
  favorites?: string[];
  createdAt?: string;
}

export interface Admin {
  userId: string;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  state?: string;
  country?: string;
  avatar?: string;
  profile?:any,
  role: 'admin' | 'super-admin';
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  subject: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  isRead: boolean;
  createdAt: string;
}

export interface FilterOptions {
  location: string;
  state?: string;
  localGovt?: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  sortBy: 'price-low' | 'price-high' | 'newest' | 'oldest';
}