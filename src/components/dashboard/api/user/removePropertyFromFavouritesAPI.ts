
import { config } from "../../../../config/config";
import { ResponseType } from "../../../../types";

export async function removePropertyFromFavouritesAPI(favouriteId: number, userId:number) {

    try {
        const response = await fetch(config.BASE_URL_LOCAL + `/api/v1/favourites/${favouriteId}/users/${userId}`, {
            method: "DELETE",
            credentials: 'include'
        });

        const result = await response.json() as ResponseType;
        if (result.status === 'success') {

            return true;
        }

        return false;

    } catch (error) {
        console.warn(error);

    }
}