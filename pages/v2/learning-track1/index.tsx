import React from 'react';
import LearningTrackWelCome from '@/components/v2/LearningTrackWelcome';
import LearningTracksCard from '@/components/v2/LearningTrackCard';

function LearningTrack() {
  return (
    <div>
      <LearningTrackWelCome />
      <div className="pt-[60px]">
        <LearningTracksCard />
      </div>
    </div>
  );
}

export default LearningTrack;
