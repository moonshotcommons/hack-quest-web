import React, { useState } from 'react';
import Tab from '@/components/v2/Tab';
import { TabListType, TabValueType } from '@/components/v2/Tab/type';
import { HackathonType } from '@/service/webApi/resourceStation/type';
import { hackathonTab } from './data';
import OnGoing from './OnGoing';
import Past from './Past';
import { useRouter } from 'next/router';

function Hackathon() {
  const router = useRouter();
  const [curTab, setCurTab] = useState<HackathonType>(HackathonType.ON_GOING);
  const changeTab = (item: TabListType) => {
    if (item.type === 'tab') {
      setCurTab(item.value as HackathonType);
    } else {
      router.push(item.value);
    }
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
