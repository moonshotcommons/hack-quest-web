import UgcCourseCard from '@/components/Web/Business/UgcCourseCard';
import { UGCCourseType } from '@/service/webApi/course/type';
import React from 'react';

interface CourseListProp {
  list: UGCCourseType[];
}

const CourseList: React.FC<CourseListProp> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-[24px]">
      {list.map((course) => (
        <div key={course.id} className="w-[calc((100%-48px)/3)]">
          <UgcCourseCard isPublic={false} course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
