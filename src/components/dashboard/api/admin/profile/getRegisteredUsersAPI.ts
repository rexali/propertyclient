
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export const getRegisteredUsersAPI = async function getRegisteredUsersAPI(page: number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/profiles?page=" + page, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result.data;
        }

    } catch (error) {
        console.warn(error);

    }
}
