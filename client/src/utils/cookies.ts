'use server';

import { cookies } from 'next/headers';

export const setAuthCookies = (tokenType: string, token: string) => {
    cookies().set('token_type', tokenType)
    cookies().set('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60, // 1 hour
    });
};

export const clearAuthCookies = () => {
    cookies().delete('token_type');
    cookies().delete('access_token');
};

export const getAuthToken = async () => {
    const tokenType = cookies().get('token_type')?.value;
    const accessToken = cookies().get('access_token')?.value;
    return tokenType && accessToken ? `${tokenType} ${accessToken}` : null;
};