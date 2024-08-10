import { cookies } from 'next/headers';

export function isAuthenticated() {
  const cookieStore = cookies();
  const session = cookieStore.has('token');
  return session;
}
