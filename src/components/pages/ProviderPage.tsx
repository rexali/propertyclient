import React, { useState } from 'react';
import PropertyCard from '../common/PropertyCard';
import { Property, Agent } from '../../types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getUserPropertiesAPI } from '../dashboard/api/admin/property/getUserPropertiesAPI';
import { useProperty } from '../../context/PropertyContext';
import { SimplePagination } from '../common/SimplePagination';
import { BASE_URL_LOCAL } from '../../constants/constants';

const ProviderPage: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();
    const providerId = params.id;
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    let { properties: propertys, setProperties } = useProperty();


    React.useEffect(() => {
        (async () => {
            let data = await getUserPropertiesAPI(providerId, currentPage);
            console.log(Math.floor(Number(data?.propertyCount??1)/9));
            
            setTotalPages(Math.floor(Number(data?.propertyCount??1)/10));
            setProperties(data?.properties || []);
        })();
    }, [providerId])


    // Mock provider data
    const provider = {
        id: 1,
        name: 'Luminous Estates',
        dateOfBirth: new Date('1985-06-15'),
        logo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&auto=format&fit=crop',
        certificates: 'Agency License #A-998877, Certified Realtor',
        phone: '+1 (555) 123-4567',
        address: '12 Market Street, Downtown',
        localGovt: 'Central',
        state: 'California',
        country: 'USA',
        UserId: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
        bio: 'Luminous Estates is a boutique property agency focused on premium residential and vacation homes. We match buyers with their dream properties and support owners to get the best returns.'
    } as const;

    // Mock agent used inside properties
    const mockAgent: Agent = {
        name: 'Alex Morgan',
        email: 'alex@luminousestates.com',
        phone: '+1 (555) 987-6543',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80&auto=format&fit=crop',
        experience: 6,
    };

    // Mock properties
    const properties: Property[] = [
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
            agent: mockAgent,
            isSponsored: true,
            isFeatured: true,
            UserId: provider.UserId,
            address: '1 Seaside Ave',
            localGovt: provider.localGovt,
            state: provider.state,
            country: provider.country,
            coordinates: { lat: 37.83, lng: -122.48 },
            sku: 'LV-101',
            availability: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
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
            agent: mockAgent,
            isSponsored: false,
            isFeatured: false,
            UserId: provider.UserId,
            address: '200 Market St',
            localGovt: provider.localGovt,
            state: provider.state,
            country: provider.country,
            coordinates: { lat: 37.79, lng: -122.40 },
            sku: 'AP-102',
            availability: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
    ];

    const handleViewDetails = (id: number) => {
        // navigate to property details page
        navigate(`/properties/${id}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4 flex items-center justify-center">
                    {
                        propertys[0] !== undefined ?
                            (<img 
                                src={BASE_URL_LOCAL + '/uploads/' + propertys[0]?.User?.Profile?.image} 
                                alt={propertys[0]?.User?.Profile?.name} 
                                className="w-40 h-40 object-cover rounded-lg" 
                                crossOrigin=''
                                />)

                            :
                            (<img 
                                src={provider.logo} 
                                alt={provider.name} 
                                className="w-40 h-40 object-cover rounded-lg"
                                crossOrigin='' 
                                />)
                    }
                </div>

                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">{propertys[0] !== undefined ? propertys[0]?.User?.Profile?.name : provider.name}</h1>
                            <p className="text-sm text-gray-600 mt-1">{propertys[0] !== undefined ? propertys[0]?.User?.Profile?.certificates : provider.certificates}</p>
                            <p className="mt-3 text-gray-700">{propertys[0] !== undefined ? propertys[0]?.User?.Profile?.bio??provider.bio : provider.bio}</p>
                        </div>

                        <div className="text-right">
                            <a href={`tel:${propertys[0] !== undefined ? propertys[0]?.User?.Profile?.phone : provider.phone}`} className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Call Provider</a>
                            <div className="mt-3 text-sm text-gray-500">
                                <p>{propertys[0] !== undefined ? propertys[0]?.User?.Profile?.address : provider.address}</p>
                                <p>
                                    {propertys[0] !== undefined ? propertys[0]?.User?.Profile?.localGovt : provider.localGovt}, 
                                    {propertys[0] !== undefined ? propertys[0]?.User?.Profile?.state : provider.state}
                                </p>
                                <p>{propertys[0] !== undefined ? propertys[0]?.User?.Profile?.country : provider.country}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Properties by {propertys[0] !== undefined ? propertys[0]?.User?.Profile?.name : provider.name}</h2>
                    <div className="text-sm text-gray-600">{propertys.length || properties.length} properties</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        propertys.length ? propertys.map(property => (
                            <PropertyCard key={property.id} property={property} onViewDetails={() => handleViewDetails(property.id)} />
                        ))
                            : properties.map(property => (
                                <PropertyCard key={property.id} property={property} onViewDetails={() => handleViewDetails(property.id)} />
                            ))
                    }
                </div>

                {propertys.length === 0 || properties.length === 0 && (
                    <div className="mt-6 text-center text-gray-600">This provider has no listed properties yet.</div>
                )}
                <SimplePagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
            </div>

            <div className="mt-8 text-center">
                <Link to="/home" className="text-blue-600 hover:underline">Back to Home</Link>
            </div>
        </div>
    );
};

export default ProviderPage;
