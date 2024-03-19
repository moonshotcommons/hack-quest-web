import React from 'react';
import LaunchDetailPage from './components';
import { Lang } from '@/i18n/config';

interface LaunchDetailProp {
  params: {
    lang: Lang;
  };
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  const { lang } = params;
  return <LaunchDetailPage />;
};

export default LaunchDetail;
