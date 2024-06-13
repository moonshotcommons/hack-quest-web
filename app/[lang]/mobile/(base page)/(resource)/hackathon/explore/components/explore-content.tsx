'use client';

import * as React from 'react';
import { HackathonStatusType, HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Mini from '../../components/HackathonBox/Mini';
import Tab from '../../components/HackathonBox/Tab';
import OnGoing from '../../components/HackathonBox/OnGoing';
import Past from '../../components/HackathonBox/Past';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';

export function ExploreContent({
  page,
  curTab,
  hackathonList,
  total,
  limit,
  miniHackathonList
}: {
  page: number;
  curTab: HackathonStatusType;
  hackathonList: HackathonType[];
  total: number;
  limit: number;
  miniHackathonList: HackathonType[];
  featured: ProjectType[];
}) {
  const { lang } = React.useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const renderHackathon = () => {
    switch (curTab) {
      case HackathonStatusType.ON_GOING:
        return <OnGoing hackathonList={hackathonList} />;
      case HackathonStatusType.PAST:
        return <Past page={page} hackathonList={hackathonList} total={total} limit={limit} />;
    }
  };
  return (
    <>
      <div className="px-5 pb-20">
        <Mini miniHackathonList={miniHackathonList} />
        <div className="text-h3 mb-3 mt-8 text-neutral-black">{t('allHackathons')}</div>
        <Tab curTab={curTab} />
        {renderHackathon()}
      </div>
    </>
  );
}
