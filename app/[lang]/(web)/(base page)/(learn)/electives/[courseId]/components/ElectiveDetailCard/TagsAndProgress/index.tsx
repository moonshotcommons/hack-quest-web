'use client';
import { FC, useContext } from 'react';

import { CertificationCardContext } from '@/components/Web/Business/Certification/CertificationCard/CertificationCardProvider';
import { CourseDetailContext } from '@/components/Web/DetailPageV2/Provider/CourseDetailProvider';
import { LearningStatus, useGetCourseLearnStatus } from '@/components/Web/DetailPageV2/hooks/useGetLearnStatus';
import IconTextTag from '@/components/Web/DetailPageV2/CourseTag/IconTextTag';
import { IconTextTagType } from '@/components/Web/DetailPageV2/CourseTag/IconTextTag/constant';
import { ElectiveCourseDetailType } from '@/service/webApi/elective/type';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';
import { LangContext } from '@/components/Provider/Lang';

interface TagsAndProgressProps {
  courseDetail: ElectiveCourseDetailType;
}

const TagsAndProgress: FC<TagsAndProgressProps> = ({ courseDetail: propCourseDetail }) => {
  const { courseDetail: contextCourseDetail } = useContext(CourseDetailContext);
  const courseDetail = contextCourseDetail ?? propCourseDetail;
  let learningStatus = useGetCourseLearnStatus(courseDetail);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const progress = courseDetail?.progress || 0;

  // 没有证书显示tags列表
  if (learningStatus === LearningStatus.COMPLETED && !courseDetail.certificationId) {
    learningStatus = LearningStatus.UN_START;
  }

  const { certification } = useContext(CertificationCardContext);

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <>
          <IconTextTag
            type={IconTextTagType.LESSONS_COUNT}
            text={`${courseDetail.totalPages} ${t('electivesDetail.card.lessons')}`}
          ></IconTextTag>
          <IconTextTag type={IconTextTagType.DEVICE_ACCESS}></IconTextTag>
          {courseDetail.certificationId && <IconTextTag type={IconTextTagType.CERTIFICATION}></IconTextTag>}
        </>
      );
    case LearningStatus.IN_PROGRESS:
      return (
        <div className="mr-4 flex w-full items-center gap-2">
          <div className="relative h-[6px] flex-1 rounded-[3px] bg-neutral-off-white">
            <div
              className="absolute left-0 top-0 h-full rounded-[3px] bg-yellow-primary"
              style={{
                width: `${progress * 100}%`
              }}
            ></div>
          </div>
          <span className="body-s text-neutral-rich-gray">{Math.floor(progress * 100)}%</span>
        </div>
      );
    case LearningStatus.COMPLETED:
      // if (!certification?.claimed) {
      return <p className="body-m text-neutral-rich-gray">{t('electivesDetail.card.completedCourse')}</p>;
    // } else {
    //   return (
    //     <p className="body-m text-neutral-rich-gray">
    //       {t('electivesDetail.card.claimed', { chain: certification.name.replace(' Learning Track', '') })}
    //     </p>
    //   );
    // }
  }
};

export default TagsAndProgress;
