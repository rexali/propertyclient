
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export async function getUserPropertiesInCartAPI(userId:string,page: number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/carts/users/${userId}?page=${page}`, {
            method: "GET",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result?.data;
        }

    } catch (error) {
        console.warn(error);

    }
}