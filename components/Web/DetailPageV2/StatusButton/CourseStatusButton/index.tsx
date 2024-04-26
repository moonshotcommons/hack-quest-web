'use client';
import { FC, useContext } from 'react';
import { LearningStatus, useGetCourseLearnStatus } from '../../hooks/useGetLearnStatus';
import { CourseDetailType } from '@/service/webApi/course/type';
import Button from '@/components/Common/Button';

import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { CourseDetailContext } from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { useSearchParams } from 'next/navigation';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

interface CourseStatusButtonProps {
  courseDetail: CourseDetailType;
}

const CourseStatusButton: FC<CourseStatusButtonProps> = ({ courseDetail: propCourseDetail }) => {
  const { courseDetail: contextCourseDetail } = useContext(CourseDetailContext);
  const courseDetail = contextCourseDetail ?? propCourseDetail;
  const learningStatus = useGetCourseLearnStatus(courseDetail);

  const query = useSearchParams();
  const learningTrackId = query.get('learningTrackId');

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.BASIC);

  const { jumpLearningLesson } = useJumpLeaningLesson();

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <Button
          block
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            if (!learningTrackId) jumpLearningLesson(courseDetail);
            else {
              jumpLearningLesson(courseDetail, {
                menu: Menu.LEARNING_TRACK,
                idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
                ids: [learningTrackId, courseDetail.id]
              });
            }
          }}
        >
          {t('courses.startLearning')}
        </Button>
      );
    case LearningStatus.IN_PROGRESS:
      return (
        <Button
          block
          type="primary"
          className="button-text-l py-4 uppercase"
          onClick={() => {
            if (!learningTrackId) jumpLearningLesson(courseDetail);
            else {
              jumpLearningLesson(courseDetail, {
                menu: Menu.LEARNING_TRACK,
                idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
                ids: [learningTrackId, courseDetail.id]
              });
            }
          }}
        >
          {t('courses.continue')}
        </Button>
      );
    case LearningStatus.COMPLETED:
      return (
        <Button
          ghost
          icon={
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.800049" width="24" height="24" rx="12" fill="#00C365" />
              <path
                d="M18.9871 8.58632L10.3204 17.9197C10.1948 18.0551 10.0186 18.1324 9.83378 18.133C9.65658 18.134 9.48626 18.0644 9.36045 17.9397L6.02712 14.6063C5.7657 14.3449 5.7657 13.9211 6.02712 13.6597C6.28853 13.3982 6.71237 13.3982 6.97378 13.6597L9.83378 16.5063L18.0138 7.67966C18.1707 7.48617 18.4224 7.3963 18.6663 7.44664C18.9103 7.49698 19.1058 7.67913 19.1733 7.91892C19.2408 8.1587 19.169 8.41612 18.9871 8.58632Z"
                fill="white"
              />
            </svg>
          }
          block
          type="primary"
          className="button-text-l border-neutral-black py-4 uppercase"
          iconPosition="right"
        >
          {t('courses.completed')}
        </Button>
      );
  }
};

export default CourseStatusButton;
