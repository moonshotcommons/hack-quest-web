import {
  CourseDetailType,
  CourseType,
  ProcessType,
  ProjectCourseType
} from '@/service/webApi/course/type';
import React, { useMemo, useState } from 'react';
import { HiArrowLongRight } from 'react-icons/hi2';
import ElectiveCard from '@/components/Web/Business/ElectiveCard';
import PracticeCard from '@/components/Web/Business/PracticeCard';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface CourseListProp {
  list: CourseDetailType[];
  curTab: ProcessType;
}

const CourseList: React.FC<CourseListProp> = ({ list, curTab }) => {
  const [isAll, setIsAll] = useState(false);
  const learnList = useMemo(() => {
    return isAll ? list : list.slice(0, 3);
  }, [isAll, list]);
  const card = (course: CourseDetailType) => {
    const className = `${
      curTab === ProcessType.IN_PROCESS ? 'h-[338px]' : 'h-[356px]'
    }`;
    switch (course.type) {
      case CourseType.Mini:
        return (
          <ElectiveCard
            course={course as ElectiveCourseType}
            from={'dashboard'}
            className={className}
            inProgress={curTab === ProcessType.IN_PROCESS}
          />
        );
      case CourseType.GUIDED_PROJECT:
        return (
          <PracticeCard
            course={course as ProjectCourseType}
            from={'dashboard'}
            className={className}
            inProgress={curTab === ProcessType.IN_PROCESS}
          />
        );
    }
  };
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Courses</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {learnList.map((course) => (
          <div key={course.id} className="w-[calc((100%-48px)/3)]">
            {card(course)}
          </div>
        ))}
      </div>
      {!isAll && list.length > 3 && (
        <div className="flex">
          <div
            className="flex text-neutral-off-black button-text-s items-center mt-[16px] cursor-pointer"
            onClick={() => setIsAll(true)}
          >
            <span>EXPLORE</span>
            <HiArrowLongRight size={18}></HiArrowLongRight>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
