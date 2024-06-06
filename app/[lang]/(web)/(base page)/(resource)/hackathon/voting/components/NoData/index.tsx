import React from 'react';
import { Lang, TransNs } from '@/i18n/config';
import { useTranslation } from '@/i18n/server';
import Link from 'next/link';
import Button from '@/components/Common/Button';
import MenuLink from '@/constants/MenuLink';
interface NoDataProp {
  lang: Lang;
}

const NoData: React.FC<NoDataProp> = async ({ lang }) => {
  const { t } = await useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col items-center gap-[16px] pt-[72px]">
      <p className="body-l text-neutral-medium-gray">{t('hackathonVoting.nodataText')}</p>
      <Link href={`${MenuLink.PROJECTS}`}>
        <Button ghost className="button-text-m h-[48px] border-neutral-black uppercase text-neutral-black">
          {t('hackathonVoting.nodataButtonText')}
        </Button>
      </Link>
    </div>
  );
};

export default NoData;
