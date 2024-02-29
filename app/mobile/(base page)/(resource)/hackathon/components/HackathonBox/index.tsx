'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import OnGoing from './OnGoing';
import Past from './Past';
import { useRedirect } from '@/hooks/useRedirect';
import Tab from './Tab';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import MobCourseListPageHeader from '@/components/Mobile/MobCourseListPageHeader';
import { BsArrowRight } from 'react-icons/bs';

interface HackathonBoxProp {
  page: number;
  curTab: HackathonStatusType;
}
const HackathonBox: React.FC<HackathonBoxProp> = ({ page, curTab }) => {
  const { redirectToUrl } = useRedirect();
  const router = useRouter();
  // const [curTab, setCurTab] = useState<HackathonStatusType>(
  //   HackathonStatusType.ON_GOING
  // );
  const changeTab = (tab: HackathonStatusType) => {
    BurialPoint.track(`hackathon page tab 点击`);
    if (tab === curTab) return;
    router.push(getSearchParamsUrl({ curTab: tab }, MenuLink.HACKATHON));
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
        className="body-m flex w-fit items-center gap-[7px] border-b-[2px] border-b-yellow-primary text-neutral-black"
        onClick={() =>
          redirectToUrl(
            `${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects`
          )
        }
      >
        <span>View hackathon projects</span>
        <BsArrowRight size={16}></BsArrowRight>
      </div>
    );
  };
  return (
    <div className=" pb-10 ">
      <MobCourseListPageHeader
        title="Hackathon"
        description={`Explore ongoing hackathons, uncover past projects, and dive into the world of innovation. Your journey through the realm of creativity begins here! 🚀💡`}
        coverImageUrl={'/images/hackathon/mob_hackathon_cover.png'}
        coverWidth={218}
        coverHeight={210}
        buttonNode={buttonNode()}
        className=" bg-transparent pb-[40px]"
      />
      <div className="px-[1.25rem]">
        <Tab curTab={curTab} changeTab={changeTab} />
        <div className="mb-[40px]">{renderHackathon()}</div>
      </div>
    </div>
  );
};

export default HackathonBox;
