import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React from 'react';
import CourseTags from '@/components/Web/Business/CourseTags';
import { useRedirect } from '@/hooks/router/useRedirect';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import TrackTag from '@/components/Common/TrackTag';
import CompletedIcon from '@/components/Common/Icon/Completed';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  from?: 'dashboard' | 'learningTrack';
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack,
  isLandingPage,
  from = 'learningTrack'
}) => {
  const { redirectToUrl } = useRedirect();

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(`${MenuLink.LEARNING_TRACK}/${learningTrack.id}`);
  };

  return (
    <Link
      href={`${MenuLink.LEARNING_TRACK}/${learningTrack.id}`}
      className={
        'card-hover relative flex  h-[207px] w-full items-center gap-[30px] overflow-hidden rounded-[16px] bg-neutral-white p-[16px]'
      }
      // onClick={goLearningTrackDetail}
    >
      {from === 'dashboard' && learningTrack.progress && learningTrack.progress >= 1 ? (
        <div className={`absolute  right-[16px] top-[16px] z-[10]`}>
          <CompletedIcon />
        </div>
      ) : null}
      <div className="flex h-full flex-1 flex-shrink-0 flex-col justify-between">
        <TrackTag track={learningTrack.track} />
        <div className="body-m-bold line-clamp-1 text-neutral-off-black">{learningTrack.name}</div>
        <div className="body-s line-clamp-3 h-[66px]  text-neutral-medium-gray">{learningTrack.description}</div>
        <div>
          <CourseTags
            language={learningTrack.language}
            level={learningTrack?.level as string}
            unitCount={learningTrack?.courseCount}
            type={'learning-track'}
          ></CourseTags>
        </div>
      </div>
      <div className={`relative  h-[160px] w-[160px]`}>
        <Image
          src={learningTrack.image || LearningTrackImg}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
    </Link>
  );
};

export default LearningTrackCard;
