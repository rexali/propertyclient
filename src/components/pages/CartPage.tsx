import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../../types';
import { handlePriceFormat } from '../../utils/handlePriceFormat';
import { useAuth } from '../../context/AuthContext';
import { makePaymentWithPopupAPI } from './payment/makePaymentWithPopupAPI';
import { getUserCartsAPI } from './api/getUserCartsAPI';
import { SimplePagination } from '../common/SimplePagination';
import { removeFromCartAPI } from './api/removeFromCartAPI';
import { toast } from 'sonner';
// import { toast } from 'sonner';

interface CartItem extends Property {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    cartId?: number
}

const CartPage: React.FC = () => {
    const { user, admin, isAuthenticated } = useAuth();
    const [items, setItems] = useState<CartItem[]>([]);
    const [loadingIds, setLoadingIds] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [refreshPage, setRefreshPage] = useState<number>(1);
    const [loadingPage, setLoadingPage] = useState<Boolean>(false);
    const itemsPerPage = 10;

    useEffect(() => {
        (async () => {
            if (isAuthenticated) {
                try {
                    setLoadingPage(true);
                    const { carts, cartCount } = await getUserCartsAPI(user?.userId as string, currentPage);
                    setTotalPages(Math.ceil(Number(cartCount) / itemsPerPage))
                    setItems(([...carts.map((cart: any) => ({ cartId: cart.id, ...cart.Property }))]));
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoadingPage(false)
                }
            }
        })()

    }, [refreshPage, currentPage]);

    const updateItem = (id: number, patch: Partial<CartItem>) => {
        setItems(prev => prev.map(it => it.id === id ? { ...it, ...patch } : it));
    };

    const nightsFor = (checkIn?: string, checkOut?: string) => {
        if (!checkIn || !checkOut) return 0;
        const d1 = new Date(checkIn);
        const d2 = new Date(checkOut);
        const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const subtotalFor = (item: CartItem) => nightsFor(item.checkIn, item.checkOut) * item.price;

    const total = items.reduce((acc, it) => acc + subtotalFor(it), 0);
    const serviceFee = Math.ceil(total * 0.05);
    const grandTotal = total + serviceFee;

    const paySingle = async (item: CartItem) => {
        setError(null);
        setMessage(null);
        const nights = nightsFor(item.checkIn, item.checkOut);
        if (nights <= 0) {
            setError('Please select valid check-in and check-out dates for the selected property.');
            return;
        }

        const amount = subtotalFor(item) + Math.ceil(subtotalFor(item) * 0.05);
        setLoadingIds(prev => [...prev, String(item.id)]);
        try {
            // Save last checkout for convenience
            window.localStorage.setItem('checkoutData', JSON.stringify({ propertyId: item.id, checkIn: item.checkIn, checkOut: item.checkOut, propertyPrice: item.price }));

            let res = await makePaymentWithPopupAPI({
                propertyId: String(item.id),
                amount,
                userId: user?.userId || undefined,
                email: user?.email || undefined,
                items: items.map(it => ({
                    PropertyId: it.id,
                    totalPrice: it.price,
                    UserId: user?.userId || admin?.userId,
                    checkIn: it.checkIn,
                    checkOut: it.checkOut,
                    status: 'pending', //confirmed, canceled
                    paymentStatus: 'pending', //paid
                }))
            } as any);

            if (res) {
                setMessage(`Payment successful for ${item.title}`);
                // Optionally remove item from cart after successful payment
                setItems(prev => prev.filter(p => p.id !== item.id));
            }


        } catch (err) {
            setError('Payment failed for item. Please try again.');
        } finally {
            setLoadingIds(prev => prev.filter(x => x !== String(item.id)));
        }
    };

    const payAll = async () => {
        setError(null);
        setMessage(null);
        // Validate all items have valid dates
        for (const it of items) {
            if (nightsFor(it.checkIn, it.checkOut) <= 0) {
                setError('All items must have valid check-in and check-out dates before paying.');
                return;
            }
        }

        setLoadingIds(prev => [...prev, 'all']);

        try {
            // Save checkoutData for later reference
            window.localStorage.setItem('checkoutData', JSON.stringify({ cart: items }));

            await makePaymentWithPopupAPI({
                propertyId: items.map(i => i.id).join(','),
                amount: grandTotal,
                userId: user?.userId || undefined,
                email: user?.email || undefined,
                items: items.map(it => ({
                    PropertyId: it.id,
                    totalPrice: it.price,
                    UserId: user?.userId || admin?.userId,
                    checkIn: it.checkIn,
                    checkOut: it.checkOut,
                    status: 'pending', //confirmed, canceled
                    paymentStatus: 'pending', //paid
                }))
            } as any);

            setMessage('Payment successful for all items');
            // setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError('Payment failed. Please try again.');
        } finally {
            setLoadingIds(prev => prev.filter(x => x !== 'all'));
        }
    };


    if (loadingPage) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }


    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

            {items.length === 0 ? (
                <div className="bg-white p-6 rounded shadow text-center">
                    <p className="mb-4">Your cart is empty.</p>
                    {!isAuthenticated && <p className="mb-4">Please login</p>}

                    <Link to="/properties" className="text-blue-600 hover:underline">Browse properties</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.location}</p>
                                    <p className="mt-2 text-sm text-gray-700">Price: {handlePriceFormat(item.price)} / night</p>

                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <div>
                                            <label className="block text-xs text-gray-600">Check In</label>
                                            <input type="date" value={item.checkIn || ''} onChange={(e) => updateItem(item.id as number, { checkIn: e.target.value })}
                                                className="mt-1 block w-full px-2 py-1 border rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600">Check Out</label>
                                            <input type="date" value={item.checkOut || ''} onChange={(e) => updateItem(item.id as number, { checkOut: e.target.value })}
                                                className="mt-1 block w-full px-2 py-1 border rounded" />
                                        </div>
                                        <div>
                                            <label className="block text-xs text-gray-600">Guests</label>
                                            <input type="number" min={1} value={item.guests || 1} onChange={(e) => updateItem(item.id as number, { guests: Math.max(1, Number(e.target.value)) })}
                                                className="mt-1 w-full px-2 py-1 border rounded" />
                                        </div>
                                    </div>

                                </div>

                                <div className="mt-4 md:mt-0 md:ml-6 w-full md:w-48 flex flex-col items-end">
                                    <div className="text-sm text-gray-600">Nights: {nightsFor(item.checkIn, item.checkOut)}</div>
                                    <div className="text-lg font-semibold">{handlePriceFormat(subtotalFor(item))}</div>
                                    <div className="mt-3 flex space-x-2">
                                        <button onClick={() => paySingle(item)} disabled={loadingIds.includes(String(item.id))}
                                            className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{loadingIds.includes(String(item.id)) ? 'Processing...' : 'Pay'}</button>
                                        <button
                                            onClick={async () => {
                                                // setItems(prev => prev.filter(p => p.id !== item.id));
                                                let res = await removeFromCartAPI({
                                                    cartId: item?.cartId as number,
                                                    userId: user?.userId as unknown as number
                                                });
                                                if (res) {
                                                    setRefreshPage(prev => prev + 1);
                                                    toast('Item removed');
                                                }
                                            }
                                            }
                                            className="px-3 py-2 border rounded"
                                        >Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <SimplePagination setCurrentPage={setCurrentPage} totalPages={totalPages} currentPage={currentPage} />
                    </div>

                    <aside className="bg-white p-6 rounded shadow">
                        <h2 className="text-lg font-medium mb-3">Order Summary</h2>
                        <div className="mb-2 flex justify-between text-sm text-gray-700"><span>Subtotal</span><span>{handlePriceFormat(total)}</span></div>
                        <div className="mb-2 flex justify-between text-sm text-gray-700"><span>Service fee</span><span>{handlePriceFormat(serviceFee)}</span></div>
                        <div className="mt-3 pt-3 border-t flex justify-between font-semibold"><span>Total</span><span>{handlePriceFormat(grandTotal)}</span></div>

                        <div className="mt-4">
                            <button onClick={payAll} disabled={loadingIds.includes('all')} className="w-full px-4 py-2 bg-green-600 text-white rounded">{loadingIds.includes('all') ? 'Processing...' : `Pay All ${handlePriceFormat(grandTotal)}`}</button>
                        </div>

                        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
                        {message && <div className="mt-3 text-sm text-green-700">{message}</div>}
                    </aside>
                </div>
            )}
        </div>
    );
};

export default CartPage;
