'use client';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { CourseDetailType, CourseUnitType } from '@/service/webApi/course/type';
import { FC, useContext, useMemo } from 'react';
import { StatusButtonType } from '@/components/Web/DetailPageV2/StatusButton/type';
import { UnitContext } from '../../Provider/UnitProvider';
import { CourseDetailContext } from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { useSearchParams } from 'next/navigation';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

interface UnitStatusButtonProps {
  courseDetail: CourseDetailType;
  unit: CourseUnitType;
  index: number;
}

const UnitStatusButton: FC<
  UnitStatusButtonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
> = ({ courseDetail: propCourseDetail, unit: propUnit, index, ...rest }) => {
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { unit: contextUnit } = useContext(UnitContext);
  const { courseDetail: contextCourseDetail } = useContext(CourseDetailContext);
  const courseDetail = (contextCourseDetail ?? propCourseDetail) as CourseDetailType;
  const unit = contextUnit ?? propUnit;

  const query = useSearchParams();
  const learningTrackId = query.get('learningTrackId');

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const isLock = useMemo(() => {
    if (index === 0) return false;
    return courseDetail.units![index - 1].progress < 1 || unit.progress === undefined;
  }, [index, unit, courseDetail]);

  const status = isLock
    ? StatusButtonType.LOCK
    : unit.progress === 1
      ? StatusButtonType.COMPLETED
      : !unit.progress
        ? StatusButtonType.START
        : StatusButtonType.RESUME;

  const learnHandle = () => {
    BurialPoint.track('courseDetail-unit按钮', {
      courseName: courseDetail?.title || '',
      unitName: unit.title
    });

    if (courseDetail) {
      if (!learningTrackId) jumpLearningLesson(courseDetail);
      else {
        jumpLearningLesson(courseDetail, {
          menu: Menu.LEARNING_TRACK,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID, QueryIdType.DOCUMENTATION_ID],
          ids: [learningTrackId, courseDetail.id, courseDetail.documentationId!]
        });
      }
    }
  };

  switch (status) {
    case StatusButtonType.LOCK:
      return (
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19 11.5V9.5C19 5.63401 15.866 2.5 12 2.5C8.13401 2.5 5 5.63401 5 9.5V11.5C3.34315 11.5 2 12.8431 2 14.5V19.5C2 21.1569 3.34315 22.5 5 22.5H19C20.6569 22.5 22 21.1569 22 19.5V14.5C22 12.8431 20.6569 11.5 19 11.5ZM7 9.5C7 6.73858 9.23858 4.5 12 4.5C14.7614 4.5 17 6.73858 17 9.5V11.5H7V9.5ZM19 20.5C19.5523 20.5 20 20.0523 20 19.5V14.5C20 13.9477 19.5523 13.5 19 13.5H5C4.44772 13.5 4 13.9477 4 14.5V19.5C4 20.0523 4.44772 20.5 5 20.5H19Z"
            fill="#8C8C8C"
          />
        </svg>
      );

    case StatusButtonType.COMPLETED:
      return (
        <div className="flex items-center gap-3">
          <span className="body-s-bold capitalize">{t('courses.completed')}</span>
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect y="0.5" width="24" height="24" rx="12" fill="#00C365" />
            <path
              d="M18.4871 8.28628L9.82045 17.6196C9.6948 17.7551 9.51856 17.8323 9.33378 17.8329C9.15658 17.834 8.98626 17.7644 8.86045 17.6396L5.52712 14.3063C5.2657 14.0449 5.2657 13.621 5.52712 13.3596C5.78853 13.0982 6.21237 13.0982 6.47378 13.3596L9.33378 16.2063L17.5138 7.37961C17.6707 7.18612 17.9224 7.09625 18.1663 7.14659C18.4103 7.19693 18.6058 7.37908 18.6733 7.61887C18.7408 7.85866 18.669 8.11607 18.4871 8.28628Z"
              fill="white"
            />
          </svg>
        </div>
      );
    case StatusButtonType.START:
      return (
        <Button
          loading={loading}
          disabled={loading}
          type="primary"
          className="button-text-s w-[140px] py-4 uppercase text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
          {...rest}
          onClick={learnHandle}
        >
          {t('courses.start')}
        </Button>
      );
    case StatusButtonType.RESUME:
      return (
        <div className="flex w-full items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="relative h-[6px] w-[120px] max-w-[7.5rem] rounded-[3px] bg-neutral-off-white">
              <div
                className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary"
                style={{
                  width: `${unit.progress * 100}%`
                }}
              ></div>
            </div>
            <span className="caption-10pt text-neutral-rich-gray">{Math.floor(unit.progress * 100)}%</span>
          </div>
          <Button
            loading={loading}
            disabled={loading}
            className="button-text-s w-[140px] cursor-pointer whitespace-nowrap rounded-[32px] border border-solid border-course-learning-button-border-color bg-course-learning-button-bg py-[11px] text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
            {...rest}
            onClick={learnHandle}
          >
            Continue
          </Button>
        </div>
      );
    default:
      return null;
  }
};

export default UnitStatusButton;
