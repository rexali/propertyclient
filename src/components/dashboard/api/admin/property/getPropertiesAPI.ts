
import { config } from "../../../../../config/config.ts";
import { ResponseType } from "../../../../../types";

export const getPropertiesAPI = async function getPropertiesAPI(page: number=1) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/properties?page=" + page, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        const result = await response.json() as ResponseType
        if (result.status === 'success') {

            return result.data;
        }

        return;

    } catch (error) {
        console.warn(error);

    }
}
