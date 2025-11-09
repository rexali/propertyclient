
import { config } from "../../../../../config/config";
import { ResponseType } from "../../../../../types";


export const updateUserProfileAPI = async function updateUserProfileAPI(userId: number, data: any) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const roomResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/profiles/" + userId, {
        method: 'PATCH',
        body: data as any,
        credentials: 'include',
        headers: {
            "X-CSRF-Token": _csrf
        },
    });

    let result = await roomResponse.json() as ResponseType;


    if (result.status === 'success') {

        return result.data?.profile;
    }

    return;
}