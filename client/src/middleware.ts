import { NextRequest, NextResponse } from "next/server";

const PROTECTED_ROUTES = ["/dashboard", "/create", "/edit"];
const AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("access_token")?.value || null;
    console.log("Token:", token);
    console.log("Pathname:", pathname);

    const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
    const isAuthPage = AUTH_ROUTES.some((route) => pathname.startsWith(route));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAuthPage && token) {
        return NextResponse.redirect(new URL("/", request.url));
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
