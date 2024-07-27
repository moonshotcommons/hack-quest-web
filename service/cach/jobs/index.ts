import { cache } from 'react';
import webApi from '@/service';

export const getCachedJobs = cache(async (params: Record<string, any>) => {
  return await webApi.jobApi.getJobs(params);
});

export const getFavoritedCachedJobs = cache(async (params: Record<string, any>) => {
  return await webApi.jobApi.getFavoritedJobs(params);
});

export const getCachedJob = cache(async (id: string) => {
  return await webApi.jobApi.getJob(id);
});

export const getCachedPublishedJobCount = cache(async () => {
  return await webApi.jobApi.getPublishedJobCount();
});

export const getCachedPublishedJobs = cache(async (params: Record<string, any>) => {
  return await webApi.jobApi.getPublishedJobs(params);
});
