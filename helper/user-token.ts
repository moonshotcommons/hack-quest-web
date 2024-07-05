/**
 * @description 存储/获取 user token
 */
import { setCookie, deleteCookie } from 'cookies-next';

export const TOKEN_KEY = 'token';
export const USER_KEY = 'user_info';

export function setToken(token: string) {
  if (typeof window === 'object') {
    localStorage.setItem(TOKEN_KEY, token);
    setCookie(TOKEN_KEY, token, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3)
    });
  }
}

export function getToken() {
  if (typeof window === 'object') {
    return localStorage.getItem(TOKEN_KEY) || '';
  } else {
    const { cookies } = require('next/headers');
    return cookies().get('token')?.value || '';
  }
}

export function removeToken() {
  if (typeof window === 'object') {
    localStorage.removeItem(TOKEN_KEY);
    deleteCookie(TOKEN_KEY);
  }
}

export function setUser(userInfo: undefined | object) {
  if (typeof window === 'object') {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo) || '');
  }
}

export function getUser() {
  if (typeof window === 'object') {
    return JSON.parse((localStorage.getItem(USER_KEY) || null) as string);
  }
  return null;
}

export function removeUser() {
  if (typeof window === 'object') {
    localStorage.removeItem(USER_KEY);
  }
}
