/**
 * @description 存储/获取 user token
 */

const KEY = 'token';

export function setToken(token: string) {
  if (typeof window === 'object') {
    localStorage.setItem(KEY, token);
  }
}

export function getToken() {
  if (typeof window === 'object') {
    return localStorage.getItem(KEY) || '';
  }
  return '';
}

export function removeToken() {
  if (typeof window === 'object') {
    localStorage.removeItem(KEY);
  }
}
