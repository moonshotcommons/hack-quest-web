import { cache } from 'react';
import { cookies } from 'next/headers';
import webApi from '@/service';

export const getMyCoursesCached = cache(async (params: object) => {
  const token = cookies().get('token')?.value || '';
  return webApi.courseApi.getMyCourses(params, token);
});
