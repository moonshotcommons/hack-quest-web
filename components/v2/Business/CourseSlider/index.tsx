import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ProjectCourseType } from '@/service/webApi/course/type';

import {
  ChangeState,
  ScrollContainer,
  ScrollControl
} from '@/components/v2/Common/ScrollContainer';

import { cn } from '@/helper/utils';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface CourseSliderType {
  list: (ProjectCourseType | ElectiveCourseType)[];
  title: string;
  renderItem: (item: ProjectCourseType | ElectiveCourseType) => ReactNode;
}

const CourseSlider: React.FC<CourseSliderType> = ({
  list,
  // curTab,
  title,
  renderItem
}) => {
  const p = {
    inProgress: false,
    inCompleted: false
  };
  const [progress, setProgress] = useState(p);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerState, setScrollContainerState] =
    useState<ChangeState>();

  const courseGroupList = useMemo(() => {
    if (!list?.length) return [];
    const groupList: (ProjectCourseType | ElectiveCourseType)[][] = [];
    let group: (ProjectCourseType | ElectiveCourseType)[] = [];
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
    setCurrentPage(0);
  }, []);

  const onPrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    if (currentPage === courseGroupList.length - 1) return;
    setCurrentPage(currentPage + 1);
  };

  if (!list?.length) return null;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-h3 text-neutral-black">{title}</h3>
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
        className="py-8"
      >
        <div className="flex gap-[24px]">
          {courseGroupList.map((item, index) => {
            return (
              <div key={index} className="flex gap-[24px] w-[1280px]">
                {item.map((course) => {
                  return renderItem(course);
                })}
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

export default CourseSlider;
