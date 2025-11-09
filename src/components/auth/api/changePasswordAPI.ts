import { config } from "../../../config/config.ts";


const changePasswordAPI = async (passwordData: {
    rcode: string,
    email: string,
    password: string,
    oldPassword: string,
}) => {

    try {
        let response = await fetch(`${config.BASE_URL_LOCAL + '/api/v1/auth/change'}`, {
            body: JSON.stringify(passwordData),
            method: "POST",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        return await response.json();
    } catch (error) {
        console.warn(error);
    }
};

export {
    changePasswordAPI
}