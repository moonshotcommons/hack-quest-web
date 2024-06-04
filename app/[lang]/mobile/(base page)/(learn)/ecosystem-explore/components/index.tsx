'use client';
import { Lang } from '@/i18n/config';
import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Web3 from './Web3';
import CertifiedLearningTrack from './CertifiedLearningTrack';
import BuildWeb3 from './BuildWeb3';
import MoreResources from './MoreResources';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { useGetEcosystemData } from '@/hooks/ecosystem/useGetEcosystemData';

interface ExploreProp {
  lang: Lang;
}

const Explore: React.FC<ExploreProp> = ({ lang }) => {
  const [ecosystems, setEcosystems] = useState<EcosystemType[]>([]);
  const [keyword, setKeyword] = useState('');
  const { getEcosystems } = useGetEcosystemData();

  useEffect(() => {
    getEcosystems(keyword).then((res) => {
      setEcosystems(res);
    });
  }, [keyword]);
  return (
    <div>
      <Banner keyword={keyword} searchKeyword={setKeyword} />
      <div className="flex flex-col gap-[2.5rem] px-[1.25rem] pb-[5rem] pt-[1.5rem]">
        <Web3 />
        <CertifiedLearningTrack ecosystems={ecosystems} />
        <BuildWeb3 ecosystems={ecosystems} />
        <MoreResources />
      </div>
    </div>
  );
};

export default Explore;
