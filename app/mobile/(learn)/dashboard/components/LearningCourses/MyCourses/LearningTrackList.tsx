import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackLandingCard from '@/components/Web/Business/LearningTrackCardNew';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({ list }) => {
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="font-next-poster-Bold text-[21px] tracking-[1.26px] text-[#131313]">
        Learning Track
      </h3>
      <div className="mt-6 flex flex-col gap-[24px]">
        {list.map((learningTrack) => (
          <LearningTrackLandingCard
            key={learningTrack.id}
            learningTrack={learningTrack}
          />
        ))}
      </div>
    </div>
  );
};

export default LearningTrackList;
