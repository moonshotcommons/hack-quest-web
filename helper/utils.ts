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
    case CourseType.LEARNING_TRACK:
      return `/learning-track`;
    case CourseType.HACKATHON:
      return `/hackathon`;
    case CourseType.TEASER:
      return `/teaser`;
  }
};

export const getLessonLink = (
  courseType: CourseType,
  courseName: string,
  lessonId: string
) => {
  if (!courseType || !courseName || !lessonId) return '/404';
  return `${getCourseLink(courseType)}/${courseName}/learn/${lessonId}`;
};
