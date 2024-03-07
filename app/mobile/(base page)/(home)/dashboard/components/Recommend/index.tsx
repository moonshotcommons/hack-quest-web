import MobLearningTrackCard from '@/components/Mobile/MobLearningTrackCard';
import webApi from '@/service';
import { useRequest } from 'ahooks';
import React from 'react';

interface RecommendProp {}

const Recommend: React.FC<RecommendProp> = () => {
  const { data: list = [] } = useRequest(async () => {
    const list = await webApi.learningTrackApi.getLearningTracks();
    return list;
  });

  return (
    <div>
      <div className="text-h4 text-neutral-off-black">Recommended For You</div>
      <div className="mt-[16px] flex flex-wrap gap-[20px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-full">
            <MobLearningTrackCard learningTrack={learningTrack} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
