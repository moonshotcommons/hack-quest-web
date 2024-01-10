import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import Image from 'next/image';
import React from 'react';
import CardProgress from '@/components/Web/Business/CardProgress';
import Button from '@/components/Common/Button';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Layout/Navbar/type';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';

interface LearningTrackCardInProgressProp {
  learningTrack: LearningTrackDetailType;
}

const LearningTrackCardInProgress: React.FC<
  LearningTrackCardInProgressProp
> = ({ learningTrack }) => {
  const { redirectToUrl } = useRedirect();

  const goLearningTrackDetail = () => {
    redirectToUrl(
      `${MenuLink.LEARNING_TRACK}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className="h-[228px] w-full p-[16px] flex flex-col justify-between cursor-pointer rounded-[16px] bg-[var(--neutral-white)] overflow-hidden hover:-translate-y-1 transition-all duration-300  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
      onClick={goLearningTrackDetail}
    >
      <div className="flex justify-between">
        <div className="h-[100px]  flex-1 flex-shrink-0 pr-[30px]">
          <div className="button-text-s w-fit mb-[16px] px-[10px] py-[4px] text-[var(--neutral-off-black)] border border-neutral-off-black rounded-[20px] ">
            {learningTrack.track}
          </div>
          <div className="text-h4 line-clamp-2 text-neutral-off-black">
            {learningTrack.name}
          </div>
        </div>
        <div className="w-[100px] h-[100px] relative">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <CardProgress progress={learningTrack.progress || 0} />
      <Button className="w-full h-[49px] bg-yellow-primary text-neutral-off-black">
        CONTINUE
      </Button>
    </div>
  );
};

export default LearningTrackCardInProgress;
