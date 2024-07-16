'use server';

import { revalidateTag } from 'next/cache';
import { getToken } from '@/helper/user-token';
import webApi from '@/service';

const CACHE_TAG = 'active-ecosystem';
const API_URL = process.env.BACKEND_BASE_URL;

export async function getActiveEcosystem() {
  const token = getToken();
  const response = await fetch(`${API_URL}/ecosystems/active`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    next: {
      tags: [CACHE_TAG]
    }
  });
  const data = await response.json();
  return data;
}

export async function updateActiveEcosystem(ecosystemId: string | {}) {
  const params = typeof ecosystemId === 'string' ? { ecosystemId } : {};
  await webApi.ecosystemApi.switchEcosystem(params);
  revalidateTag(CACHE_TAG);
}
