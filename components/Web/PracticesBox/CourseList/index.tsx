import React from 'react';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { ProjectCourseType } from '@/service/webApi/course/type';

interface CourseListProps {
  list: ProjectCourseType[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex flex-1 flex-wrap gap-[20px] pb-[20px]">
      {list.map((course) => (
        <PracticeCard key={course?.id} course={course}></PracticeCard>
      ))}
    </div>
  );
};

export default CourseList;
