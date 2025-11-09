import { config } from "../../../config/config.ts";

const forgetPasswordAPI = async (forgetData: { email: any }) => {

    try {
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/auth/forget`, {
            body: JSON.stringify(forgetData),
            method:"POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return response.json();
    } catch (error) {
        console.warn(error);
    }
};

export {
    forgetPasswordAPI,
}