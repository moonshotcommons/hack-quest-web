'use client';
import React, { ReactNode, useEffect, useState } from 'react';
import { CourseBaseType } from '@/service/webApi/course/type';

import { ChangeState, ScrollContainer, ScrollControl } from '@/components/Common/ScrollContainer';

import { cn } from '@/helper/utils';
import CourseCardSkeleton from '../CourseCardSkeleton';

interface CourseSliderType<T> {
  groupList: T[][];
  title: string;
  loading?: boolean;
  // renderItem: (item: T) => ReactNode;
  children: ReactNode;
}

const CourseSlider = <T extends CourseBaseType>({
  groupList: groupTopCourse,
  // curTab,
  loading = false,
  title,
  children
}: CourseSliderType<T>) => {
  const p = {
    inProgress: false,
    inCompleted: false
  };
  const [progress, setProgress] = useState(p);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();

  useEffect(() => {
    setCurrentPage(0);
  }, []);

  const onPrevious = () => {
    if (currentPage === 0) return;
    setCurrentPage(currentPage - 1);
  };
  const onNext = () => {
    if (currentPage === groupTopCourse.length - 1) return;
    setCurrentPage(currentPage + 1);
  };

  if (!groupTopCourse?.length && !loading) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-h3 text-neutral-black">{title}</h3>
        {groupTopCourse.length > 1 && (
          <ScrollControl
            changeState={scrollContainerState}
            showSlider={false}
            controlWrapSize={48}
            onLeftClick={onPrevious}
            onRightClick={onNext}
          ></ScrollControl>
        )}
      </div>
      <ScrollContainer onChange={(state: any) => setScrollContainerState(state)} gap={20} className="w-full py-8">
        <div className="flex gap-[20px]">
          <CourseCardSkeleton.List active={loading} itemWidth={`w-[calc((1360px-60px)/4)]`}>
            {/* {courseGroupList.map((item, index) => {
              return (
                <div key={index} className="flex w-[1360px] gap-[20px] p-[2px]">
                  {item.map((course) => {
                    return renderItem(course);
                  })}
                </div>
              );
            })} */}
            {children}
          </CourseCardSkeleton.List>
        </div>
      </ScrollContainer>
      {groupTopCourse.length > 1 && (
        <div className="flex items-center justify-center gap-[10px]">
          {groupTopCourse.map((item, index) => {
            return (
              <div
                key={index}
                className={cn('h-1 w-8 rounded-sm', currentPage === index ? 'bg-[#FCC409]' : 'bg-[#DADADA]')}
              ></div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
