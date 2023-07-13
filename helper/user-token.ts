/**
 * @description 存储/获取 user token
 */

const KEY = 'token';

export function setToken(token: string) {
  localStorage.setItem(KEY, token);
}

export function getToken() {
  return localStorage.getItem(KEY) || '';
}

export function removeToken() {
  localStorage.removeItem(KEY);
}
