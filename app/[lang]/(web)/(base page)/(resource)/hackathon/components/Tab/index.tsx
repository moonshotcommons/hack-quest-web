'use client';
import React, { useContext } from 'react';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';
import MenuLink from '@/constants/MenuLink';
import { HackathonTabType } from '../../constants/type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';

interface TabProp {
  curTab: HackathonStatusType;
  hackathonTab: HackathonTabType[];
  path: MenuLink;
  changeTab?: (tab: HackathonStatusType) => void;
}

const Tab: React.FC<TabProp> = ({ curTab, hackathonTab, path, changeTab }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const getUrl = (tab: HackathonStatusType) => {
    return tab === HackathonStatusType.ON_GOING ? `${path}` : `${path}?curTab=${tab}`;
  };
  return (
    <SlideHighlight
      className={`mb-[40px] flex gap-[30px] pb-[2px]`}
      type="LEARNING_TRACK"
      currentIndex={hackathonTab.findIndex((v) => v.value === curTab)}
    >
      {hackathonTab.map((v) =>
        changeTab ? (
          <div
            key={v.value}
            onClick={() => changeTab(v.value)}
            className={`body-xl cursor-pointer  text-neutral-off-black ${curTab === v.value ? '  body-xl-bold ' : ' '}`}
          >
            {t(v.label)}
            {'count' in v && `(${v.count})`}
          </div>
        ) : (
          <Link key={v.value} href={getUrl(v.value)} scroll={false}>
            <div
              className={`body-xl cursor-pointer  text-neutral-off-black ${curTab === v.value ? '  body-xl-bold ' : ' '}`}
            >
              {t(v.label)}
              {'count' in v && `(${v.count})`}
            </div>
          </Link>
        )
      )}
    </SlideHighlight>
  );
};

export default Tab;
