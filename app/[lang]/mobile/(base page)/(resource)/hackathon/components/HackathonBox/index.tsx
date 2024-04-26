'use client';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import OnGoing from './OnGoing';
import Past from './Past';
import Tab from './Tab';
import MenuLink from '@/constants/MenuLink';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { HiArrowLongRight } from 'react-icons/hi2';
import Link from 'next/link';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Mini from './Mini';

interface HackathonBoxProp {
  page: number;
  curTab: HackathonStatusType;
  hackathonList: HackathonType[];
  total: number;
  limit: number;
  miniHackathonList: HackathonType[];
}
const HackathonBox: React.FC<HackathonBoxProp> = ({ page, curTab, hackathonList, total, limit, miniHackathonList }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  // const router = useRouter();
  // const changeTab = (tab: HackathonStatusType) => {
  //   BurialPoint.track(`hackathon page tab 点击`);
  //   if (tab === curTab) return;
  //   router.push(getSearchParamsUrl({ curTab: tab }, MenuLink.HACKATHON));
  // };
  const renderHackathon = () => {
    switch (curTab) {
      case HackathonStatusType.ON_GOING:
        return <OnGoing hackathonList={hackathonList} />;
      case HackathonStatusType.PAST:
        return <Past page={page} hackathonList={hackathonList} total={total} limit={limit} />;
    }
  };

  const buttonNode = () => {
    return (
      <Link href={`${MenuLink.PROJECTS}`}>
        <div className="body-m relative flex w-fit  items-center gap-[.4375rem] text-neutral-black">
          <span>{t('viewProjects')}</span>
          <HiArrowLongRight size={16}></HiArrowLongRight>
          <div className="absolute bottom-0 left-0 h-[.125rem] w-full rounded-[5px] bg-yellow-dark"></div>
        </div>
      </Link>
    );
  };

  return (
    <div className=" pb-10 ">
      <MobCourseListPageHeader
        title={t('hackathon')}
        description={t('hackathonDescription')}
        coverImageUrl={'/images/hackathon/mob_hackathon_cover.png'}
        coverWidth={218}
        coverHeight={210}
        buttonNode={buttonNode()}
        className=" bg-transparent pb-[40px]"
      />
      <div className="px-[1.25rem]">
        <Mini miniHackathonList={miniHackathonList} />
        <div className="text-h2-mob my-[1.25rem] text-neutral-black">{t('allHackathons')}</div>
        <Tab curTab={curTab} />
        <div className="mb-[40px]">{renderHackathon()}</div>
      </div>
    </div>
  );
};

export default HackathonBox;
