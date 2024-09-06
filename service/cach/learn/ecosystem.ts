import webApi from '@/service';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getEcosystemById = cache(function (id: string, params: object): Promise<EcosystemDetailType> {
  return webApi.ecosystemApi.getEcosystemsDetailById(id as string, params);
});
export const getEcosystemExploreById = cache(function (id: string, params: object): Promise<EcosystemDetailType> {
  return webApi.ecosystemApi.getEcosystemsExploreDetailById(id as string, params);
});

export const getActiveEcosystemCached = cache(async () => {
  const token = cookies().get('token')?.value || '';
  return webApi.ecosystemApi.getActiveEcosystem(token);
});
