import React, { ReactNode, useEffect, useMemo, useState } from 'react';

import { ChangeState, ScrollContainer, ScrollControl } from '@/components/Common/ScrollContainer';

import { cn } from '@/helper/utils';
import CourseCardSkeleton from '@/components/Web/Business/CourseCardSkeleton';

interface CardSliderType<T> {
  list: T[];
  title: string | ReactNode;
  loading?: boolean;
  renderItem: (item: any) => ReactNode;
  itemCount?: number;
}
function CardSlider<T>({
  list,
  // curTab,
  loading = false,
  title,
  renderItem,
  itemCount = 4
}: CardSliderType<T>) {
  const p = {
    inProgress: false,
    inCompleted: false
  };
  const [progress, setProgress] = useState(p);
  const [currentPage, setCurrentPage] = useState(0);
  const [scrollContainerState, setScrollContainerState] = useState<ChangeState>();

  const courseGroupList = useMemo(() => {
    if (!list?.length) return [];
    const groupList: T[][] = [];
    let group: T[] = [];
    list.forEach((item, index) => {
      group.push(item);
      if (group.length === itemCount) {
        groupList.push(group);
        group = [];
      }
      if (index === list.length - 1 && group.length) groupList.push(group);
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

  if (!list?.length && !loading) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
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
      <ScrollContainer onChange={(state: any) => setScrollContainerState(state)} gap={20} className="w-full py-8">
        <div className="flex gap-[20px]">
          <CourseCardSkeleton.List active={loading} itemWidth={`w-[calc((1360px-60px)/${itemCount})]`}>
            {courseGroupList.map((item, index) => {
              return (
                <div key={index} className="flex w-[1360px] gap-[20px] p-[2px]">
                  {item.map((course) => {
                    return renderItem(course);
                  })}
                </div>
              );
            })}
          </CourseCardSkeleton.List>
        </div>
      </ScrollContainer>
      {courseGroupList.length > 1 && (
        <div className="flex items-center justify-center gap-[10px]">
          {courseGroupList.map((item, index) => {
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
}

export default CardSlider;
