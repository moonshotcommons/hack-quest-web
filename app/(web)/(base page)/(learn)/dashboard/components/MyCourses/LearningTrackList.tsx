import React, { useMemo, useState } from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import { ProcessType } from '@/service/webApi/course/type';
import LearningTrackCardInProgress from '../LearningTrackCardInProgress';
import { HiArrowLongRight } from 'react-icons/hi2';
import LearningTrackCard from '@/components/Web/Business/LearningTrackCard';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
  curTab: ProcessType;
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({
  list,
  curTab
}) => {
  const [isAll, setIsAll] = useState(false);
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
  const learnList = useMemo(() => {
    return isAll ? list : list.slice(0, 2);
  }, [isAll, list]);
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="text-h4 text-neutral-off-black">Learning Tracks</h3>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {learnList.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            {card(learningTrack)}
          </div>
        ))}
      </div>
      {!isAll && list.length > 2 && (
        <div className="flex">
          <div
            className="flex text-neutral-off-black button-text-s items-center mt-[16px] cursor-pointer"
            onClick={() => setIsAll(true)}
          >
            <span>EXPLORE</span>
            <HiArrowLongRight size={18}></HiArrowLongRight>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningTrackList;
