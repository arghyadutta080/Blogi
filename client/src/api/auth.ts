import axios from 'axios'
import { clearAuthCookies, getAuthToken, setAuthCookies } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

// axios interceptor to automatically add token to all requests
api.interceptors.request.use(async (config) => {
    const token = await getAuthToken();

    if (token) {
        config.headers.Authorization = token
    }

    return config
})

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
        await api.post("/auth/logout")
    } finally {
        clearAuthCookies();
    }
}

export async function getCurrentUser(){
    const token = await getAuthToken();
    console.log(token)
    if (!token) {
        throw new Error("Not authenticated")
    }
    const response = await api.get("/auth/me")

    return response.data
}

