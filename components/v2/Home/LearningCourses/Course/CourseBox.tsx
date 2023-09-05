import React, { useEffect, useState } from 'react';
import { CourseResponse, ProcessType } from '@/service/webApi/course/type';
import CourseCard from '@/components/v2/CourseCard';
interface CourseListType {
  list: CourseResponse[];
  curTab: ProcessType;
}

const CourseList: React.FC<CourseListType> = ({ list, curTab }) => {
  const p = {
    inProgress: false,
    inCompleted: false
  };
  const [progress, setProgress] = useState(p);
  useEffect(() => {
    const newPro =
      curTab === ProcessType.IN_PROCESS
        ? {
            inProgress: true
          }
        : {
            inCompleted: true
          };
    setProgress({ ...p, ...newPro });
  }, [curTab]);
  return (
    <div className="flex flex-wrap my-[30px] gap-[20px]">
      {list.map((course) => (
        <CourseCard key={course.id} course={course} {...progress}></CourseCard>
      ))}
    </div>
  );
};

export default CourseList;
