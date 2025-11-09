
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export const getUserProfileAPI = async function getUserProfileAPI(userId: number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/profiles/" + userId, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {
             
            return result.data?.profile;
        }

    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/