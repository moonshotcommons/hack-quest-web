import Image from 'next/image';
import { FC } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackStatusButton from '../../StatusButton/LearningTrackStatusButton';
import TagAndProgress from '../TagsAndProgress';
interface LearningTrackDetailCardProps {
  learningTrackDetail: LearningTrackDetailType;
}

const LearningTrackDetailCard: FC<LearningTrackDetailCardProps> = ({ learningTrackDetail }) => {
  return (
    <div className="sticky left-full top-5 w-[380px] rounded-[16px] border border-neutral-light-gray bg-neutral-white">
      <div className="relative h-[212px] w-full overflow-hidden rounded-t-[16px]">
        <Image src={learningTrackDetail.image} alt={learningTrackDetail.name} fill className="object-contain"></Image>
      </div>
      <div className="flex flex-col gap-6 p-6">
        <p className="body-xl-bold">{learningTrackDetail.name}</p>
        <div className="flex flex-col gap-4">
          <TagAndProgress learningTrackDetail={learningTrackDetail} />
        </div>
        <LearningTrackStatusButton learningTrackDetail={learningTrackDetail} />
      </div>
    </div>
  );
};

export default LearningTrackDetailCard;
