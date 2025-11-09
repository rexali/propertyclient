
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";


export async function removeNotificationAPI(id: number) {
    try {

        const _csrf = window.localStorage.getItem('csrf') as string;
        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/notifications/' + id, {
            credentials: 'include',
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": _csrf
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to fetch notifications');
        }
        const data = await response.json() as ResponseType;
        return {
            success: data.status === "success" ? true : false,
            notification: data.message,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
