'use client';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import PageDescription from '@/components/Web/Business/PageDescription';
import Tab from '@/components/Web/Business/Tab';
import { TabListType } from '@/components/Web/Business/Tab/type';
import { BurialPoint } from '@/helper/burialPoint';
import { HackathonStatusType } from '@/service/webApi/resourceStation/type';
import { useState } from 'react';
import OnGoing from './OnGoing';
import Past from './Past';
import { hackathonTab } from './data';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

function HackathonBox() {
  const { redirectToUrl } = useRedirect();
  const [curTab, setCurTab] = useState<HackathonStatusType>(
    HackathonStatusType.ON_GOING
  );
  const changeTab = (item: TabListType) => {
    BurialPoint.track(`hackathon page tab 点击`);
    if (item.type === 'tab') {
      setCurTab(item.value as HackathonStatusType);
    } else {
      redirectToUrl(
        `${MenuLink.PROJECTS}?menu=${Menu.HACKATHON}&${QueryIdType.PROJECT_ID}=projects`
      );
    }
  };
  const renderHackathon = () => {
    switch (curTab) {
      case HackathonStatusType.ON_GOING:
        return <OnGoing goPast={() => setCurTab(HackathonStatusType.PAST)} />;
      case HackathonStatusType.PAST:
        return <Past />;
    }
  };
  return (
    <div className="pb-10  container mx-auto ">
      <PageDescription
        title="Welcome to HackQuest Hackathon!"
        description="Explore ongoing hackathons, uncover past projects, and dive into the world of innovation. Your journey through the realm of creativity begins here! 🚀💡"
      />
      <Tab
        tabList={hackathonTab}
        curTab={curTab}
        changeTab={changeTab}
        className="pb-10 text-2xl leading-6 before:bottom-9"
        textClassName="pb-[2px]"
      />
      <div className="mb-[40px]">{renderHackathon()}</div>
    </div>
  );
}

export default HackathonBox;
