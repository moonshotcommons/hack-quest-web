import React, { useEffect, useState } from 'react';
import ArrowBottom from '@/public/images/lesson/arrow_bottom.svg';
import Image from 'next/image';
import UnitList from './UnitList';
import {
  CompleteStateType,
  CourseLessonType,
  CourseType,
  UnitPagesListType
} from '@/service/webApi/course/type';
import { useDispatch } from 'react-redux';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { setUnitsLessonsList } from '@/store/redux/modules/course';
import { useUnitNavList } from '@/hooks/useUnitNavList';

interface LessonEventsProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  // unitData: UnitPagesListType[];
}

const formateDropdownData = (
  data: UnitPagesListType[],
  lesson: CourseLessonType
) => {
  let currentUnitIndex = data.findIndex((unit) => unit.id === lesson.unitId);
  let currentLessonIndex = data[currentUnitIndex].pages.findIndex(
    (page) => page.id === lesson.id
  );
  const newData: UnitPagesListType[] = data.map((unit, index) => {
    return {
      ...unit,
      disable: index > currentUnitIndex,
      pages: unit.pages.map((page, pageIndex) => {
        return {
          ...page,
          disable:
            page.state === CompleteStateType.NOT_STARTED &&
            currentLessonIndex !== pageIndex
        };
      })
    };
  });

  return {
    newData,
    currentUnitIndex
  };
};

const LessonEvents: React.FC<LessonEventsProps> = (props) => {
  const { lesson, courseType } = props;

  const { unitNavList = [], currentUnitIndex } = useUnitNavList(lesson);

  const [isToggle, setIsToggle] = useState(false);
  return (
    <div
      className={`mb-[30px] text-lesson-preview-color relative z-10 ${
        isToggle ? 'w-[322px] shadow-2xl' : 'w-[121px]'
      }`}
      tabIndex={1}
      onBlur={() => setIsToggle(false)}
    >
      <div className="absolute left-0 top-0 w-[5px] h-[70px] rounded-[5px] bg-lesson-events-left-border-bg mr-[15px]"></div>
      <div
        className={`w-full flex items-center h-[70px] rounded-t-[5px] cursor-pointer ${
          isToggle ? ' bg-lesson-events-toggle-bg' : ''
        }`}
        onClick={() => setIsToggle(!isToggle)}
      >
        <div className="flex-1 px-5">
          <div className="flex items-center justify-between">
            <span className="font-next-poster-Bold text-[28px] mr-[7px] tracking-[1.68px] leading-[28px]">
              {lesson?.name}
            </span>
            <Image
              src={ArrowBottom}
              alt="arrow-bottom"
              width={16}
              height={8}
              className={isToggle ? 'rotate-180' : ''}
            />
          </div>
        </div>
      </div>
      {isToggle ? (
        <div className="absolute z-100 left-0 top-[70px] w-full h-[530px] overflow-auto bg-lesson-events-toggle-list-bg rounded-b-[5px] shadow-2xl">
          <UnitList
            unitData={unitNavList}
            lesson={lesson}
            courseType={courseType}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LessonEvents;
