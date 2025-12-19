
import { config } from "../../../config/config";
import { ResponseType } from "../../../types";


export const savePropertyAPI = async function savePropertyAPI(data: { PropertyId: number, UserId: number }) {

    const _csrf = window.localStorage.getItem('csrf') as string;
    console.log(data);

    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/favourites", {
        method: 'POST',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            "Content-Type":"application/json",
            "X-CSRF-Token": _csrf
        },
    });

    let result = await response.json() as ResponseType;

    if (result.status === 'success') {

        return true;
    }

    return false;
}


