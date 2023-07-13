import { CourseType } from '@/service/webApi/course/type';
import { useEffect } from 'react';

export const useScrollToElement = (
  target: HTMLElement | undefined,
  courseType: CourseType | undefined
) => {
  useEffect(() => {
    if (target && courseType) {
      document.documentElement.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  }, [target, courseType]);
};
