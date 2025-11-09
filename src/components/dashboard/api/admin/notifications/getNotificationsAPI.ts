
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";


export async function getNotificationsAPI(page:number) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL+'/api/v1/notifications?page='+page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch notifications');
        }
        const data = await response.json() as ResponseType;
        return {
            success: true,
            notifications: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
