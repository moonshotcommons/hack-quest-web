'use client';
import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CompleteStateType } from '@/service/webApi/course/type';
import { FC, useContext, useMemo } from 'react';
import { StatusButtonType } from '../type';
import {
  ElectiveCourseDetailType,
  PageType
} from '@/service/webApi/elective/type';
import { LessonContext } from '../../Provider/LessonProvider';
import { ElectiveDetailContext } from '../../Provider/ElectiveDetailProvider';

interface StatusButtonProps {
  courseDetail: ElectiveCourseDetailType;
  lesson: PageType;
  index: number;
}

const StatusButton: FC<
  StatusButtonProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
> = ({
  courseDetail: propCourseDetail,
  lesson: propLesson,
  index,
  ...rest
}) => {
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { lesson: contextLesson } = useContext(LessonContext);
  const { courseDetail: contextCourseDetail } = useContext(
    ElectiveDetailContext
  );
  const courseDetail = contextCourseDetail ?? propCourseDetail;
  const lesson = contextLesson ?? propLesson;

  const isLock = useMemo(() => {
    if (index === 0) return false;
    return (
      courseDetail.pages![index - 1].state !== CompleteStateType.COMPLETED ||
      lesson.state === undefined
    );
  }, [index, lesson, courseDetail]);

  const status = isLock
    ? StatusButtonType.LOCK
    : lesson.state === CompleteStateType.COMPLETED
      ? StatusButtonType.COMPLETED
      : lesson.state === CompleteStateType.NOT_STARTED
        ? StatusButtonType.START
        : StatusButtonType.RESUME;

  const learnHandle = () => {
    BurialPoint.track('electiveDetail-lesson按钮', {
      electiveName: courseDetail?.name || '',
      lessonName: lesson.name
    });
    courseDetail && jumpLearningLesson(courseDetail);
  };

  switch (status) {
    case StatusButtonType.LOCK:
      return (
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
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
          <span className="body-s-bold">Complete</span>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
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
          className="button-text-m w-[165px] py-4 uppercase text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
          {...rest}
          onClick={learnHandle}
        >
          Start
        </Button>
      );
    case StatusButtonType.RESUME:
      return (
        <Button
          loading={loading}
          disabled={loading}
          className="body-m w-[165px] cursor-pointer whitespace-nowrap rounded-[32px] border border-solid border-course-learning-button-border-color bg-course-learning-button-bg py-[11px] text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
          {...rest}
          onClick={learnHandle}
        >
          Resume
        </Button>
      );
    default:
      return null;
  }
};

export default StatusButton;
