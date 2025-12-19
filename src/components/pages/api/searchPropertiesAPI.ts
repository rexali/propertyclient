import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export type Query = {
    page: number;
    location: string;
    minPrice: number;
    maxPrice: number;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
}

export const searchPropertiesAPI = async function searchPropertiesAPI(query: any) {
    let params = new URLSearchParams(query).toString();
    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/search?" + params, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
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
