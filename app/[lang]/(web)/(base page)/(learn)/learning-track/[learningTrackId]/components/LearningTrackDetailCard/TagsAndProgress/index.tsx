'use client';
import { FC, useContext } from 'react';

import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';

import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import { LearningStatus, useGetLearningTrackLearnStatus } from '@/components/Web/DetailPageV2/hooks/useGetLearnStatus';
import IconTextTag from '@/components/Web/DetailPageV2/CourseTag/IconTextTag';
import { IconTextTagType } from '@/components/Web/DetailPageV2/CourseTag/IconTextTag/constant';
import { LangContext } from '@/components/Provider/Lang';
import { TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface TagsAndProgressProps {
  learningTrackDetail: LearningTrackDetailType;
}

const TagsAndProgress: FC<TagsAndProgressProps> = ({ learningTrackDetail: propLearningTrackDetail }) => {
  const { learningTrackDetail: contextLearningTrackDetail } = useContext(LearningTrackDetailContext);
  const learningTrackDetail = contextLearningTrackDetail ?? propLearningTrackDetail;
  let learningStatus = useGetLearningTrackLearnStatus(learningTrackDetail);

  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.LEARN);

  const progress = learningTrackDetail?.progress || 0;

  if (learningStatus === LearningStatus.COMPLETED && !learningTrackDetail.certificationId) {
    learningStatus = LearningStatus.UN_START;
  }

  // const { certification } = useContext(CertificationCardContext);

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <>
          <IconTextTag
            type={IconTextTagType.COURSES_COUNT}
            text={`${learningTrackDetail.courseCount} ${t('learningTrackDetail.card.courses')}`}
          ></IconTextTag>
          <IconTextTag type={IconTextTagType.DEVICE_ACCESS}></IconTextTag>
          {/* {learningTrackDetail.certificationId && <IconTextTag type={IconTextTagType.CERTIFICATION}></IconTextTag>} */}
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
      return <p className="body-m text-neutral-rich-gray">{t('learningTrackDetail.card.completedCourse')}</p>;
    // } else {
    //   return (
    //     <p className="body-m text-neutral-rich-gray">
    //       {t('learningTrackDetail.card.claimed', { chain: certification.name.replace(' Learning Track', '') })}
    //     </p>
    //   );
    // }
  }
};

export default TagsAndProgress;
