import React from 'react';

interface CourseListProps {
  list: any;
}
const CourseList: React.FC<CourseListProps> = ({ list }) => {
  return (
    <div className="flex-1 flex flex-wrap gap-[2%]">
      {list.map((v: any, i: any) => (
        <div
          key={i}
          className="w-[32%] h-[333px] bg-black mb-[20px] text-[#fff]"
        >
          {i}
        </div>
      ))}
    </div>
  );
};

export default CourseList;
