import LearningTrackCard from '@/components/Web/Business/LearningTrackCard';
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
      <div className="mt-[16px] flex flex-wrap gap-[24px]">
        {list.map((learningTrack) => (
          <div key={learningTrack.id} className="w-[calc((100%-24px)/2)]">
            <LearningTrackCard
              learningTrack={learningTrack}
              from="dashboard"
              className="h-[200px] p-[16px]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommend;
