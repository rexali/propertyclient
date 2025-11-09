import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export const updatePropertyAPI = async function updatePropertyAPI(id: string, data: any) {

    try {
        const _csrf = window.localStorage.getItem('csrf') as string;

        const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/properties/" + id, {
            body: data,
            method: 'PATCH',
            credentials: 'include',
            headers: {
                "X-CSRF-Token": _csrf
            },
        });

        const result = await response.json() as ResponseType;

        if (result.status === 'success' && result.data?.affectedCount === 1) {

            return true;
        }

        return false

    } catch (error) {
        console.warn(error);

    }
}

// https://comprehensive-fintec-ppi9.bolt.host/