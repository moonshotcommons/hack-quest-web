import React from 'react';
import CourseCard from '@/components/Mobile/CourseCard';
import { CourseResponse } from '@/service/webApi/course/type';

interface CourseListProps {
  list: CourseResponse[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px] h-full">
      {list.map((course, index) => (
        <CourseCard
          key={course?.id + index}
          course={course}
          baseProgress={true}
        ></CourseCard>
      ))}
    </div>
  );
};

export default CourseList;
