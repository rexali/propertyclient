import { Property } from '../types';

export const properties: Property[] = [
    {
        id: 101,
        title: 'Ocean View Villa',
        price: 1250000,
        location: 'Pacific Heights, San Francisco',
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        type: 'villa',
        status: 'for_sale',
        images: [
            'https://images.unsplash.com/photo-1600585154490-0c5c9f7b1b6e?w=1200&q=80&auto=format&fit=crop'
        ],
        description: 'Spacious ocean view villa with modern finishes and large terraces.',
        amenities: ['Pool', 'Garage', 'Garden', 'Solar Panels'],
        agent: { name: 'Alex Morgan', email: 'alex@luminousestates.com', phone: '+1 (555) 987-6543', avatar: '', experience: 6 },
        isFeatured: true,
        isSponsored: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coordinates: { lat: 37.83, lng: -122.48 },
        UserId: 42,
        address: '1 Seaside Ave',
        localGovt: 'Central',
        state: 'California',
        country: 'USA',
    },

    {
        id: 102,
        title: 'City Center Apartment',
        price: 420000,
        location: 'Downtown, San Francisco',
        bedrooms: 2,
        bathrooms: 2,
        area: 950,
        type: 'apartment',
        status: 'for_rent',
        images: [
            'https://images.unsplash.com/photo-1560184897-6c5a2b0d9a9c?w=1200&q=80&auto=format&fit=crop'
        ],
        description: 'Modern apartment in the heart of the city, close to transit and shopping.',
        amenities: ['Elevator', 'Concierge', 'Gym'],
        agent: { name: 'Alex Morgan', email: 'alex@luminousestates.com', phone: '+1 (555) 987-6543', avatar: '', experience: 6 },
        isFeatured: false,
        isSponsored: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coordinates: { lat: 37.79, lng: -122.40 },
        UserId: 42,
        address: '200 Market St',
        localGovt: 'Central',
        state: 'California',
        country: 'USA',
    },

    {
        id: 103,
        title: 'Seaside Studio',
        price: 120,
        location: 'Beachfront, Santa Cruz',
        bedrooms: 1,
        bathrooms: 1,
        area: 420,
        type: 'apartment',
        status: 'for_vacation',
        images: [],
        description: 'Cozy studio near the beach.',
        amenities: ['Wifi', 'AC'],
        agent: { name: 'Host', email: 'host@seaside.com', phone: '+1 (555) 222-3333', avatar: '', experience: 2 },
        isFeatured: false,
        isSponsored: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coordinates: { lat: 36.97, lng: -122.02 },
        UserId: 43,
        address: '12 Ocean Drive',
        localGovt: 'Santa Cruz',
        state: 'California',
        country: 'USA',
    },
];



export function getProperties() {
    return properties;
}

export function getPropertyById(id: any) {
    return properties.find(property => property.id === Number(id))
}