import Tab from '@/components/v2/Campaigns/Tab';
import React, { useMemo, useState } from 'react';
import Mantle from '@/components/v2/Campaigns/Mantle';
import { MantleContext } from '@/components/v2/Campaigns/Mantle/type';

interface CampaignsProp {}

const Campaigns: React.FC<CampaignsProp> = () => {
  const [curIndex, setCurIndex] = useState(0);
  const tabList = useMemo(() => {
    return [
      {
        label: 'Mantle',
        count: 1
      }
    ];
  }, []);
  const renderContent = () => {
    switch (curIndex) {
      case 0:
        return <Mantle />;
    }
  };
  return (
    <MantleContext.Provider
      value={{
        mantle: {}
      }}
    >
      <div className="container m-auto flex h-[calc(100vh-64px)] font-next-book text-[#0b0b0b] py-[40px] text-[16px]">
        <div className="w-[203px]">
          <Tab
            tabList={tabList}
            curIndex={curIndex}
            changeTab={(index) => setCurIndex(index)}
          />
        </div>
        <div className="flex-1 h-full bg-[#fff] rounded-b-[10px] rounded-r-[10px] shadow-[5px_5px_5px_#dadada]">
          {renderContent()}
        </div>
      </div>
    </MantleContext.Provider>
  );
};

export default Campaigns;
