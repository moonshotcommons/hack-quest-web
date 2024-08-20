import { BurialPoint } from '@/helper/burialPoint';
import { useUnitNavList } from '@/hooks/courses/useUnitNavList';
import ArrowBottom from '@/public/images/lesson/arrow_bottom.svg';
import { CourseLessonType, CourseType } from '@/service/webApi/course/type';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import LessonList from './LessonList';
import { LessonPageContext } from '../type';
import { useCourseStore } from '@/store/zustand/courseStore';
import AITriggerButton from '../../AI/AITriggerButton';
import { HelperType } from '@/service/webApi/helper/type';

interface LessonEventsProps {
  lesson: CourseLessonType;
  courseType: CourseType;
  isPreview?: boolean;
}

const PreviewLessonEvent = () => {
  return (
    <div
      className={`relative z-10 mb-[30px] text-lesson-preview-color ${false ? 'w-[322px] shadow-2xl' : 'w-fit'}`}
      tabIndex={1}
    >
      <div className="absolute left-0 top-0 mr-[15px] h-[70px] w-[5px] rounded-[5px] bg-lesson-events-left-border-bg"></div>
      <div
        className={`flex h-[70px] w-full cursor-pointer items-center rounded-t-[5px] ${false ? ' bg-lesson-events-toggle-bg' : ''}`}
      >
        <div className="flex-1 px-5">
          <div className="flex items-center justify-between">
            <span className="text-h3 mr-[7px]">Event</span>
            <Image src={ArrowBottom} alt="arrow-bottom" width={16} height={8} className={false ? 'rotate-180' : ''} />
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonEvents: React.FC<LessonEventsProps> = (props) => {
  const { lesson, courseType, isPreview = false } = props;

  const { unitNavList = [], refreshNavList, currentUnitIndex } = useUnitNavList(lesson);
  const { setNavbarData } = useContext(LessonPageContext);
  const learnPageTitle = useCourseStore((state) => state.learnPageTitle);
  const [isToggle, setIsToggle] = useState(false);
  const eventsRef = useRef<HTMLDivElement | null>(null);
  const isCanBlur = useRef(true);
  useEffect(() => {
    refreshNavList();
  }, [lesson]);

  useEffect(() => {
    const unitName = unitNavList[currentUnitIndex]?.title;
    const navbarData = [
      {
        label: learnPageTitle
      },
      {
        label: unitName
      },
      {
        label: lesson?.title
      }
    ];
    unitName && setNavbarData([...navbarData]);
  }, [unitNavList]);
  if (isPreview) return <PreviewLessonEvent></PreviewLessonEvent>;
  return (
    <div
      className="relative mb-[30px] flex items-center gap-2"
      tabIndex={0}
      ref={eventsRef}
      onBlur={(e) => {
        setTimeout(() => {
          // if (!isCanBlur.current) return;
          // setIsToggle(false);
          console.info(111);
        }, 100);
      }}
    >
      <div
        className={`relative z-10 w-fit min-w-[322px] text-lesson-preview-color ${isToggle ? 'shadow-2xl' : ''}`}
        onClick={(e) => {
          // isCanBlur.current = false;
          // setTimeout(() => {
          //   isCanBlur.current = true;
          // }, 300);
        }}
      >
        <div className="absolute left-0 top-0 mr-[15px] h-[72px] w-[5px] rounded-[5px] bg-lesson-events-left-border-bg"></div>
        <div
          className={`flex h-[72px] w-full cursor-pointer items-center rounded-t-[5px] ${isToggle ? ' bg-lesson-events-toggle-bg' : ''}`}
          onClick={() => {
            if (!isToggle) {
              BurialPoint.track('lesson-lesson dropdown点击');
            }
            setIsToggle(!isToggle);
          }}
        >
          <div className="flex-1 px-5">
            <div className="flex items-center justify-between">
              <span className="text-h3 mr-[7px]">{lesson?.title}</span>
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
        {true ? (
          <div className="z-100 absolute left-0 top-[70px] h-[500px] w-full overflow-auto rounded-b-[5px] bg-lesson-events-toggle-list-bg shadow-2xl">
            <LessonList
              unitData={unitNavList}
              lesson={lesson}
              courseType={courseType}
              changeToggle={(toggle) => setIsToggle(toggle)}
            />
          </div>
        ) : null}
      </div>
      <AITriggerButton triggerType={HelperType.SummarizeContent} onlyIcon>
        Summarize
      </AITriggerButton>
    </div>
  );
};

export default LessonEvents;
