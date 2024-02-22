'use client';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { FC, useContext } from 'react';
import { LearningTrackDetailContext } from '../../Provider/LearningTrackDetailProvider';
import {
  LearningStatus,
  useGetLearningTrackLearnStatus
} from '../../hooks/useGetLearnStatus';
import Button from '@/components/Common/Button';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { useEnrollUnEnroll } from '@/hooks/useLearningTrackHooks/useEnrollUnEnroll';

interface LearningTrackStatusButtonProps {
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackStatusButton: FC<LearningTrackStatusButtonProps> = ({
  learningTrackDetail: propLearningTrackDetail
}) => {
  const {
    learningTrackDetail: contextLearningTrackDetail,
    learningCourse,
    refreshLearningTrackDetail
  } = useContext(LearningTrackDetailContext);
  const learningTrackDetail =
    contextLearningTrackDetail ?? propLearningTrackDetail;

  const learningStatus = useGetLearningTrackLearnStatus(learningTrackDetail);
  const { jumpLearningLesson, loading: resumeLoading } = useJumpLeaningLesson();

  const { enroll, enrollLoading, unEnroll } = useEnrollUnEnroll(
    learningTrackDetail,
    refreshLearningTrackDetail
  );

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <Button
          block
          loading={enrollLoading}
          disabled={enrollLoading}
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            enroll();
          }}
        >
          Enroll Track
        </Button>
      );
    case LearningStatus.IN_PROGRESS:
      return (
        <Button
          block
          loading={resumeLoading}
          disabled={resumeLoading}
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            if (learningTrackDetail && learningCourse) {
              jumpLearningLesson(learningCourse, {
                menu: Menu.LEARNING_TRACK,
                idTypes: [
                  QueryIdType.LEARNING_TRACK_ID,
                  QueryIdType.MENU_COURSE_ID
                ],
                ids: [learningTrackDetail.id, learningCourse.id]
              });
            }
          }}
        >
          Continue
        </Button>
      );
    case LearningStatus.COMPLETED:
      //!TODO 要分学完可以获取证书和已经获取证书
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

export default LearningTrackStatusButton;
