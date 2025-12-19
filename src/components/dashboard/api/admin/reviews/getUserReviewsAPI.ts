
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function getUserReviewsAPI(userId: any, page: number = 1) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/reviews/users/${userId}?page=${page}`, {
            method: 'GET',
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
            success: data.status === 'success',
            data: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
