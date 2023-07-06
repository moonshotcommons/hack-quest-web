import { CourseType } from '@/service/webApi/course/type';

export const getCourseLink = (
  courseType?: CourseType,
  type?: 'detail' | 'unit' | 'lesson'
) => {
  if (!courseType || !type) return '/404';
  switch (courseType) {
    case CourseType.SYNTAX:
      return `/syntax/${type}`;
    case CourseType.CONCEPT:
      return `/concept/${type}`;
    case CourseType.GUIDED_PROJECT:
      return `/guided-project/${type}`;
    case CourseType.LEARNING_TRACKS:
      return `/learning-track/${type}`;
    case CourseType.HACKATHON:
      return `/hackathon/${type}`;
    case CourseType.TEASER:
      return `/teaser/${type}`;
  }
};
