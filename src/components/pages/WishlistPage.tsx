import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Property } from '../../types';
import { handlePriceFormat } from '../../utils/handlePriceFormat';
import { getUserSavedPropertiesAPI } from '../dashboard/api/user/getUserSavedPropertiesAPI';
import { useAuth } from '../../context/AuthContext';
import { SimplePagination } from '../common/SimplePagination';
import { BASE_URL_LOCAL } from '../../constants/constants';
import { removeSavedPropertyAPI } from './api/removeSavedProperty';
import { toast } from 'sonner';
import { fetchDataAPI } from '../../api/fetchDataAPI';
import { isExistingAPI } from './api/isExistingAPI';

interface WishlistItem extends Property {
    favouriteId?: number
}

const WishlistPage: React.FC = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState<WishlistItem[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const { user, isAuthenticated } = useAuth();
    const [refreshPage, setRefreshPage] = useState<number>(1);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            // fallback mock
            if (isAuthenticated) {
                let data = await getUserSavedPropertiesAPI(user?.userId as unknown as number, currentPage);
                let items = data?.favourites.map((fav: any) => ({ favouriteId: fav.id, ...fav.Property }));
                setTotalPages(Math.ceil(Number(data?.favouriteCount) / itemsPerPage))
                setItems(items)
            }
        })();

    }, [refreshPage, currentPage]);


    const removeFromWishlist = async (id: number) => {
        if (!isAuthenticated) {
            toast("Please login to save favorite properties");
            return;
        }

        let res = await removeSavedPropertyAPI({ propertyId: id, userId: user?.userId as unknown as number })

        if (res) {
            setRefreshPage(prev => prev + 1);
            toast("Property removed!");
            // setMessage('Removed from wishlist');
            // setTimeout(() => setMessage(null), 2000);

        }
    }


    async function addPropertyToCartAPI(propertyId: number, userId: string | undefined, favouriteId?: number) {
        if (!isAuthenticated) {
            toast('Please login first!');
            return;
        }

        let { success } = await isExistingAPI(userId, propertyId, 'carts');

        if (!success) {
            let result = await fetchDataAPI(
                BASE_URL_LOCAL + '/api/v1/carts',
                {
                    method: "POST",
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ PropertyId: propertyId, UserId: userId })
                });

            if (result.cart) {
                await removeFromWishlist(favouriteId as number);
                toast('Success! Property added');
                return;
            }

            toast('Fail! No Property added');
        } else {
            await removeFromWishlist(favouriteId as number);
            setRefreshPage(prev => prev + 1)
            toast('Property already added');
        }

    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>

            {message && <div className="mb-4 text-sm text-green-700">{message}</div>}

            {items.length === 0 ? (
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="mb-4">Your wishlist is empty.</p>
                    {!isAuthenticated && <p className="mb-4">Please login</p>}

                    <Link to="/properties" className="text-blue-600 hover:underline">Browse properties</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map(item => (
                        <div key={item.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                            <div className="h-40 bg-gray-100 rounded overflow-hidden mb-3 flex items-center justify-center">
                                {item.images && item.images[0] ? (
                                    <img
                                        crossOrigin=''
                                        src={BASE_URL_LOCAL + '/uploads/' + item.images[0]}
                                        alt={item.title}
                                        className="object-cover w-full h-full" />
                                ) : (
                                    <div className="text-gray-500">No Image</div>
                                )}
                            </div>

                            <h3 className="text-lg font-semibold">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.location}</p>
                            <div className="mt-2 flex items-center justify-between">
                                <div className="text-lg font-bold">{handlePriceFormat(item.price)}</div>
                                <div className="text-sm text-gray-500">{item.bedrooms}bd • {item.bathrooms}ba</div>
                            </div>

                            <div className="mt-4 flex space-x-2">
                                <button onClick={async () => await addPropertyToCartAPI(item.id, user?.userId, item?.favouriteId)} className="flex-1 px-3 py-2 bg-blue-600 text-white rounded">Add to cart</button>
                                <button onClick={async () => await removeFromWishlist(item?.favouriteId as number)} className="px-3 py-2 border rounded">Remove</button>
                            </div>

                            <div className="mt-3 text-right">
                                <button onClick={() => navigate(`/properties/${item.id}`)} className="text-sm text-blue-600 hover:underline">View details</button>
                            </div>
                        </div>
                    ))}
                    <SimplePagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
                </div>
            )}
        </div>
    );
};

export default WishlistPage;
