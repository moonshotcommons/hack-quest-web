'use client';
import { Lang } from '@/i18n/config';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import CertifiedCover from '@/public/images/learn/certified_learning_track_cover.png';
import EcoCard from './EcoCard';
import { ecosystemStore } from '@/store/zustand/ecosystemStore';
import { useShallow } from 'zustand/react/shallow';
import { EcosystemType } from '@/service/webApi/ecosystem/type';

interface CertifiedLearningTrackProp {
  ecosystems: EcosystemType[];
}

const CertifiedLearningTrack: React.FC<CertifiedLearningTrackProp> = ({ ecosystems }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle image={CertifiedCover} title={'learningTrack'} />
      <div className="flex flex-wrap gap-[32px]">
        {ecosystems.map((eco) => (
          <div key={eco.id} className="w-[calc((100%-64px)/3)]">
            <EcoCard ecosystem={eco} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertifiedLearningTrack;
