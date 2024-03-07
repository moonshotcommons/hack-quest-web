import { cache } from 'react';
import { BlogDetailType } from '@/service/webApi/resourceStation/type';
import webApi from '@/service/index';

export const getBlogById = cache(async function (
  id: string
): Promise<BlogDetailType> {
  const blog: BlogDetailType =
    await webApi.resourceStationApi.getBlogDetail(id);
  return blog;
});

export const getGlossaryById = cache(async function (
  id: string
): Promise<BlogDetailType> {
  const blog: BlogDetailType =
    await webApi.resourceStationApi.getGlossaryDetail(id);
  return blog;
});
