
import { config } from "../../../../../config/config.ts";
import { ResponseType } from "../../../../../types/index.ts";


export async function removeReviewAPI(id: number) {
    try {
        const _csrf = window.localStorage.getItem('csrf') as string;
        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/reviews/' + id, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "X-XSRF-Token": _csrf
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to remove a review');
        }
        const data = await response.json() as ResponseType;
        return {
            success: data.status === "success",
            review: data.data?.review,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
