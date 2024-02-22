import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { ProcessType } from '@/service/webApi/course/type';
import { HiArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import LearningTrackCard from '../LearningTrackCard';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
  curTab: ProcessType;
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({
  list,
  curTab
}) => {
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Learning Tracks</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className={`w-full`}>
            <LearningTrackCard
              learningTrack={learningTrack}
              inProgress={curTab === ProcessType.IN_PROCESS}
            />
          </div>
        ))}
      </div>
      <Link className="flex" href={MenuLink.LEARNING_TRACK}>
        <div className="button-text-s mt-[16px] flex cursor-pointer items-center text-neutral-off-black">
          <span>EXPLORE</span>
          <HiArrowLongRight size={18}></HiArrowLongRight>
        </div>
      </Link>
    </div>
  );
};

export default LearningTrackList;
