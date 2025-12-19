import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function cancelBookingAPI(bookingId:number) {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + '/api/v1/bookings/'+bookingId, {
            method: 'PATCH',
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
            success: true,
            bookings: data.data,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || 'Unknown error',
        };
    }
}
