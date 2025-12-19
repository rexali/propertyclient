
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";


export async function getNotificationAPI(id:number) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL+'/api/v1/notifications/'+id, {
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
            success:  data.status==='success',
            notification: data.data.notification,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
