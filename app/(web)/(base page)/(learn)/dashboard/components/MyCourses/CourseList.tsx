import { CourseDetailType } from '@/service/webApi/course/type';
import React, { useMemo, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';

interface CourseListProp {
  list: CourseDetailType[];
}

const CourseList: React.FC<CourseListProp> = ({ list }) => {
  const [isAll, setIsAll] = useState(false);
  const learnList = useMemo(() => {
    return isAll ? list : list.slice(0, 3);
  }, [isAll, list]);
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Courses</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {learnList.map((course) => (
          <div key={course.id} className="w-[calc((100%-48px)/3)]"></div>
        ))}
      </div>
      {!isAll && list.length > 3 && (
        <div
          className="flex text-neutral-off-black button-text-s items-center mt-[16px] cursor-pointer"
          onClick={() => setIsAll(true)}
        >
          <span>EXPLORE</span>
          <HiArrowLongRight size={18}></HiArrowLongRight>
        </div>
      )}
    </div>
  );
};

export default CourseList;
