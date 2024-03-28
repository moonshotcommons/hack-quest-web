'use client';
import Image from 'next/image';
import { FC, useContext } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import TagsAndProgress from './TagsAndProgress';
import { LearningStatus, useGetLearningTrackLearnStatus } from '@/components/Web/DetailPageV2/hooks/useGetLearnStatus';
import { LearningTrackDetailContext } from '@/components/Web/DetailPageV2/Provider/LearningTrackDetailProvider';
import { LearningTrackStatusButton } from '@/components/Web/DetailPageV2/StatusButton';
interface LearningTrackDetailCardProps {
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackDetailCard: FC<LearningTrackDetailCardProps> = ({
  learningTrackDetail: propLearningTrackDetail
}) => {
  const {
    learningTrackDetail: contextLearningTrackDetail,
    learningCourse,
    refreshLearningTrackDetail
  } = useContext(LearningTrackDetailContext);
  const learningTrackDetail = contextLearningTrackDetail ?? propLearningTrackDetail;
  const learningStatus = useGetLearningTrackLearnStatus(learningTrackDetail);
  return (
    <div className="sticky left-full top-5 w-[380px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
      <div className="relative h-[212px] w-full overflow-hidden rounded-t-[16px]">
        <Image src={learningTrackDetail.image} alt={learningTrackDetail.name} fill className="object-contain"></Image>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="body-xl-bold flex items-center justify-between gap-6">
          <span>{learningTrackDetail.name}</span>
          {learningStatus === LearningStatus.COMPLETED && learningTrackDetail.certificationId && certificationIcon}
        </div>
        <div className="flex flex-col gap-4">
          <TagsAndProgress learningTrackDetail={learningTrackDetail} />
        </div>
        <LearningTrackStatusButton learningTrackDetail={learningTrackDetail} />
      </div>
    </div>
  );
};

export default LearningTrackDetailCard;

const certificationIcon = (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3458_27936)">
      <rect width="24" height="24" transform="translate(0 0.299805)" fill="white" />
      <path
        d="M12 15.2998C15.866 15.2998 19 12.1658 19 8.2998C19 4.43381 15.866 1.2998 12 1.2998C8.13401 1.2998 5 4.43381 5 8.2998C5 12.1658 8.13401 15.2998 12 15.2998Z"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.21 14.1897L7 23.2997L12 20.2997L17 23.2997L15.79 14.1797"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_3458_27936">
        <rect width="24" height="24" fill="white" transform="translate(0 0.299805)" />
      </clipPath>
    </defs>
  </svg>
);
