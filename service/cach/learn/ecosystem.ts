import webApi from '@/service';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import { cookies } from 'next/headers';
import { cache } from 'react';

export const getEcosystemById = cache(function (id: string, params: object): Promise<EcosystemDetailType> {
  const token = cookies().get('token')?.value || '';
  return webApi.ecosystemApi.getEcosystemsDetailById(id as string, params, token as string);
});
