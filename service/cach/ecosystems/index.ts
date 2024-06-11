import { cache } from 'react';
import { cookies } from 'next/headers';
import webApi from '@/service';

export const getEcosystemsCached = cache(async (params: Record<string, any>) => {
  const token = cookies().get('token')?.value || '';
  return webApi.ecosystemApi.getAllEcosystems(params, token);
});

export const getEcosystemCached = cache(async (params: Record<string, any>) => {
  const token = cookies().get('token')?.value || '';
  return webApi.ecosystemApi.getEcosystemsDetailById(params.ecosystemId, params, token);
});

export const getLevelsCached = cache(async (params: Record<string, any>) => {
  const token = cookies().get('token')?.value || '';
  return webApi.ecosystemApi.getEcosystemLevels(params.ecosystemId, params, token);
});
