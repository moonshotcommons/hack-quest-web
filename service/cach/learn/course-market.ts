import { cache } from 'react';
import webApi from '@/service/index';
import { ProjectCourseType } from '@/service/webApi/course/type';

export interface CourseMarketApiType {
  data: ProjectCourseType[];
  total: number;
}

export const getCourseMarket = cache(function (
  params: Object
): Promise<CourseMarketApiType> {
  console.info(params);
  return webApi.courseApi.getCourseListBySearch(params);
});
