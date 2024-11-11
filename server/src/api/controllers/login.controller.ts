import { redirectToLogin } from "../services/authentication";


export async function login() {
    return await redirectToLogin();
} 