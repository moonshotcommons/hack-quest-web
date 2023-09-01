import React from 'react';
import PageDescription from '@/components/v2/PageDescription';
import LearningTracksCard from '@/components/v2/LearningTrackCard';

function LearningTrack() {
  return (
    <div className="container mx-auto">
      <PageDescription
        title={'Learning Track'}
        description={'description description'}
      />
      <div className="pt-[60px]">
        <LearningTracksCard />
      </div>
      <div className="flex-center h-[170px]">
        <div className="w-[1px] h-[100px] bg-learning-track-line-bg"></div>
      </div>
      <div className="font-next-book-bold text-[24px] text-center text-learning-track-more-text-color pb-[63px] pt-[10px]">
        <p>Vyper, Huff, Rust ...</p>
        <p>More Learning Tracks are coming soon</p>
      </div>
    </div>
  );
}

export default LearningTrack;
