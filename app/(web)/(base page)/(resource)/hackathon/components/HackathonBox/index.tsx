'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import OnGoing from './OnGoing';
import Past from './Past';
import { useRedirect } from '@/hooks/useRedirect';
import CourseListPageHeader from '@/components/Web/Business/CourseListPageHeader';
import Button from '@/components/Common/Button';
import Tab from './Tab';
import { useRouter } from 'next/navigation';
import { getSearchParamsUrl } from '@/helper/utils';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

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
      <Button
        ghost
        className="button-text-m h-[48px] w-[249px] border-neutral-black p-0 uppercase"
        onClick={() => {
          redirectToUrl(
            `${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects`
          );
        }}
      >
        View hackathon projects
      </Button>
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
