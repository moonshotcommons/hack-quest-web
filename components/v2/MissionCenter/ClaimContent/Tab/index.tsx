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
              ? 'text-[#0B0B0B] bg-[#FFF4CE]'
              : i === curIndex
              ? 'bg-[#fff] text-[#000] font-next-book-bold'
              : 'bg-[#DADADA] text-[#8c8c8c]'
          } ${
            curIndex === i ? 'border-t-[10px] border-[#FFD850] pb-[10px]' : ''
          }`}
          style={{
            boxShadow: `0 -3px 6px #dadada`
          }}
          onClick={() => changeTab(i)}
        >
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
