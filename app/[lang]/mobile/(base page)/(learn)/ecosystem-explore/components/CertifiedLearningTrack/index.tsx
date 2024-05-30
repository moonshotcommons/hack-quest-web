'use client';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import CertifiedCover from '@/public/images/learn/certified_learning_track_cover.png';
import EcoCard from './EcoCard';
import { EcosystemType } from '@/service/webApi/ecosystem/type';

interface CertifiedLearningTrackProp {
  ecosystems: EcosystemType[];
}

const CertifiedLearningTrack: React.FC<CertifiedLearningTrackProp> = ({ ecosystems }) => {
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <DeveloperTitle image={CertifiedCover} title={'learningTrack'} />
      <div className="flex flex-col gap-[1.25rem]">
        {ecosystems.map((eco) => (
          <div key={eco.id} className="w-full">
            <EcoCard ecosystem={eco} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertifiedLearningTrack;
