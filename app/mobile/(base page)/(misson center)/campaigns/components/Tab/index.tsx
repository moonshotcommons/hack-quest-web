import React from 'react';
import Badge from '@/components/Common/Badge';
import { TabListType } from '../../constants/type';

interface TabProp {
  curIndex: number;
  changeTab: (index: number) => void;
  tabList: TabListType[];
}

const Tab: React.FC<TabProp> = ({ tabList, curIndex, changeTab }) => {
  const handleClickTab = (index: number) => {
    if (curIndex === index) return;
    changeTab(index);
  };
  return (
    <div className="flex flex-col gap-[10px]">
      {tabList.map((tab, i) => (
        <div
          key={i}
          className={`flex-center h-[56px] cursor-pointer rounded-l-[10px] border-l-[10px] pr-[5px] tracking-[0.28px] ${
            i === curIndex
              ? 'border-l-yellow-primary bg-neutral-white font-next-book-bold text-neutral-black shadow-[0_4px_8px_rgba(0,0,0,0.12)]'
              : 'border-l-transparent bg-[#e7e7e7] text-[#888]'
          }`}
          onClick={() => handleClickTab(i)}
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
