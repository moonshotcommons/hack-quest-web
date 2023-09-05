import React from 'react';
import CourseCard from '@/components/v2/CourseCard';
import { CourseResponse } from '@/service/webApi/course/type';

interface CourseListProps {
  list: CourseResponse[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px]">
      {list.map((course) => (
        <CourseCard key={course?.id} course={course}></CourseCard>
      ))}
    </div>
  );
};

export default CourseList;
