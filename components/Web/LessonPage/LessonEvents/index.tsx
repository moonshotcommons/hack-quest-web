import { BurialPoint } from '@/helper/burialPoint';
import { useUnitNavList } from '@/hooks/useUnitNavList';
import ArrowBottom from '@/public/images/lesson/arrow_bottom.svg';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import LessonList from './LessonList';
import { LessonPageContext } from '../type';
import { useCourseStore } from '@/store/zustand/courseStore';

interface LessonEventsProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isPreview?: boolean;
}

const PreviewLessonEvent = () => {
  return (
    <div
      className={`relative z-10 mb-[30px] text-lesson-preview-color ${
        false ? 'w-[322px] shadow-2xl' : 'w-fit'
      }`}
      tabIndex={1}
    >
      <div className="absolute left-0 top-0 mr-[15px] h-[70px] w-[5px] rounded-[5px] bg-lesson-events-left-border-bg"></div>
      <div
        className={`flex h-[70px] w-full cursor-pointer items-center rounded-t-[5px] ${
          false ? ' bg-lesson-events-toggle-bg' : ''
        }`}
      >
        <div className="flex-1 px-5">
          <div className="flex items-center justify-between">
            <span className="text-h3 mr-[7px]">Event</span>
            <Image
              src={ArrowBottom}
              alt="arrow-bottom"
              width={16}
              height={8}
              className={false ? 'rotate-180' : ''}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonEvents: React.FC<LessonEventsProps> = (props) => {
  const { lesson, courseType, isPreview = false } = props;

  const {
    unitNavList = [],
    refreshNavList,
    currentUnitIndex
  } = useUnitNavList(lesson);
  const { setNavbarData } = useContext(LessonPageContext);
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);
  const [isToggle, setIsToggle] = useState(false);
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const [headerTextWidth, setHeaderTextWidth] = useState(0);
  const initHeaderTextWidth = () => {
    const width = eventsRef.current?.clientWidth || 0;
    const textWidth = width < 322 ? 322 : width;
    setHeaderTextWidth(textWidth);
  };
  useEffect(() => {
    refreshNavList();
    initHeaderTextWidth();
  }, [lesson]);

  useEffect(() => {
    const unitName = unitNavList[currentUnitIndex]?.name;
    const navbarData = [
      {
        label: learnPageTitle
      },
      {
        label: unitName
      },
      {
        label: lesson?.name
      }
    ];
    unitName && setNavbarData([...navbarData]);
  }, [unitNavList]);
  if (isPreview) return <PreviewLessonEvent></PreviewLessonEvent>;
  return (
    <div
      className={`relative z-10 mb-[30px] text-lesson-preview-color ${
        isToggle ? 'shadow-2xl' : 'w-fit'
      }`}
      style={
        isToggle
          ? {
              width: `${headerTextWidth}px`
            }
          : {}
      }
      tabIndex={1}
      ref={eventsRef}
      onBlur={() => setIsToggle(false)}
    >
      <div className="absolute left-0 top-0 mr-[15px] h-[70px] w-[5px] rounded-[5px] bg-lesson-events-left-border-bg"></div>
      <div
        className={`flex h-[70px] w-full cursor-pointer items-center rounded-t-[5px] ${
          isToggle ? ' bg-lesson-events-toggle-bg' : ''
        }`}
        onClick={() => {
          if (!isToggle) {
            BurialPoint.track('lesson-lesson dropdown点击');
          }
          setIsToggle(!isToggle);
        }}
      >
        <div className="flex-1 px-5">
          <div className="flex items-center justify-between">
            <span className="text-h3 mr-[7px]">{lesson?.name}</span>
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
        <div className="z-100 absolute left-0 top-[70px] w-full overflow-auto rounded-b-[5px] bg-lesson-events-toggle-list-bg shadow-2xl">
          <LessonList
            unitData={unitNavList}
            lesson={lesson}
            courseType={courseType}
            changeToggle={(toggle) => setIsToggle(toggle)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default LessonEvents;
