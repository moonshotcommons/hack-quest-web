import { Lang } from '@/i18n/config';
import React from 'react';
import Banner from './Banner';
import Web3 from './Web3';
import CertifiedLearningTrack from './CertifiedLearningTrack';
import BuildWeb3 from './BuildWeb3';
import MoreResources from './MoreResources';

interface ExploreProp {
  lang: Lang;
}

const Explore: React.FC<ExploreProp> = ({ lang }) => {
  return (
    <div>
      <Banner lang={lang} />
      <div className="container mx-auto flex flex-col gap-[100px] py-[40px]">
        <Web3 lang={lang} />
        <CertifiedLearningTrack lang={lang} />
        <BuildWeb3 lang={lang} />
        <MoreResources lang={lang} />
      </div>
    </div>
  );
};

export default Explore;
