import { Lang } from '@/i18n/config';
import React from 'react';
import Banner from './Banner';
import EcoList from './EcoList';
import CourseList from './CourseList';
import MoreResource from './MoreResource';

interface EcosystemDetailProp {
  lang: Lang;
}

const EcosystemDetail: React.FC<EcosystemDetailProp> = ({ lang }) => {
  return (
    <div>
      <Banner lang={lang} />
      <div className="container mx-auto flex items-stretch gap-[20px] pb-[100px] pt-[60px]">
        <div className="flex w-[24px] flex-shrink-0 items-stretch justify-center">
          <div className="border-l border-dashed border-neutral-medium-gray"></div>
        </div>
        <div className="flex flex-1 flex-col gap-[100px]">
          <EcoList />
          <CourseList lang={lang} />
          <MoreResource lang={lang} />
        </div>
      </div>
    </div>
  );
};

export default EcosystemDetail;
