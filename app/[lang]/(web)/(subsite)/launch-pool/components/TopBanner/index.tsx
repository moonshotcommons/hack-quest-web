import { FC } from 'react';

import Image from 'next/image';
import Button from '@/components/Common/Button';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';

interface TopBannerProps {
  lang: Lang;
}

const TopBanner: FC<TopBannerProps> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.LAUNCH_POOL);
  return (
    <div className="flex h-[796px] w-full flex-col items-center bg-neutral-black">
      <div className="mt-[231px] flex flex-col items-center gap-12">
        <h1 className="text-h1 uppercase text-neutral-white">
          {`HackQuest ${t('launchpool')}`}
        </h1>
        <div className="flex gap-6">
          <span className="body-l-bold text-neutral-light-gray">
            {t('poweredBy')}
          </span>
          <Image
            src={'/images/launch/powerd_by.webp'}
            alt="Manta Network"
            width={101}
            height={32}
          ></Image>
        </div>
        <p className="body-l-bold text-yellow-primary">{t('topBannerDesc')}</p>
      </div>
      <div className="mt-16 flex gap-4">
        <Button
          ghost
          className="button-text-m w-[165px] max-w-[165px] border-white py-4 uppercase text-neutral-white hover:text-neutral-black"
        >
          {t('seeProjects')}
        </Button>
        <Button
          type="primary"
          className="button-text-m w-[165px] max-w-[165px] py-4 uppercase text-neutral-black"
        >
          {t('submitIDO')}
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
