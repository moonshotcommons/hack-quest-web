import React from 'react';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackCard from '@/components/v2/LearningTrackCard';
import { ProcessType } from '@/service/webApi/course/type';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
interface LearningTrackListProps {
  list: LearningTrackDetailType[];
  status?: ProcessType;
}

const LearningTrackList: React.FC<LearningTrackListProps> = ({
  list,
  status
}) => {
  return (
    <div>
      {list.map((learningTrack) => (
        <LearningTrackCard
          key={learningTrack.id}
          learningTrack={learningTrack}
          status={status}
        />
      ))}
    </div>
  );
};

export default LearningTrackList;
