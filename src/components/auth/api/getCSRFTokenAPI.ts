import { config } from "../../../config/config.1";

export const getCSRFTokenAPI = async function getCSRFTokenAPI() {
    try {
        const response = await fetch(config.BASE_URL_LOCAL + "/csrf", {
            method:"GET", 
            credentials: 'include' 
        });
        const result = await response.json();
        window.localStorage.setItem('csrf', result.data?._csrf);
        console.log(result.data?._csrf);        
    } catch (error) {
        console.warn(error);
    }
} 