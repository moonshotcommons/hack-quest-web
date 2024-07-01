'use client';
import { HackathonStatusType, HackathonTimeLineType, HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import Tab from '../Tab';
import { hackathonDashboardTab } from '../../constants/data';
import TitleIcon from '@/public/images/hackathon/hackahton_organizer_icon.png';
import BaseImage from '@/components/Common/BaseImage';
import Button from '@/components/Common/Button';
import OnGoing from '../HackathonBox/OnGoing';
import Past from '../HackathonBox/Past';
import NoData from './NoData';
import Draft from '../HackathonBox/Draft';
import { StartModal } from '@/components/hackathon-org/modals/start-modal';
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import { HackathonTabType } from '../../constants/type';

interface DashboardProp {
  curTab: HackathonStatusType;
  hackathons: HackathonType[];
}

const Dashboard: React.FC<DashboardProp> = ({ curTab: c, hackathons: h }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [open, setOpen] = useState(false);
  const [curTab, setCurTab] = useState<HackathonStatusType>(c);
  const [hackathonTab, setHackathonTab] = useState<HackathonTabType[]>([]);

  const isPast = (timeline: HackathonTimeLineType) => {
    if (!timeline) return false;
    const currentTime = +new Date();
    return dayjs(timeline.rewardTime).isBefore(currentTime);
  };
  const hackathons = useMemo(() => {
    const hackathon = {
      [HackathonStatusType.ON_GOING]: h.filter((v) => !v.enable && v.timeline && !isPast(v.timeline)),
      [HackathonStatusType.DRAFT]: h.filter((v) => v.enable || !v.timeline),
      [HackathonStatusType.PAST]: h.filter((v) => !v.enable && v.timeline && isPast(v.timeline))
    };
    const newHackathonTab = cloneDeep(hackathonDashboardTab).map((v) => {
      v.count = hackathon[v.value].length || 0;
      return v;
    });
    setHackathonTab(newHackathonTab);
    return hackathon;
  }, [h]);

  // const renderHackathon = () => {
  //   const list = hackathons[curTab];
  //   if (!list.length) {
  //     return <NoData curTab={curTab} />;
  //   }
  //   switch (curTab) {
  //     case HackathonStatusType.ON_GOING:
  //       return <OnGoing hackathonList={list} isDashboard={true} />;
  //     case HackathonStatusType.DRAFT:
  //       return <Draft hackathonList={list} />;
  //     case HackathonStatusType.PAST:
  //       return <Past page={0} hackathonList={list} total={0} limit={0} isDashboard={true} />;
  //   }
  // };
  const buttonNode = () => {
    return (
      <Button type="primary" className="mt-[40px] h-[60px] w-[300px] uppercase" onClick={() => setOpen(true)}>
        {t('organizer.startNewHackathon')}
      </Button>
    );
  };

  return (
    <div className="container  mx-auto pb-10 ">
      <CourseListPageHeader
        title={
          <div className="flex items-center gap-[12px]">
            <BaseImage src={TitleIcon} alt={'hackathon-organizer'} className="h-[48px] w-[48px]" />
            <span>{t('organizer.title')}</span>
          </div>
        }
        description={t('organizer.description')}
        coverImageUrl={'/images/hackathon/hackathon_organizer_cover.png'}
        coverWidth={486}
        coverHeight={403}
        buttonNode={buttonNode()}
        className="pb-[80px]"
      />
      <Tab curTab={curTab} hackathonTab={hackathonTab} path={MenuLink.HACKATHON} changeTab={setCurTab} />
      <div className="mb-[40px]">
        {!hackathons[curTab].length && <NoData curTab={curTab} />}

        <div className={`${curTab !== HackathonStatusType.ON_GOING && 'hidden'}`}>
          <OnGoing hackathonList={hackathons[HackathonStatusType.ON_GOING]} isDashboard={true} />
        </div>
        <div className={`${curTab !== HackathonStatusType.DRAFT && 'hidden'}`}>
          <Draft hackathonList={hackathons[HackathonStatusType.DRAFT]} />
        </div>
        <div className={`${curTab !== HackathonStatusType.PAST && 'hidden'}`}>
          <Past hackathonList={hackathons[HackathonStatusType.PAST]} isDashboard={true} page={0} total={0} limit={0} />
        </div>
      </div>
      <StartModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Dashboard;
