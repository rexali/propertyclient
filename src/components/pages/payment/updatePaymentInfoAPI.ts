
import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export async function updatePaymentInfoAPI(data: {
    BookingId:string
    RoomId?: string,
    UserId?: string,
    checkIn?: string,
    checkOut?: string,
    totalPrice?: number,
    status: string,
    paymentStatus: string
}) {
    try {
        const _csrf = window.localStorage.getItem('csrf') as string;

        const roomResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/bookings/"+data.BookingId, {
            method: 'PATCH',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                "XSRF-TOKEN": _csrf,
                'Content-Type': 'application/json',
            },
        });

        let result = await roomResponse.json() as ResponseType;


        if (result.status === 'success') {

            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
        return false;
    }


}