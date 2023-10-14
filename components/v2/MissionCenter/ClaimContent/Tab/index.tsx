import React from 'react';
import { TabListType } from '../../type';
import Badge from '@/components/Common/Badge';
interface TabProp {
  tabList: TabListType[];
  curIndex: number;
  changeTab: (i: number) => void;
}

const Tab: React.FC<TabProp> = ({ tabList, curIndex, changeTab }) => {
  return (
    <div className="flex gap-[10px]">
      {tabList.map((v, i) => (
        <div
          key={v.label}
          className={`w-[200px] h-[56px] flex-center relative rounded-t-[10px] overflow-hidden cursor-pointer  ${
            !curIndex && curIndex === i
              ? 'text-[#fff] bg-[#000]'
              : i === curIndex
              ? 'bg-[#fff] text-[#000] font-next-book-bold'
              : 'bg-[#DADADA] text-[#8c8c8c]'
          }`}
          onClick={() => changeTab(i)}
        >
          {i === curIndex && (
            <div className="absolute left-0 top-0 w-full h-[10px] bg-[#FFD850]"></div>
          )}
          <div className="relative">
            <span>{v.label}</span>
            <Badge count={v.count || 0} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tab;
