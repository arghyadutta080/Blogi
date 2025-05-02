import { api } from './axiosConfig';
import { clearAuthCookies, getAuthToken, setAuthCookies } from "@/utils/cookies";

interface AuthResponse {
    id?: string;
    username: string;
    access_token: string;
    token_type: string;
}

export async function registerUser(username: string, password: string) {
    const response = await api.post<AuthResponse>("/user/register",
        { username, password }
    )
    const { access_token, token_type } = response.data

    setAuthCookies(token_type, access_token)

    return response?.data;
}

export async function loginUser(username: string, password: string) {
    const response = await api.post<AuthResponse>("/auth/login", new URLSearchParams({ username, password }).toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
    const { access_token, token_type } = response?.data

    setAuthCookies(token_type, access_token)

    return response?.data;
}

export async function logoutUser() {
    try {
        await api.get("/auth/logout")
    } catch (error: any) {
        console.error("Error logging out:", error.message)
        throw new Error("Logout failed")
    } finally {
        clearAuthCookies();
    }
}

export async function getCurrentUser(){
    const token = getAuthToken();
    if (!token) {
        throw new Error("Not authenticated")
    }
    const response = await api.get("/auth/me")

    return response.data
}

