'use client';
import { BurialPoint } from '@/helper/burialPoint';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import OnGoing from './OnGoing';
import Past from './Past';
import { useRedirect } from '@/hooks/router/useRedirect';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import Tab from './Tab';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import MenuLink from '@/constants/MenuLink';
import { HiArrowLongRight } from 'react-icons/hi2';

interface HackathonBoxProp {
  page: number;
  curTab: HackathonStatusType;
}
const HackathonBox: React.FC<HackathonBoxProp> = ({ page, curTab }) => {
  const { redirectToUrl } = useRedirect();
  const router = useRouter();
  const changeTab = (tab: HackathonStatusType) => {
    BurialPoint.track(`hackathon page tab 点击`);
    if (tab === curTab) return;
    router.push(getSearchParamsUrl({ curTab: tab === HackathonStatusType.ON_GOING ? '' : tab }, MenuLink.HACKATHON));
  };
  const renderHackathon = () => {
    switch (curTab) {
      case HackathonStatusType.ON_GOING:
        return <OnGoing goPast={() => changeTab(HackathonStatusType.PAST)} />;
      case HackathonStatusType.PAST:
        return <Past page={page} />;
    }
  };
  const buttonNode = () => {
    return (
      <div
        className="body-m relative flex w-fit cursor-pointer items-center gap-[7px] text-neutral-off-black"
        onClick={() => redirectToUrl(`${MenuLink.PROJECTS}`)}
      >
        <span>View hackathon projects</span>
        <HiArrowLongRight size={16}></HiArrowLongRight>
        <div className="absolute bottom-0 left-0 h-[3px] w-full rounded-[2px] bg-yellow-dark"></div>
      </div>
    );
  };
  return (
    <div className="container  mx-auto pb-10 ">
      <CourseListPageHeader
        title="Hackathon"
        description="Explore ongoing hackathons, uncover past projects, and dive into the world of innovation. Your journey through the realm of creativity begins here! 🚀💡"
        coverImageUrl={'/images/hackathon/hackathon_cover.png'}
        coverWidth={486}
        coverHeight={386}
        buttonNode={buttonNode()}
        className="pb-[40px]"
      />
      <Tab curTab={curTab} changeTab={changeTab} />
      <div className="mb-[40px]">{renderHackathon()}</div>
    </div>
  );
};

export default HackathonBox;
