import React from 'react';
import InstructorCard from '../InstructorCard';

interface CourseListProp {
  list: any;
}

const CourseList: React.FC<CourseListProp> = ({ list }) => {
  return (
    <div className="flex flex-wrap gap-[24px]">
      {list.map((v: any) => (
        <div key={v.id} className="w-[calc((100%-48px)/3)]">
          <InstructorCard />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
