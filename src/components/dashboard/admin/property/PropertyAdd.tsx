import React, { useState } from 'react';
import Form from "form-data";
import { Forward } from 'lucide-react';
import { toast } from 'sonner';
import { Property } from '../../../../types';
import { createPropertyAPI } from '../../api/admin/property/createPropertyAPI';
import { useAuth } from '../../../../context/AuthContext';
import { statesLGsInObject } from '../../../../data/stateData';

const initialFormData: Property = {
    id: 1,
    title: '',
    price: 0,
    location: '',
    bedrooms: 1,
    bathrooms: 1,
    availability: false,
    area: 0,
    type: 'duplex',
    status: 'for_rent',
    images: [],
    description: '',
    amenities: [],
    agent: {
        name: '',
        email: '',
        phone: '',
        avatar: '',
        experience: 1
    },
    isFeatured: false,
    isSponsored: false,
    createdAt: '',
    updatedAt: '',
    coordinates: {
        lat: 0,
        lng: 0,
    },
    address: '',
    localGovt: '',
    state: '',
    country: ''
};


export default function PropertyAdd({ setOpen }: { setOpen: any }) {
    const [property, setProperty] = useState<Property>(initialFormData);
    const [status, setStatus] = useState<string>();
    const [images, setImages] = useState<any>({
        files: [] as Array<any>,
        avatar: {} as any
    });
    const { user, admin } = useAuth();

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target as any;
        if (name === 'phone' || name === 'email' || name === 'avatar' || name === 'experience' || name === 'name') {
            setProperty(prev => ({
                ...prev,
                agent: {
                    ...prev.agent,
                    [name]: type === 'checkbox' ? checked : value
                },
            }));

        } else if (name === 'lng' || name === 'lat') {
            setProperty(prev => ({
                ...prev,
                coordinates: {
                    ...prev.coordinates,
                    [name]: type === 'checkbox' ? checked : value
                },
            }));
        } else {
            setProperty(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));

        }

    };

    const handleAmenitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setProperty(prev => ({
            ...prev,
            amenities: checked
                ? [...prev.amenities, value]
                : prev.amenities.filter(a => a !== value)
        }));
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("Sending data...");

        console.log('Submittted property data:', property, images);

        const formData = new Form();
        formData.append('title', property.title);
        formData.append('price', property.price);
        formData.append('location', property.location);
        formData.append('bathrooms', property.bathrooms);
        formData.append('bedrooms', property.bedrooms);
        formData.append('area', property.area);
        formData.append('type', property.type);
        formData.append('status', property.status);
        try {
            for (const file of images.files) {
                formData.append("photos", file, file.name)
            }
        } catch (error) {
            console.error(error);
        }
        try {
            formData.append('avatar', images.avatar, images.avatar.name);
        } catch (error) {
            console.error(error);
        }
        formData.append('description', property.description);
        formData.append('amenities', property.amenities);
        formData.append('agent', JSON.stringify(property.agent));
        formData.append("isFeatured", property.isFeatured);
        formData.append("isSponsored", property.isSponsored);
        formData.append("availability", property.availability);
        formData.append("coordinates", JSON.stringify(property.coordinates));
        formData.append("address", property.address);
        formData.append('localGovt', property.localGovt);
        formData.append('state', property.state);
        formData.append('country', property.country);
        if (user?.role === 'provider') {
            formData.append('UserId', user?.userId);
        } else {
            formData.append('UserId', admin?.userId);
            // formData.append("_csrf", _csrf);
        }
        let propertyData = await createPropertyAPI(formData);

        if (propertyData) {
            setStatus("Property created");
            toast("Property created")
            // setProperty(initialFormData);
            setOpen(false)
        } else {
            toast("Property creation failed");
            setStatus("Property creation failed");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center flex justify-between">New Property <button onClick={() => setOpen(false)}><Forward /></button></h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                        name="title"
                        value={property.title}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Property 1, Property 2; Suite 1, Suite 2 etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        name="type"
                        value={property.type}
                        onChange={e => setProperty((prev: any) => ({ ...prev, type: e.target.value }))}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select</option>
                        <option value="apartment">Apartment</option>
                        <option value="self-contained">Self-contained</option>
                        <option value="flat">Flat</option>
                        <option value="house">house</option>
                        <option value="condo">Condominium</option>
                        <option value="villa">Villa</option>
                        <option value="townhouse">Townhouse</option>
                        <option value="duplex">Duplex</option>
                        <option value="bungalow">Bungalow</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                    <input
                        name="price"
                        type='number'
                        value={property.price}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                        name="location"
                        value={property.location}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Naibawa, Kumbotso LG, Kano State etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <select
                        name="availability"
                        value={property.availability ? 'true' : 'false'}
                        onChange={e => setProperty((prev: any) => ({ ...prev, availability: e.target.value === 'true' ? true : false }))}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Available</option>
                        <option value="false">Not Available</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                    <input
                        name="bedrooms"
                        type='number'
                        value={property.bedrooms}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                    <input
                        name="bathrooms"
                        type='number'
                        value={property.bathrooms}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area in metre square</label>
                    <input
                        name="area"
                        type='number'
                        value={property.area}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        name="status"
                        value={property.status}
                        onChange={e => setProperty((prev: any) => ({ ...prev, status: e.target.value }))}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="for_sale">For Sale</option>
                        <option value="for_rent">For Rent</option>
                        <option value="sold">Sold</option>
                        <option value="occupied">Occupied</option>
                        <option value="for_vacation">For vacation</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                    <input
                        name="images"
                        type='file'
                        onChange={(e: any) => {
                            let images = [];
                            try {
                                for (const element of e.target.files) {
                                    images.push(element?.name)
                                }
                            } catch (error) {
                                console.warn(error);
                            }
                            setImages((prev: any) => ({ ...prev, files: [...e.target.files] }))
                            setProperty(prevProp => ({ ...prevProp, images: images }))
                        }}
                        multiple
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        formEncType='multipart/form-data'
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                        name="description"
                        value={property.description}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
                    <div className="flex flex-wrap gap-2 mt-1">
                        {
                            [
                                'WiFi',
                                'AC',
                                'Study Desk',
                                'Wardrobe',
                                'Private Bathroom',
                                'Shared Kitchen',
                                'Laundry',
                                'Study Area',
                                'Kitchen',
                                'Parking',
                                'Security',
                                'Study Hall',
                                'Common Area'
                            ].map(a => (
                                <label key={a} className="inline-flex items-center">
                                    <input
                                        type="checkbox"
                                        value={a}
                                        checked={property.amenities.includes(a)}
                                        onChange={handleAmenitiesChange}
                                        className="form-checkbox text-blue-600"
                                    />
                                    <span className="ml-2 text-xs">{a}</span>
                                </label>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Name</label>
                    <input
                        name="name"
                        value={property.agent.name}
                        onChange={handleChange}
                        required
                        placeholder='e.g.Usman etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent phone</label>
                    <input
                        name="phone"
                        value={property.agent.phone}
                        onChange={handleChange}
                        required
                        placeholder='e.g., 08065899144 etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent email</label>
                    <input
                        name="email"
                        type='email'
                        value={property.agent.email}
                        onChange={handleChange}
                        required
                        placeholder='e.g. al@yahoo.com etc'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Experience</label>
                    <input
                        name="experience"
                        type='number'
                        value={property.agent.experience}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Agent Photo</label>
                    <input
                        name="avatar"
                        type='file'
                        onChange={(e: any) => {
                            setImages((prev: any) => ({ ...prev, avatar: e.target.files[0] }))
                            // setProperty(prevProp => ({ ...prevProp, agent: { ...prevProp.agent, avatar: e.target.files[0].name } }))
                        }}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        formEncType='multipart/form-data'
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
                    <select
                        name="isFeatured"
                        value={property.isFeatured ? "true" : "false"}
                        onChange={e => setProperty((prev: any) => ({ ...prev, isFeatured: e.target.value === 'true' ? true : false }))}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Featured</option>
                        <option value="false">Not Featured</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sponsored</label>
                    <select
                        name="isSponsored"
                        value={property.isSponsored ? "true" : "false"}
                        onChange={e => setProperty((prev: any) => ({ ...prev, isSponsored: e.target.value === 'true' ? true : false }))}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="true">Sponsored</option>
                        <option value="false">Not Sponsored</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coord. Longitude</label>
                    <input
                        name="lng"
                        type='number'
                        value={property.coordinates.lng}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coord. Latitude</label>
                    <input
                        name="lat"
                        type='number'
                        value={property.coordinates.lat}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                    <input
                        name="address"
                        value={property.address}
                        onChange={handleChange}
                        required
                        placeholder='e.g., 463 N-Tsakiya Naibawa'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* <div className="grid grid-cols-2 gap-4"> */}
                <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                        State
                    </label>
                    <select
                        id="state"
                        name="state"
                        required
                        value={property.state}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select State</option>
                        {Object.keys(statesLGsInObject).map((state) => (
                            <option key={state} value={state}>{state}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="localGovt" className="block text-sm font-medium text-gray-700 mb-2">
                        Local Government
                    </label>
                    <select
                        id="localGovt"
                        name="localGovt"
                        required
                        value={property.localGovt}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Select</option>
                        {(statesLGsInObject[property.state])?.map((LG: any) => (
                            <option key={LG} value={LG}>{LG}</option>
                        ))}
                    </select>
                </div>
                {/* </div> */}

                {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Local Govt</label>
                    <input
                        name="localGovt"
                        value={property.localGovt}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Kumbotso LG'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                        name="state"
                        value={property.state}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Kano'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                        name="country"
                        value={property.country}
                        onChange={handleChange}
                        required
                        placeholder='e.g., Nigeria'
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex items-end">
                    {status ? <div className='text-green-500'>{status}</div> : <div className='text-red-500'>{status}</div>}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded shadow hover:bg-blue-700 transition"
                    >
                        Add Property
                    </button>
                </div>

            </div>
        </form>
    );
}