'use client';
import Button from '@/components/Common/Button';
import React from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/client';

interface UpcomingButtonProp {
  lang: Lang;
}

const UpcomingButton: React.FC<UpcomingButtonProp> = ({ lang }) => {
  const { t } = useTranslation(lang, TransNs.RESOURCE);
  const scollToUpcoming = () => {
    const contentWrap = document.querySelector('#content-scroll-wrap');
    if (contentWrap) {
      contentWrap?.scrollTo({
        top: 972
      });
    }
  };

  return (
    <Button
      type="primary"
      className="button-text-m h-[3rem] w-[10.3125rem] p-0 uppercase text-neutral-black"
      onClick={scollToUpcoming}
    >
      {t('events.upcomingEvents')}
    </Button>
  );
};

export default UpcomingButton;
