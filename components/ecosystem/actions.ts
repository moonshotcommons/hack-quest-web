'use server';

import { cookies } from 'next/headers';

export async function updateActiveEcosystem(id: string | {}) {
  const cookieStore = cookies();
  if (typeof id === 'string') {
    cookieStore.set('ecosystemId', id);
  } else {
    cookieStore.delete('ecosystemId');
  }
}
