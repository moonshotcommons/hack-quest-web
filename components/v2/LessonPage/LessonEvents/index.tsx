import React, { useEffect, useRef, useState } from 'react';
import ArrowBottom from '@/public/images/lesson/arrow_bottom.svg';
import Image from 'next/image';
import UnitList from './UnitList';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import { useUnitNavList } from '@/hooks/useUnitNavList';

interface LessonEventsProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isPreview?: boolean;
}

const PreviewLessonEvent = () => {
  return (
    <div
      className={`mb-[30px] text-lesson-preview-color relative z-10 ${
        false ? 'w-[322px] shadow-2xl' : 'w-fit'
      }`}
      tabIndex={1}
    >
      <div className="absolute left-0 top-0 w-[5px] h-[70px] rounded-[5px] bg-lesson-events-left-border-bg mr-[15px]"></div>
      <div
        className={`w-full flex items-center h-[70px] rounded-t-[5px] cursor-pointer ${
          false ? ' bg-lesson-events-toggle-bg' : ''
        }`}
      >
        <div className="flex-1 px-5">
          <div className="flex items-center justify-between">
            <span className="font-next-poster-Bold text-[28px] mr-[7px] tracking-[1.68px] leading-[28px]">
              Event
            </span>
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

  const { unitNavList = [], refreshNavList } = useUnitNavList(lesson);

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
  if (isPreview) return <PreviewLessonEvent></PreviewLessonEvent>;
  return (
    <div
      className={`mb-[30px] text-lesson-preview-color relative z-10 ${
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
        <div className="absolute z-100 left-0 top-[70px] w-full overflow-auto bg-lesson-events-toggle-list-bg rounded-b-[5px] shadow-2xl">
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
