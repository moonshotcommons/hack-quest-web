import React, { useState } from 'react';
import Tab from '@/components/v2/Tab';
import { TabListType, TabValueType } from '@/components/v2/Tab/type';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { hackathonTab } from './data';
import OnGoing from './OnGoing';
import Past from './Past';

function Hackathon() {
  const [curTab, setCurTab] = useState<HackathonType>(HackathonType.ON_GOING);
  const changeTab = (item: TabListType) => {
    setCurTab(item.value as HackathonType);
  };
  const renderHackathon = () => {
    switch (curTab) {
      case HackathonType.ON_GOING:
        return <OnGoing />;
      case HackathonType.PAST:
        return <Past />;
    }
  };
  return (
    <div className="pb-10  container mx-auto">
      <Tab
        tabList={hackathonTab}
        curTab={curTab}
        changeTab={changeTab}
        className="pb-[40px]"
      />
      <div className="mb-[40px]">{renderHackathon()}</div>
    </div>
  );
}

export default Hackathon;
