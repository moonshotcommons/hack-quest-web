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
    <div className="mt-[2.5rem] flex flex-col items-center pb-[6.25rem]">
      <p className="text-h2-mob mb-[1.25rem] text-neutral-off-black">{t('noGoingHackahton')}</p>
      <Link
        href={getSearchParamsUrl({ curTab: HackathonStatusType.PAST }, MenuLink.EXPLORE_HACKATHON)}
        className="mb-[1.25rem] block w-full"
      >
        <Button type="primary" className="body-m h-[3rem] w-full  uppercase text-neutral-off-black">
          {t('checkAllProjects')}
        </Button>
      </Link>

      <Link href={MenuLink.PROJECTS} className="block w-full">
        <Button className="body-m h-[3rem] w-full border border-neutral-off-black uppercase text-neutral-off-black">
          {t('checkAllProjects')}
        </Button>
      </Link>
    </div>
  );
};

export default NoData;
