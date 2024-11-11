import { redirectToLogin } from "../services/authentication";


export async function getOauthRedirectUri() {
    return await redirectToLogin();
} 