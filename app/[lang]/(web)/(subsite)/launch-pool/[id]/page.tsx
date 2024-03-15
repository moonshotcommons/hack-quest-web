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
    <div className="container mx-auto flex h-full gap-[20px] py-[40px]">
      <Nav />
      <Content />
    </div>
  );
};

export default LaunchDetail;
