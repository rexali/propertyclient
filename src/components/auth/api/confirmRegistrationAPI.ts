import { config } from "../../../config/config.ts";

const confirmRegistrationAPI = async (confirmData: { rcode: any, email: any }) => {

    try {
        let response = await fetch(`${config.BASE_URL_LOCAL}/api/v1/auth/confirm`, {
            body: JSON.stringify(confirmData),
            method:"POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });

        return await response.json();
    } catch (error) {
        console.warn(error);
    }
};

export {
    confirmRegistrationAPI
}