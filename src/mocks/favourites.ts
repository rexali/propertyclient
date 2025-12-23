// favourites stored as relation objects: PropertyId, UserId, createdAt, updatedAt
export interface Favourite {
    id?:number;
    PropertyId: number;
    UserId: number;
    createdAt: string;
    updatedAt: string;
}

export const favourites: Favourite[] = [
    {
        PropertyId: 101,
        UserId: 201,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: 1
    },
    {
        PropertyId: 103,
        UserId: 201,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        id: 2
    }
];


export function getFavourites() {
    return favourites;
}

export function getBookingById(id:any) {
    return favourites.find(favourite=>favourite.id===id)
}
