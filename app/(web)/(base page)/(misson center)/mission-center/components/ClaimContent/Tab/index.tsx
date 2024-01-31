import React from 'react';
import Badge from '@/components/Common/Badge';
import { TabListType } from '../../../constants/type';
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
              ? 'text-neutral-black bg-[#FFF4CE]'
              : i === curIndex
              ? 'bg-[#fff] text-neutral-black font-next-book-bold'
              : 'bg-[#DADADA] text-neutral-medium-gray'
          } ${
            curIndex === i
              ? 'border-t-[10px] border-yellow-primary pb-[10px]'
              : ''
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
