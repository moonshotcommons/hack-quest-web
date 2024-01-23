import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import React from 'react';
import MobLearningTrackCardSkeleton from '../MobLearningTrackCardSkeleton';
import MobLearningTrackCard from '../MobLearningTrackCard';

interface ListProp {
  list: LearningTrackDetailType[];
  loading: boolean;
}

const List: React.FC<ListProp> = ({ list, loading }) => {
  return (
    <div className="mt-[1.25rem]">
      <MobLearningTrackCardSkeleton.List active={loading}>
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="mb-[1.5rem]">
            <MobLearningTrackCard learningTrack={learningTrack} />
          </div>
        ))}
      </MobLearningTrackCardSkeleton.List>
    </div>
  );
};

export default List;
