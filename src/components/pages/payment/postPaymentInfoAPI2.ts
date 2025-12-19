
import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export async function postPaymentInfoAPI2(data: {
    PropertyId: string,
    UserId: string,
    checkIn: string,
    checkOut: string,
    totalPrice: number,
    status: string,
    paymentStatus: string;
    items?:Array<any>
}) {
    try {
        const _csrf = window.localStorage.getItem('csrf') as string;

        const roomResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/bookings/many", {
            method: 'POST',
            body: JSON.stringify(data),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "X-XSRF-TOKEN": _csrf
            },
        });

        let result = await roomResponse.json() as ResponseType;


        if (result.status === 'success') {

            return { status: true, data: result.data }
        }

        return { status: false, data: null }
    } catch (error) {
        console.log(error);
        return { status: false, data: null }
    }


}