import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { FC, ReactNode } from 'react';

interface LessonPageBProps {
  lesson: CourseLessonType;
  courseType: CourseType;
}

const LessonPageE: FC<LessonPageBProps> = (props) => {
  console.log('lesson-b');
  return <div className="text-white">LessonPageE</div>;
};

export default LessonPageE;
