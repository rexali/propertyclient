
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function getReviewAPI(reviewId: any) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/reviews/${reviewId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch review');
        }
        const data = await response.json() as ResponseType;
        return {
            success: data.status === 'success',
            review: data.data.review,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
