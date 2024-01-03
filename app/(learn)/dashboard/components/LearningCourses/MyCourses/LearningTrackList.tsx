import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackCard from '@/components/v2/Business/LearningTrackCardNew';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({ list }) => {
  if (!list?.length) return null;
  return (
    <div>
      <h3 className="font-next-poster-Bold text-[21px] tracking-[1.26px] text-[#131313]">
        Learning Tracks
      </h3>
      <div className="mt-6 flex flex-wrap gap-[24px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            <LearningTrackCard learningTrack={learningTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningTrackList;
