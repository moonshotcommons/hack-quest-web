'use client';
import Button from '@/components/Common/Button';
import MenuLink from '@/constants/MenuLink';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { getSearchParamsUrl } from '@/helper/utils';

interface NoDataType {}
const NoData: React.FC<NoDataType> = () => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  return (
    <div className="flex flex-col items-center pb-[100px] ">
      <p className="text-h3 text-neutral-off-black">{t('noGoingHackahton')}</p>
      <Link href={getSearchParamsUrl({ curTab: HackathonStatusType.PAST }, MenuLink.HACKATHON)}>
        <Button
          type="primary"
          className="body-l mb-[20px] mt-[30px] h-[55px] w-[360px] uppercase text-neutral-off-black"
        >
          {t('checkPastHackathon')}
        </Button>
      </Link>

      <Link href={MenuLink.PROJECTS}>
        <Button className="body-l h-[55px] w-[360px] border border-neutral-off-black uppercase text-neutral-off-black">
          {t('checkAllProjects')}
        </Button>
      </Link>
    </div>
  );
};

export default NoData;
