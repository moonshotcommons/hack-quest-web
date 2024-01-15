import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { ProcessType } from '@/service/webApi/course/type';
import LearningTrackCardInProgress from '../LearningTrackCardInProgress';
import { HiArrowLongRight } from 'react-icons/hi2';
import LearningTrackCard from '@/components/Web/Business/LearningTrackCard';
import Link from 'next/link';
import { MenuLink } from '@/components/Layout/Navbar/type';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
  curTab: ProcessType;
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({
  list,
  curTab
}) => {
  const card = (learningTrack: LearningTrackDetailType) => {
    switch (curTab) {
      case ProcessType.IN_PROCESS:
        return <LearningTrackCardInProgress learningTrack={learningTrack} />;
      case ProcessType.COMPLETED:
        return (
          <LearningTrackCard
            learningTrack={learningTrack}
            from="dashboard"
            className="p-[16px] h-[200px]"
          />
        );
    }
  };
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Learning Tracks</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            {card(learningTrack)}
          </div>
        ))}
      </div>
      <Link className="flex" href={MenuLink.LEARNING_TRACK}>
        <div className="flex text-neutral-off-black button-text-s items-center mt-[16px] cursor-pointer">
          <span>EXPLORE</span>
          <HiArrowLongRight size={18}></HiArrowLongRight>
        </div>
      </Link>
    </div>
  );
};

export default LearningTrackList;
