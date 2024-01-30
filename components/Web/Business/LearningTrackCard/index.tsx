import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import TrackTag from '@/components/Common/TrackTag';
import CompletedIcon from '@/components/Common/Icon/Completed';
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  className?: string;
  from?: 'dashboard' | 'learningTrack';
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack,
  isLandingPage,
  className,
  from = 'learningTrack'
}) => {
  const { redirectToUrl } = useRedirect();

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(
      `${menuLink.learningTrack}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className={
        'h-[207px] w-full relative  p-[16px] rounded-[16px] bg-neutral-white overflow-hidden flex items-center gap-[30px] card-hover'
      }
      onClick={goLearningTrackDetail}
    >
      {from === 'dashboard' &&
      learningTrack.progress &&
      learningTrack.progress >= 1 ? (
        <div className={`absolute  right-[16px] top-[16px]`}>
          <CompletedIcon />
        </div>
      ) : null}

      <div className="flex-1 h-full flex flex-col flex-shrink-0 justify-between">
        <TrackTag track={learningTrack.track} />
        <div className="body-m-bold line-clamp-1 text-neutral-off-black">
          {learningTrack.name}
        </div>
        <div className="body-s h-[66px] text-neutral-medium-gray  line-clamp-3">
          {learningTrack.description}
        </div>
        <div>
          <CourseTags
            language={learningTrack.language}
            level={learningTrack?.level as string}
            unitCount={learningTrack?.courseCount}
            type={'learning-track'}
          ></CourseTags>
        </div>
      </div>
      <div className={`relative  w-[160px] h-[160px]`}>
        <Image
          src={learningTrack.image || LearningTrackImg}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};

export default LearningTrackCard;
