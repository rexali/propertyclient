import { ResponseType } from "../types/index.ts";



export async function fetchDataAPI(
    url: string,
    payload: {
        method: "POST | GET | PUT | GET | PATCH",
        body: any,
        credentials: 'include',
        headers: any
    }) {
    try {

        const response = await fetch(url, {
            ...payload,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Failed to send message');
        }

        let result = await response.json() as ResponseType;

        if (result.status === 'success') {
            return result.data
        }

        return;


    } catch (error: any) {
        console.warn(error);
    }
}
