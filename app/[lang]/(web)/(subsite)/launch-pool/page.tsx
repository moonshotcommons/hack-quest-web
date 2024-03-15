import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import React from 'react';

interface LaunchProp {
  params: {
    lang: Lang;
  };
}

const Launch: React.FC<LaunchProp> = async ({ params: { lang } }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);

  return <div>{t('topBannerTitle')}</div>;
};

export default Launch;
