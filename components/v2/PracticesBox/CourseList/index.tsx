import React from 'react';
import PracticeCard from '@/components/v2/Business/PracticeCard';
import { CourseResponse } from '@/service/webApi/course/type';

interface CourseListProps {
  list: CourseResponse[];
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px] pb-[20px]">
      {list.map((course) => (
        <PracticeCard key={course?.id} course={course}></PracticeCard>
      ))}
    </div>
  );
};

export default CourseList;
