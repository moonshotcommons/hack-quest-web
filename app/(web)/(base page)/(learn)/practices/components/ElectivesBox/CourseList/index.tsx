import React from 'react';
// import CourseCard from '@/components/Mobile/CourseCard';
import { ProjectCourseType } from '@/service/webApi/course/type';

interface CourseListProps {
  list: ProjectCourseType[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex h-full flex-1 flex-wrap gap-[20px] pb-[20px]">
      {/* {list.map((course, index) => (
        <CourseCard
          key={course?.id + index}
          course={course}
          baseProgress={true}
        ></CourseCard>
      ))} */}
    </div>
  );
};

export default CourseList;
