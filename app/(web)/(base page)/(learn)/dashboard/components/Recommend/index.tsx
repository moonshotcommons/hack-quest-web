import webApi from '@/service';
import { useRequest } from 'ahooks';
import React from 'react';
import LearningTrackCompleted from '../LearningTrackCompleted';

interface RecommendProp {}

const Recommend: React.FC<RecommendProp> = () => {
  const { data: list = [] } = useRequest(async () => {
    const list = await webApi.learningTrackApi.getLearningTracks();
    return list;
  });

  return (
    <div>
      <div className="text-neutral-off-black text-h4">Recommended For You</div>
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            <LearningTrackCompleted learningTrack={learningTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
