export interface Booking {
    id: number;
    propertyId: number;
    userId: number;
    checkIn: string; // YYYY-MM-DD
    checkOut: string; // YYYY-MM-DD
    nights: number;
    amount: number;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
}

export const bookings: Booking[] = [
    {
        id: 501,
        propertyId: 103,
        userId: 201,
        checkIn: new Date().toISOString().slice(0, 10),
        checkOut: (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().slice(0, 10); })(),
        nights: 3,
        amount: 120 * 3,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: 502,
        propertyId: 201,
        userId: 202,
        checkIn: (() => { const d = new Date(); d.setDate(d.getDate() + 10); return d.toISOString().slice(0, 10); })(),
        checkOut: (() => { const d = new Date(); d.setDate(d.getDate() + 13); return d.toISOString().slice(0, 10); })(),
        nights: 3,
        amount: 180 * 3,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
];

export function getBookings() {
    return bookings;
}

export function getBookingById(id:any) {
    return bookings.find(booking=>booking.id===id)
}
