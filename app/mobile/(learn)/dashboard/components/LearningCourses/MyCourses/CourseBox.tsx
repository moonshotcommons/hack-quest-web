import React, { useEffect, useMemo, useState } from 'react';
import { ProjectCourseType, ProcessType } from '@/service/webApi/course/type';
interface CourseListType {
  list: ProjectCourseType[];
  curTab: ProcessType;
  title: 'Electives' | 'Practices';
}
import {
  ChangeState,
  ScrollContainer,
  ScrollControl
} from '@/components/Common/ScrollContainer';

import PracticeCard from '@/components/Web/Business/PracticeCard';
import { cn } from '@/helper/utils';

const CourseList: React.FC<CourseListType> = ({ list, curTab, title }) => {
  const p = {
    inProgress: false,
    inCompleted: false
  };
  const [progress, setProgress] = useState(p);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  const courseGroupList = useMemo(() => {
    const groupList: ProjectCourseType[][] = [];
    let group: ProjectCourseType[] = [];
    list.forEach((item, index) => {
      group.push(item);
      if (group.length === 4) {
        groupList.push(group);
        group = [];
      }
      if (index === list.length - 1) groupList.push(group);
    });
    return groupList;
  }, [list]);

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
    setCurrentPage(0);
  }, [curTab]);

  const onPrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    if (currentPage === courseGroupList.length - 1) return;
    setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <div className="font-next-poster-Bold text-[21px] tracking-[1.26px] text-[#131313] flex justify-between items-center">
        <span>{title}</span>
        {courseGroupList.length > 1 && (
          <ScrollControl
            changeState={scrollContainerState}
            showSlider={false}
            controlWrapSize={48}
            onLeftClick={onPrevious}
            onRightClick={onNext}
          ></ScrollControl>
        )}
      </div>
      <ScrollContainer
        onChange={(state: any) => setScrollContainerState(state)}
        gap={24}
        className="py-6"
      >
        <div className="flex gap-[24px]">
          {courseGroupList.map((item, index) => {
            return (
              <div key={index} className="flex gap-[24px] w-[1280px]">
                {item.map((course) => (
                  <PracticeCard
                    key={course.id}
                    course={course}
                    {...progress}
                  ></PracticeCard>
                ))}
              </div>
            );
          })}
        </div>
      </ScrollContainer>
      {courseGroupList.length > 1 && (
        <div className="flex justify-center items-center gap-[10px]">
          {courseGroupList.map((item, index) => {
            return (
              <div
                key={index}
                className={cn(
                  'w-8 h-1 rounded-sm',
                  currentPage === index ? 'bg-[#FCC409]' : 'bg-[#DADADA]'
                )}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseList;
