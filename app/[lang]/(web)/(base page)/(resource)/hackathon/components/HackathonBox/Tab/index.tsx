'use client';
import React, { useContext } from 'react';
import { hackathonTab } from '../data';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';

interface TabProp {
  curTab: HackathonStatusType;
  // changeTab: (tab: HackathonStatusType) => void;
}

const Tab: React.FC<TabProp> = ({ curTab }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const getUrl = (tab: HackathonStatusType) => {
    return getSearchParamsUrl({ curTab: tab === HackathonStatusType.ON_GOING ? '' : tab }, MenuLink.HACKATHON);
  };
  return (
    <SlideHighlight
      className={`mb-[40px] flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={hackathonTab.findIndex((v) => v.value === curTab)}
    >
      {hackathonTab.map((v) => (
        <Link key={v.value} href={getUrl(v.value)}>
          <div
            className={`body-xl cursor-pointer  text-neutral-off-black ${curTab === v.value ? '  body-xl-bold ' : ' '}`}
          >
            {t(v.label)}
          </div>
        </Link>
      ))}
    </SlideHighlight>
  );
};

export default Tab;
