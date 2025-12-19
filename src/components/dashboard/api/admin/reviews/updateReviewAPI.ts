
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function updateReviewAPI(reviewId: any, reviewData:any) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/reviews/${reviewId}`,{
            method: 'PATCH',
            body:JSON.stringify(reviewData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch reviews');
        }
        const data = await response.json() as ResponseType;
        return {
            success: data.status==='success',
            reviews: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
