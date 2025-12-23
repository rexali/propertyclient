export interface MockUser {
    userId: number | string;
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
    state?: string;
    country?: string;
    avatar?: string;
    role: 'user' | 'provider';
    favorites?: string[];
    createdAt?: string;
    updatedAt?: string;
}

export const users: MockUser[] = [
    {
        userId: 201,
        fullName: 'Jordan Wells',
        email: 'jordan.wells@example.com',
        phone: '+1 (555) 444-0101',
        address: '45 Maple Street',
        state: 'California',
        country: 'USA',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
        role: 'user',
        favorites: ['101', '103'],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        userId: 42,
        fullName: 'Luminous Estates',
        email: 'contact@luminousestates.com',
        phone: '+1 (555) 123-4567',
        address: '12 Market Street',
        state: 'California',
        country: 'USA',
        avatar: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=80&auto=format&fit=crop',
        role: 'provider',
        favorites: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];
