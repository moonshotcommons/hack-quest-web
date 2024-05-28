'use client';

import * as React from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import { HackathonStatusType, HackathonType, ProjectType } from '@/service/webApi/resourceStation/type';
import Mini from '../../components/HackathonBox/Mini';
import Tab from '../../components/HackathonBox/Tab';
import OnGoing from '../../components/HackathonBox/OnGoing';
import Past from '../../components/HackathonBox/Past';
import FeaturedProjects from '../../components/FeaturedProject';

export function ExploreContent({
  page,
  curTab,
  hackathonList,
  total,
  limit,
  miniHackathonList,
  featured
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
    <div className="mt-5">
      <Mini miniHackathonList={miniHackathonList} />
      <div className="text-h3 mb-[12px] text-neutral-black">{t('allHackathons')}</div>
      <Tab curTab={curTab} />
      {renderHackathon()}
      <FeaturedProjects projectList={featured} />
    </div>
  );
}
