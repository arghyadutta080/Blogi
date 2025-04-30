import axios from "axios";
import { getAuthToken } from "@/utils/cookies";

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const api = axios.create({
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