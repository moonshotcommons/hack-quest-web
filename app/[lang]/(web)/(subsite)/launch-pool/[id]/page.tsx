import React from 'react';
import Nav from './components/Nav';
import Content from './components/Content';
import { useTranslation } from '@/i18n/server';

interface LaunchDetailProp {
  params: any;
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  const { lang } = params;
  const { t } = await useTranslation(lang);
  return (
    <div className="scroll-wrap-y h-full py-[40px]">
      <div className="container  mx-auto flex">
        <div className="relative w-[345px]">
          <Nav />
        </div>
        <Content />
      </div>
    </div>
  );
};

export default LaunchDetail;
