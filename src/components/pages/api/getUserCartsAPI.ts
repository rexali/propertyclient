import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export async function getUserCartsAPI(userId: string, page: number=1) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/carts/${userId}?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch messages');
        }
        const data = await response.json() as ResponseType;
        return {
            success: data.status === 'success',
            carts: data.data?.carts,
            cartCount: data.data?.cartCount,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
