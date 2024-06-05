import { cache } from 'react';
import { cookies } from 'next/headers';
import webApi from '@/service';

export const getIdeasCached = cache(async (params: Record<string, any>) => {
  const token = cookies().get('token')?.value || '';
  return webApi.ideaApi.getIdeas(params, token);
});

export const getTopIdeasCached = cache(async () => {
  const token = cookies().get('token')?.value || '';
  return webApi.ideaApi.getTopIdeas(token);
});

export const getIdeaCached = cache(async (id: string) => {
  const token = cookies().get('token')?.value || '';
  return webApi.ideaApi.getIdea(id, token);
});
