import { config } from "../../../config/config.ts";

interface ResponseType {
    status: string;
    data: any
    message: string
}

export const verifyTokenAPI = async function verifyToken(token: string) {

    try {
        const token2 = window.localStorage.getItem('token') as string;
        if (token || token2) {
            const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/auth/verify-token", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token || token2
                },
                credentials: 'include'
            });
            const result = await response.json() as ResponseType;
            if (result.status === 'success') {
                return result.data;
            }

            return;
        }
    } catch (error) {
        console.warn(error);
    }
}

// https://comprehensive-fintec-ppi9.bolt.host/