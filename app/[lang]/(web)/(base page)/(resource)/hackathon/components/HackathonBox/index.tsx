'use client';
import { HackathonStatusType, HackathonType } from '@/service/webApi/resourceStation/type';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import Tab from './Tab';
import MenuLink from '@/constants/MenuLink';
import { HiArrowLongRight } from 'react-icons/hi2';
import { useContext } from 'react';
import { LangContext } from '@/components/Provider/Lang';
import { useTranslation } from '@/i18n/client';
import { TransNs } from '@/i18n/config';
import Link from 'next/link';

interface HackathonBoxProp {
  curTab: HackathonStatusType;
  hackathons: HackathonType[];
}
const HackathonBox: React.FC<HackathonBoxProp> = ({ curTab, hackathons }) => {
  const { lang } = useContext(LangContext);
  const { t } = useTranslation(lang, TransNs.HACKATHON);
  const renderHackathon = () => {
    // switch (curTab) {
    //   case HackathonStatusType.ON_GOING:
    //     return <OnGoing hackathonList={hackathonList} />;
    //   case HackathonStatusType.PAST:
    //     return <Past page={page} hackathonList={hackathonList} total={total} limit={limit} />;
    // }
  };
  const buttonNode = () => {
    return (
      <Link href={`${MenuLink.PROJECTS}`}>
        <div className="body-m relative flex w-fit cursor-pointer items-center gap-[7px] text-neutral-black">
          <span>{t('viewProjects')}</span>
          <HiArrowLongRight size={16}></HiArrowLongRight>
          <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[2px] bg-yellow-dark"></div>
        </div>
      </Link>
    );
  };
  return (
    <div className="container  mx-auto pb-10 ">
      <CourseListPageHeader
        title={t('hackathon')}
        description={t('hackathonDescription')}
        coverImageUrl={'/images/hackathon/hackathon_cover.png'}
        coverWidth={486}
        coverHeight={386}
        buttonNode={buttonNode()}
        className="pb-[40px]"
      />
      <div className="text-h3 mb-[12px] mt-[40px] text-neutral-black">{t('allHackathons')}</div>
      <Tab curTab={curTab} />
      {/* <div className="mb-[40px]">{renderHackathon()}</div> */}
    </div>
  );
};

export default HackathonBox;
