import Tab from '@/components/v2/Campaigns/Tab';
import React, { useState } from 'react';
import { tabData } from '@/components/v2/Campaigns/Tab/data';
import Mantle from '@/components/v2/Campaigns/Mantle';
import Mantle1 from '@/components/v2/Campaigns/Mantle1';

interface CampaignsProp {}

const Campaigns: React.FC<CampaignsProp> = () => {
  const [curTab, setCurTab] = useState(tabData[0].value);
  const renderContent = () => {
    switch (curTab) {
      case 'mantle':
        return <Mantle />;
      case 'mantle1':
        return <Mantle1 />;
    }
  };
  return (
    <div className="container m-auto flex h-[calc(100vh-64px)]">
      <div className="w-[203px]">
        <Tab curTab={curTab} changeTab={(tab) => setCurTab(tab)} />
      </div>
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default Campaigns;
