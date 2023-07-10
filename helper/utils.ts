import { CourseType } from '@/service/webApi/course/type';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCourseLink = (courseType?: CourseType) => {
  if (!courseType) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
      return `/syntax`;
    case CourseType.CONCEPT:
      return `/concept`;
    case CourseType.GUIDED_PROJECT:
      return `/guided-project`;
    case CourseType.LEARNING_TRACKS:
      return `/learning-track`;
    case CourseType.HACKATHON:
      return `/hackathon`;
    case CourseType.TEASER:
      return `/teaser`;
  }
};
