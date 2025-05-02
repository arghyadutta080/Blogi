import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/create", "/edit"];
const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("access_token")?.value || null;
    console.log("Token:", token);
    console.log("Pathname:", pathname);

    if (protectedRoutes.some((route) => pathname.startsWith(route)) && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (authRoutes.some((route) => pathname.startsWith(route)) && token) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
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