import { cache } from 'react';
import webApi from '@/service/index';
import { UGCCourseType } from '@/service/webApi/course/type';

export interface CourseMarketApiType {
  data: UGCCourseType[];
  total: number;
}

export const getCourseMarket = cache(function (params: Object): Promise<CourseMarketApiType> {
  return webApi.courseApi.getCourseListBySearch(params);
});
