'use server';

import { cookies } from 'next/headers';

export const setAuthCookies = (tokenType: string, token: string) => {
    const cookieConfig = {
        httpOnly: true,
        secure: true,
        sameSite: 'strict' as const,
        path: '/',
        maxAge: 60 * 60, // 1 hour
    }
    cookies().set('token_type', tokenType, cookieConfig);
    cookies().set('access_token', token, cookieConfig);
};

export const clearAuthCookies = () => {
    cookies().delete('token_type');
    cookies().delete('access_token');
};

export const getAuthToken = async () => {
    const tokenType = cookies().get('token_type')?.value;
    const accessToken = cookies().get('access_token')?.value;
    return (tokenType && accessToken) ? `${tokenType} ${accessToken}` : null;
};