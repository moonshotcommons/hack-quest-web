import React from 'react';
import { CourseResponse } from '@/service/webApi/course/type';
import CourseCard from '@/components/v2/CourseCard';
interface CourseListType {
  list: CourseResponse[];
}

const CourseList: React.FC<CourseListType> = ({ list }) => {
  return (
    <div className="flex flex-wrap my-[30px] gap-[20px]">
      {list.map((course) => (
        <CourseCard key={course.id} course={course}></CourseCard>
      ))}
    </div>
  );
};

export default CourseList;
