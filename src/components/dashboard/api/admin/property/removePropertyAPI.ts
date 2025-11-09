import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";

export const removePropertyAPI = async function removePropertyAPI(id: number) {
    
    const _csrf = window.localStorage.getItem('csrf') as string;
    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/properties/" + id, {
        method: "DELETE",
        mode: "cors",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "X-CSRF-Token": _csrf
        }
    });

    let result = await response.json() as ResponseType;
    if (result.status === "success") {

        return true;
    }

    return false;
}