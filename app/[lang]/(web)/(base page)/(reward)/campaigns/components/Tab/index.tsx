import React from 'react';
import Badge from '@/components/Common/Badge';
import { TabListType } from '../../constants/type';

interface TabProp {
  curId: string;
  changeTab: (id: string) => void;
  tabList: TabListType[];
}

const Tab: React.FC<TabProp> = ({ tabList, curId, changeTab }) => {
  const handleClickTab = (id: string) => {
    if (curId === id) return;
    changeTab(id);
  };
  return (
    <div className="flex flex-col gap-[10px]">
      {tabList.map((tab) => (
        <div
          key={tab.value}
          className={`flex-center body-s h-[56px] cursor-pointer rounded-l-[10px] border-l-[10px] pr-[5px] ${
            curId === tab.value
              ? 'body-s-bold border-l-yellow-primary bg-neutral-white text-neutral-black shadow-[0_4px_8px_rgba(0,0,0,0.12)]'
              : 'border-l-transparent bg-[#e7e7e7] text-[#888]'
          }`}
          onClick={() => handleClickTab(tab.value)}
        >
          <div className="relative">
            <span>{tab.label}</span>
            <Badge count={tab.count || 0} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;
