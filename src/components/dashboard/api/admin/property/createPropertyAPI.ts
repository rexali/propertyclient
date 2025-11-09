import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export const createPropertyAPI = async function createPropertyAPI(data: any) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const propertyResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/properties", {
        method: 'post',
        body: data as any,
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await propertyResponse.json() as ResponseType;


    if (result.status === 'success') {

        return true;
    }

    return false;
}