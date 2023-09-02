import React from 'react';
import PageDescription from '@/components/v2/PageDescription';
import LearningTracksCard from '@/components/v2/LearningTrackCard';
import { useGetLearningTracks } from '@/hooks/useLearningTrackHooks/useLearningTracks';
import { Spin } from 'antd';
import { LearningTrackCourseType } from '@/service/webApi/course/type';

function LearningTrack() {
  const { learningTracks, loading } = useGetLearningTracks();
  return (
    <div className="container mx-auto">
      <PageDescription
        title={'Learning Track'}
        description={'description description'}
      />
      <Spin size="large" tip={'加载中...'} spinning={loading}>
        <div className="pt-[60px]">
          {learningTracks.map((item) => (
            <LearningTracksCard
              key={item.id}
              learningTrack={item}
              status={LearningTrackCourseType.UN_ENROLL}
            />
          ))}
        </div>
        <div className="flex-center h-[170px]">
          <div className="w-[1px] h-[100px] bg-learning-track-line-bg"></div>
        </div>
        <div className="font-next-book-bold text-[24px] text-center text-learning-track-more-text-color pb-[63px] pt-[10px]">
          <p>Vyper, Huff, Rust ...</p>
          <p>More Learning Tracks are coming soon</p>
        </div>
      </Spin>
    </div>
  );
}

export default LearningTrack;
