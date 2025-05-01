import { NextRequest, NextResponse } from "next/server";
import { getAuthToken } from "./utils/cookies";

const protectedRoutes = ["/dashboard", "/create", "/edit"];
const authRoutes = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = getAuthToken();
    
    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    
    if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
        const redirectPath = request.headers.get("referer") || "/";
        return NextResponse.redirect(new URL(redirectPath, request.url));
    }
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/create/:path*",
        "/edit/:path*",
        "/login/:path*",
        "/register/:path*",
    ],
};