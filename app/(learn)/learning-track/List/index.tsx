import LearningTrackCard from '@/components/v2/Business/LearningTrackCardNew';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import React from 'react';

interface ListProp {
  list: LearningTrackDetailType[];
}

const List: React.FC<ListProp> = ({ list }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-[24px]">
      {list.map((learningTrack) => (
        <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
          <LearningTrackCard learningTrack={learningTrack} />
        </div>
      ))}
    </div>
  );
};

export default List;
