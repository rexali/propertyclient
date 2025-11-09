import { config } from "../../../config/config.ts";

interface ResponseType {
    status: string;
    data: { user: any }
    message: string
}
export const loginAPI = async function loginAPI(data: { password: string, username: string }) {
    const _csrf = window.localStorage.getItem('csrf') as any;
    const response = await fetch(config.BASE_URL_LOCAL + "/api/v1/auth/login/local", {
        method: "post",
        body: JSON.stringify({ ...data, _csrf }),
        headers: {
            "X-CSRF-Token": _csrf,
            "Content-Type": "application/json",
        },
        credentials: 'include'

    });
    const result = await response.json() as ResponseType;
    if (result.status === 'success') {
        window.localStorage.setItem('token', result?.data?.user?.token);

        return result?.data?.user?.token;
    }

    return;
}