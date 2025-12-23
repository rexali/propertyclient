export interface Review {
    id: number;
    PropertyId: number;
    UserId: number;
    rating: number; // 1-5
    comment: string;
    createdAt: string;
}

export const reviews: Review[] = [
    {
        id: 1,
        PropertyId: 101,
        UserId: 201,
        rating: 5,
        comment: 'Amazing stay with beautiful views. Highly recommend!',
        createdAt: new Date().toISOString(),
    },
    {
        id: 2,
        PropertyId: 103,
        UserId: 42,
        rating: 4,
        comment: 'Great location and very cozy. Host was responsive.',
        createdAt: new Date().toISOString(),
    }
];


export function getReviews() {
    return reviews;
}

export function getBookingById(id:any) {
    return reviews.find(review=>review.id===id)
}
