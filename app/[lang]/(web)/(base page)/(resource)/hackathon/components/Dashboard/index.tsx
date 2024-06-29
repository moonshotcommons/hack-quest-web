'use client';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import React, { useContext, useState } from 'react';
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

interface DashboardProp {
  curTab: HackathonStatusType;
  hackathons: HackathonType[];
}

const Dashboard: React.FC<DashboardProp> = ({ curTab, hackathons }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [open, setOpen] = useState(false);
  const renderHackathon = () => {
    if (!hackathons.length) {
      return <NoData curTab={curTab} />;
    }
    switch (curTab) {
      case HackathonStatusType.ON_GOING:
        return <OnGoing hackathonList={hackathons} isDashboard={true} />;
      case HackathonStatusType.DRAFT:
        return <Draft hackathonList={hackathons} />;
      case HackathonStatusType.PAST:
        return <Past page={0} hackathonList={hackathons} total={0} limit={0} isDashboard={true} />;
    }
  };
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
      <Tab curTab={curTab} hackathonTab={hackathonDashboardTab} path={MenuLink.HACKATHON} />
      <div className="mb-[40px]">{renderHackathon()}</div>
      <StartModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default Dashboard;
