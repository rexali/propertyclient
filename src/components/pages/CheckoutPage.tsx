import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Property } from '../../types';
import { handlePriceFormat } from '../../utils/handlePriceFormat';
import { useAuth } from '../../context/AuthContext';
import { makePaymentWithPopupAPI } from './payment/makePaymentWithPopupAPI';
import { getPropertyAPI } from './api/getPropertyAPI';
import { toast } from 'sonner';

const CheckoutPage: React.FC = () => {
    const { id: propertyId } = useParams<{ id?: string }>();
    const { user} = useAuth();
    const [property, setProperty] = useState<Property | null>(null);
    const [checkIn, setCheckIn] = useState<string>('');
    const [checkOut, setCheckOut] = useState<string>('');
    const [guests, setGuests] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {

        (async () => {
            try {
                if (!property) {
                    const property = await getPropertyAPI(propertyId as unknown as number);
                    setProperty(property);
                }

            } catch (e) {
                console.error(e);   
            }

        })()
    }, []);

    const nights = (() => {
        if (!checkIn || !checkOut) return 0;
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diff = Math.ceil((outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    })();

    const subtotal = property ? nights * property.price : 0;
    const serviceFee = Math.ceil(subtotal * 0.05);
    const total = subtotal + serviceFee;

    const valid = checkIn && checkOut && nights > 0;

    const handlePay = async () => {
        setError(null);
        setMessage(null);
        if (!valid || !property) {
            setError('Please select valid check-in and check-out dates.');
            return;
        }

        setLoading(true);

        try {
            // Save checkout data for later reference
            window.localStorage.setItem('checkoutData', JSON.stringify({
                propertyId: property.id,
                checkIn,
                checkOut,
                guests,
                propertyPrice: property.price,
                title: property.title,
            }));

            // Attempt to call existing payment helper; if it fails, throw to show error
            await makePaymentWithPopupAPI({
                propertyId: String(property.id),
                amount: total,
                userId: user?.userId || undefined,
                email: user?.email || undefined,
            } as any);
            // setMessage('Payment successful — thank you! Redirecting...');
            // toast('Payment successful — thank you!')
            // setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            console.error(err);
            setError('Payment failed. Please try again.');
            toast('Payment failed. Please try again.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Booking for {property?.title}</h2>

                    <form onSubmit={(e) => { e.preventDefault(); handlePay(); }} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check In</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Check Out</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Guests</label>
                            <input
                                type="number"
                                min={1}
                                value={guests}
                                onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
                                className="mt-1 w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {!valid && checkIn && checkOut && (
                            <div className="text-sm text-red-600">Check-out must be after check-in.</div>
                        )}

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={!valid || loading}
                                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : `Pay ${handlePriceFormat(total)}`}
                            </button>
                        </div>
                    </form>
                </div>

                <aside className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium mb-3">Summary</h3>
                    <div className="mb-2 flex justify-between text-sm text-gray-700">
                        <span>Price per night</span>
                        <span>{property ? handlePriceFormat(property.price) : '-'}</span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm text-gray-700">
                        <span>Nights</span>
                        <span>{nights}</span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm text-gray-700">
                        <span>Subtotal</span>
                        <span>{handlePriceFormat(subtotal)}</span>
                    </div>
                    <div className="mb-2 flex justify-between text-sm text-gray-700">
                        <span>Service fee</span>
                        <span>{handlePriceFormat(serviceFee)}</span>
                    </div>
                    <div className="mt-3 pt-3 border-t flex justify-between font-semibold">
                        <span>Total</span>
                        <span>{handlePriceFormat(total)}</span>
                    </div>

                    {error && <div className="mt-4 text-sm text-red-600">{error}</div>}
                    {message && <div className="mt-4 text-sm text-green-700">{message}</div>}
                </aside>
            </div>
        </div>
    );
};

export default CheckoutPage;
