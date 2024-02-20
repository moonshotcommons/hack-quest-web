'use client';
import { FC, useContext } from 'react';
import IconTextTag from '../../CourseTag/IconTextTag';
import { IconTextTagType } from '../../CourseTag/IconTextTag/constant';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { LearningTrackDetailContext } from '../../Provider/LearningTrackDetailProvider';
import {
  LearningStatus,
  useGetLearningTrackLearnStatus
} from '../../hooks/useGetLearnStatus';

interface TagAndProgressProps {
  learningTrackDetail: LearningTrackDetailType;
}

const TagAndProgress: FC<TagAndProgressProps> = ({
  learningTrackDetail: propLearningTrackDetail
}) => {
  const { learningTrackDetail: contextLearningTrackDetail } = useContext(
    LearningTrackDetailContext
  );
  const learningTrackDetail =
    contextLearningTrackDetail ?? propLearningTrackDetail;
  const learningStatus = useGetLearningTrackLearnStatus(learningTrackDetail);

  const enrolled = learningTrackDetail.enrolled;
  const progress = learningTrackDetail?.progress || 0;

  switch (learningStatus) {
    case LearningStatus.UN_START:
      return (
        <>
          <IconTextTag
            type={IconTextTagType.COURSES_COUNT}
            text={`${learningTrackDetail.courseCount} courses`}
          ></IconTextTag>
          <IconTextTag
            type={IconTextTagType.VIDEO_COUNT}
            text={`7.5 hours video`}
          ></IconTextTag>
          <IconTextTag type={IconTextTagType.DEVICE_ACCESS}></IconTextTag>
          {learningTrackDetail.certificationId && (
            <IconTextTag type={IconTextTagType.CERTIFICATION}></IconTextTag>
          )}
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
          <span className="body-s text-neutral-rich-gray">
            {Math.floor(progress * 100)}%
          </span>
        </div>
      );
    case LearningStatus.COMPLETED:
      //!TODO 要分学完可以获取证书和已经获取证书
      return (
        <p className="body-m text-neutral-rich-gray">
          Congratulation! You’ve completed all the courses. Claim your Web3
          certification 🎉
        </p>
      );
  }
};

export default TagAndProgress;
