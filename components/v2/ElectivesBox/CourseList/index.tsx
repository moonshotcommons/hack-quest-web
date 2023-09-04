import React from 'react';
import CourseCard from '@/components/v2/CourseCard';
import { CourseResponse } from '@/service/webApi/course/type';
// import Loading from '../../Common/Loading';

interface CourseListProps {
  list: CourseResponse[];
  // loading: boolean;
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[20px]">
      {/* <Loading loading={loading}> */}
      {list.map((course) => (
        <CourseCard key={course?.id} course={course}></CourseCard>
      ))}
      {/* </Loading> */}
    </div>
  );
};

export default CourseList;
