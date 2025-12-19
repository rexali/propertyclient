
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function getProviderUsersPropertiesInCartsAPI(userId: string, page: number = 1) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/carts/providers/${userId}?page=${page}`, {
            method: "GET",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result?.data;
        }

        return;

    } catch (error) {
        console.warn(error);

    }
}