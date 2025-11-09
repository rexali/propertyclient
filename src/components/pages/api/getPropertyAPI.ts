
import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export const getPropertyAPI = async function getPropertyAPI(id: number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/properties/" + id, {
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return result.data.property;
        }

    } catch (error) {
        console.warn(error);

    }
}
