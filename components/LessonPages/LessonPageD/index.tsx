import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';

interface LessonPageDProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageD: FC<LessonPageDProps> = (props) => {
  console.log('lesson-D');
  return <div className="text-white">LessonPageD</div>;
};

export default LessonPageD;
