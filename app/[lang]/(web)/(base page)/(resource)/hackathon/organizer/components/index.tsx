'use client';
import {
  HackathonStatus,
  HackathonStatusType,
  HackathonTimeLineType,
  HackathonType
} from '@/service/webApi/resourceStation/type';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import MenuLink from '@/constants/MenuLink';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import { hackathonDashboardTab } from '../../constants/data';
import TitleIcon from '@/public/images/hackathon/hackahton_organizer_icon.png';
import BaseImage from '@/components/Common/BaseImage';
import Button from '@/components/Common/Button';
import NoData from './NoData';
import { StartModal } from '@/components/hackathon-org/modals/start-modal';
import { cloneDeep } from 'lodash-es';
import dayjs from 'dayjs';
import { HackathonTabType } from '../../constants/type';
import TipsModal from './TipsModal';
import { useUserStore } from '@/store/zustand/userStore';
import { UserRole } from '@/service/webApi/user/type';
import Past from '../../components/HackathonBox/Past';
import Draft from '../../components/HackathonBox/Draft';
import OnGoing from '../../components/HackathonBox/OnGoing';
import Tab from '../../components/Tab';

interface HackathonOrganizerProp {
  curTab: HackathonStatusType;
  hackathons: HackathonType[];
}

const HackathonOrganizer: React.FC<HackathonOrganizerProp> = ({ curTab: c, hackathons: h }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const [open, setOpen] = useState(false);
  const [curTab, setCurTab] = useState<HackathonStatusType>(c);
  const [hackathonTab, setHackathonTab] = useState<HackathonTabType[]>([]);
  const [tipsOpen, setTipsOpen] = useState(false);
  const userInfo = useUserStore((state) => state.userInfo);

  const isPast = (timeline: HackathonTimeLineType) => {
    if (!timeline) return false;
    const currentTime = +new Date();
    return dayjs.utc(timeline.rewardTime).local().isBefore(currentTime);
  };
  const hackathons = useMemo(() => {
    const hackathon = {
      [HackathonStatusType.ON_GOING]: h.filter(
        (v) => v.status === HackathonStatus.PUBLISH && v.timeline && !isPast(v.timeline)
      ),
      [HackathonStatusType.REVIEW]: h.filter((v) => v.status === HackathonStatus.REVIEW),
      [HackathonStatusType.DRAFT]: h.filter((v) => v.status === HackathonStatus.DRAFT),
      [HackathonStatusType.PAST]: h.filter(
        (v) => v.status === HackathonStatus.PUBLISH && v.timeline && isPast(v.timeline)
      )
    };
    const newHackathonTab = cloneDeep(hackathonDashboardTab).map((v) => {
      v.count = hackathon[v.value].length || 0;
      return v;
    });
    // let onGoingCount = 0;
    // const tabs = newHackathonTab.sort((a, b) => {
    //   if (a.value === HackathonStatusType.ON_GOING) {
    //     onGoingCount = a.count!;
    //     return a.count ? 1 : 0;
    //   }
    //   if (b.value === HackathonStatusType.DRAFT && b.count && !onGoingCount) {
    //     return 1;
    //   }
    //   return -1;
    // });

    // setHackathonTab(tabs);
    setHackathonTab(newHackathonTab);
    return hackathon;
  }, [h]);

  const startNewHackathon = () => {
    if (![UserRole.ADMIN, UserRole.ORGANIZATION].includes(userInfo?.role!)) {
      setTipsOpen(true);
    } else {
      setOpen(true);
    }
  };
  const buttonNode = () => {
    return (
      <Button type="primary" className="mt-[40px] h-[60px] w-[300px] uppercase" onClick={startNewHackathon}>
        {t('organizer.startNewHackathon')}
      </Button>
    );
  };

  useEffect(() => {
    if (
      !localStorage.getItem('isFirstHackahtonOrganizer') &&
      ![UserRole.ADMIN, UserRole.ORGANIZATION].includes(userInfo?.role!)
    ) {
      setTipsOpen(true);
      localStorage.setItem('isFirstHackahtonOrganizer', '1');
    } else {
      setTipsOpen(false);
    }
  }, []);

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
      <Tab curTab={curTab} hackathonTab={hackathonTab} path={MenuLink.EXPLORE_HACKATHON} changeTab={setCurTab} />
      <div className="mb-[40px]">
        {!hackathons[curTab].length && <NoData curTab={curTab} />}

        <div className={`${curTab !== HackathonStatusType.ON_GOING && 'hidden'}`}>
          <OnGoing hackathonList={hackathons[HackathonStatusType.ON_GOING]} isOrganizer={true} showManage={true} />
        </div>
        <div className={`${curTab !== HackathonStatusType.REVIEW && 'hidden'}`}>
          <OnGoing hackathonList={hackathons[HackathonStatusType.REVIEW]} isOrganizer={true} />
        </div>
        <div className={`${curTab !== HackathonStatusType.DRAFT && 'hidden'}`}>
          <Draft hackathonList={hackathons[HackathonStatusType.DRAFT]} />
        </div>
        <div className={`${curTab !== HackathonStatusType.PAST && 'hidden'}`}>
          <Past
            hackathonList={hackathons[HackathonStatusType.PAST]}
            isOrganizer={true}
            showManage={true}
            page={0}
            total={0}
            limit={0}
          />
        </div>
      </div>
      <StartModal open={open} onClose={() => setOpen(false)} />
      <TipsModal open={tipsOpen} onClose={() => setTipsOpen(false)} />
    </div>
  );
};

export default HackathonOrganizer;
