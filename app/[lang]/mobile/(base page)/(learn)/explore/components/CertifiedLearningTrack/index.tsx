import { Lang } from '@/i18n/config';
import React from 'react';
import DeveloperTitle from '../DeveloperTitle';
import CertifiedCover from '@/public/images/learn/certified_learning_track_cover.png';
import EcoCard from './EcoCard';
import { list } from './data';

interface CertifiedLearningTrackProp {
  lang: Lang;
}

const CertifiedLearningTrack: React.FC<CertifiedLearningTrackProp> = ({ lang }) => {
  return (
    <div className="flex flex-col gap-[32px]">
      <DeveloperTitle lang={lang} image={CertifiedCover} title={'learningTrack'} />
      <div className="flex flex-wrap gap-[32px]">
        {list.map((eco) => (
          <div key={eco.id} className="w-[calc((100%-64px)/3)]">
            <EcoCard ecosystem={eco} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertifiedLearningTrack;
