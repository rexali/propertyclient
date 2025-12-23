export interface CartItem {
    id?:number;
    PropertyId: number;
    propertyPrice: number;
    UserId: number;
    title?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: number;
}

export const carts: CartItem[] = [
    {
        PropertyId: 103,
        propertyPrice: 120,
        UserId: 201,
        title: 'Seaside Studio',
        checkIn: new Date().toISOString().slice(0, 10),
        checkOut: (() => { const d = new Date(); d.setDate(d.getDate() + 3); return d.toISOString().slice(0, 10); })(),
        guests: 2,
        id: 1
    },
    {
        PropertyId: 102,
        propertyPrice: 420000,
        UserId: 42,
        title: 'City Center Apartment',
        checkIn: undefined,
        checkOut: undefined,
        guests: 1,
        id: 2
    }
];


export function getCarts() {
    return carts;
}

export function getBookingById(id:any) {
    return carts.find(cart=>cart.id===id)
}
