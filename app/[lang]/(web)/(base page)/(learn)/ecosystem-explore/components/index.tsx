import { Lang } from '@/i18n/config';
import React from 'react';
import Banner from './Banner';
import Web3 from './Web3';
import CertifiedLearningTrack from './CertifiedLearningTrack';
import BuildWeb3 from './BuildWeb3';
import MoreResources from './MoreResources';
import { EcosystemType } from '@/service/webApi/ecosystem/type';
import { CourseDetailType } from '@/service/webApi/course/type';

interface ExploreProp {
  lang: Lang;
  ecosystems: EcosystemType[];
  keyword: string;
  course: CourseDetailType;
}

const Explore: React.FC<ExploreProp> = ({ ecosystems, keyword, course }) => {
  return (
    <div>
      <Banner keyword={keyword || ''} />
      <div className="container mx-auto flex flex-col gap-[100px] pb-[100px] pt-[40px]">
        <Web3 course={course} />
        <CertifiedLearningTrack ecosystems={ecosystems} />
        <BuildWeb3 />
        <MoreResources />
      </div>
    </div>
  );
};

export default Explore;
