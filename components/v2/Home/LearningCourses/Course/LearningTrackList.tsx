import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackCard from '@/components/v2/LearningTrackCard';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({ list }) => {
  return (
    <div>
      {list.map((learningTrack) => (
        <LearningTrackCard
          key={learningTrack.id}
          learningTrack={learningTrack}
        />
      ))}
    </div>
  );
};

export default LearningTrackList;
