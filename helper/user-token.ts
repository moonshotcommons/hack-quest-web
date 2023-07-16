/**
 * @description 存储/获取 user token
 */

const TOKEN_KEY = 'token';
const USER_KEY = 'user_info';

export function setToken(token: string) {
  if (typeof window === 'object') {
    localStorage.setItem(TOKEN_KEY, token);
  }
}

export function getToken() {
  if (typeof window === 'object') {
    return localStorage.getItem(TOKEN_KEY) || '';
  }
  return '';
}

export function removeToken() {
  if (typeof window === 'object') {
    localStorage.removeItem(TOKEN_KEY);
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
