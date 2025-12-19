
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";


export interface AddNotificationPayload {
    title: string;
    message: string;
}



export async function updateNotificationAPI(payload: AddNotificationPayload, id: number) {
    try {
        const _csrf = window.localStorage.getItem('csrf') as string;
        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/notifications/' + id, {
            credentials: 'include',
            method: 'PATCH',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json',
                "X-CSRF-Token": _csrf
            },
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to add notification');
        }
        let result = await response.json() as ResponseType;

        if (result.status === 'success') {
            return true
        }

        return false


    } catch (error: any) {
        console.warn(error);
    }
}
