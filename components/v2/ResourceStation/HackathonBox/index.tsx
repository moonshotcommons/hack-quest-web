import React, { useState } from 'react';
import Tab from '@/components/v2/Tab';
import { TabListType } from '@/components/v2/Tab/type';
import { HackathonStatusType } from '@/service/webApi/resourceStation/hackathon/type';
import { hackathonTab } from './data';
import OnGoing from './OnGoing';
import Past from './Past';
import PageDescription from '../../PageDescription';
import { useRouter } from 'next/router';
import { menuLink } from '../../Breadcrumb/data';
import { Menu, QueryIdType } from '../../Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { MenuLink } from '../../Layout/Navbar/type';

function HackathonBox() {
  const router = useRouter();
  const [curTab, setCurTab] = useState<HackathonStatusType>(
    HackathonStatusType.ON_GOING
  );
  const changeTab = (item: TabListType) => {
    BurialPoint.track(`hackathon page tab 点击`);
    if (item.type === 'tab') {
      setCurTab(item.value as HackathonStatusType);
    } else {
      router.push(
        `${MenuLink.PROJECTS}?menu=${Menu.PROJECTS}&${QueryIdType.PROJECT_ID}=projects`
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
