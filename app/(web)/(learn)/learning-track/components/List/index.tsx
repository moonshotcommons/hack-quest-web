import LearningTrackCard from '@/components/Web/Business/LearningTrackCardNew';
import LearningTrackCardSkeleton from '@/components/Web/Business/LearningTrackCardSkeleton';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import React from 'react';

interface ListProp {
  list: LearningTrackDetailType[];
  loading: boolean;
}

const List: React.FC<ListProp> = ({ list, loading }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-[24px]">
      <LearningTrackCardSkeleton.List active={loading}>
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            <LearningTrackCard learningTrack={learningTrack} />
          </div>
        ))}
      </LearningTrackCardSkeleton.List>
    </div>
  );
};

export default List;
