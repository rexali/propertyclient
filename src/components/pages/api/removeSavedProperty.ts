import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export const removeSavedPropertyAPI = async function saveSavedPropertyAPI(data: { propertyId: number, userId: number }) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/favourites/" + data.propertyId + "/users/" + data.userId, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await response.json() as ResponseType;

    if (result.status === 'success') {

        return true;
    }

    return false;
}