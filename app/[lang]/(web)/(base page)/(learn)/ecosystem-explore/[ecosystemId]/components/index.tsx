import { Lang } from '@/i18n/config';
import React from 'react';
import Banner from './Banner';
import EcoList from './EcoList';
import CourseList from './CourseList';
import MoreResource from './MoreResource';
import { EcosystemDetailType } from '@/service/webApi/ecosystem/type';
import Certificate from './Certificate';

interface EcosystemDetailProp {
  lang: Lang;
  ecosystem: EcosystemDetailType;
}

const EcosystemDetail: React.FC<EcosystemDetailProp> = ({ lang, ecosystem }) => {
  return (
    <div>
      <Banner lang={lang} ecosystem={ecosystem} />
      <div className="container mx-auto py-[60px]">
        <Certificate ecosystem={ecosystem} />
      </div>
      <div className="container mx-auto flex items-stretch gap-[20px] pb-[100px]">
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
