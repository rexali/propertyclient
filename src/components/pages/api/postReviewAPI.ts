
import { config } from "../../../config/config";
import { ResponseType } from "../../../types";

export const postReviewAPI = async function addReviewAPI(data: any) {

    const _csrf = window.localStorage.getItem('csrf') as string;

    const reviewResponse = await fetch(config.BASE_URL_LOCAL + "/api/v1/reviews", {
        method: 'post',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
            "Content-Type":"application/json",
            "X-CSRF-Token": _csrf
        },
    });

    let result = await reviewResponse.json() as ResponseType;

    if (result.status === 'success') {

        return true;
    }

    return true;
}