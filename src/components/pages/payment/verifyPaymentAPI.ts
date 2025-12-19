import { config } from "../../../config/config";
import { ResponseType } from "../../../types";


export async function verifyPaymentAPI(reference: any) {

    try {
        const _csrf = window.localStorage.getItem('csrf') as string;
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/verify_transaction`, {
            body: JSON.stringify({ reference }),
            headers: {
                'Content-Type': 'application/json',
                "X-XSRF-TOKEN": _csrf,
            },
            method: "POST",
            credentials: 'include',
        });
        const { data, status } = await response.json() as ResponseType;

        if (status === 'success') {

            return data;
        }

        return;

    } catch (error) {
        console.warn(error);
    }
};