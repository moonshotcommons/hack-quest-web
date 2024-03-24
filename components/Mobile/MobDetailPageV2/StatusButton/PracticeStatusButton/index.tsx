'use client';
import { FC, useContext } from 'react';
import {
  LearningStatus,
  useGetCourseLearnStatus
} from '../../hooks/useGetLearnStatus';
import { CourseDetailType } from '@/service/webApi/course/type';
import Button from '@/components/Common/Button';
import { PracticeDetailContext } from '../../Provider/PracticeDetailProvider';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';

interface PracticeStatusButtonProps {
  courseDetail: CourseDetailType;
}

const PracticeStatusButton: FC<PracticeStatusButtonProps> = ({
  courseDetail: propCourseDetail
}) => {
  const { courseDetail: contextCourseDetail } = useContext(
    PracticeDetailContext
  );
  const courseDetail = contextCourseDetail ?? propCourseDetail;
  const learningStatus = useGetCourseLearnStatus(courseDetail);

  const { jumpLearningLesson } = useJumpLeaningLesson();

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <Button
          block
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            jumpLearningLesson(courseDetail);
          }}
        >
          Start
        </Button>
      );
    case LearningStatus.IN_PROGRESS:
      return (
        <Button
          block
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            jumpLearningLesson(courseDetail);
          }}
        >
          Continue
        </Button>
      );
    case LearningStatus.COMPLETED:
      return (
        <Button
          ghost
          icon={
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="0.5"
                y="0.800049"
                width="24"
                height="24"
                rx="12"
                fill="#00C365"
              />
              <path
                d="M18.9871 8.58632L10.3204 17.9197C10.1948 18.0551 10.0186 18.1324 9.83378 18.133C9.65658 18.134 9.48626 18.0644 9.36045 17.9397L6.02712 14.6063C5.7657 14.3449 5.7657 13.9211 6.02712 13.6597C6.28853 13.3982 6.71237 13.3982 6.97378 13.6597L9.83378 16.5063L18.0138 7.67966C18.1707 7.48617 18.4224 7.3963 18.6663 7.44664C18.9103 7.49698 19.1058 7.67913 19.1733 7.91892C19.2408 8.1587 19.169 8.41612 18.9871 8.58632Z"
                fill="white"
              />
            </svg>
          }
          block
          type="primary"
          className="button-text-l border-neutral-black bg-neutral-white py-4 uppercase"
          iconPosition="right"
        >
          COMPLETED
        </Button>
      );
  }
};

export default PracticeStatusButton;
