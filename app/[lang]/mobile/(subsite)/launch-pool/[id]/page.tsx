import React from 'react';
import { useTranslation } from '@/i18n/server';
import LaunchDetailPage from './components';

interface LaunchDetailProp {
  params: any;
}

const LaunchDetail: React.FC<LaunchDetailProp> = async ({ params }) => {
  const { lang } = params;
  const { t } = await useTranslation(lang);
  return <LaunchDetailPage />;
};

export default LaunchDetail;
