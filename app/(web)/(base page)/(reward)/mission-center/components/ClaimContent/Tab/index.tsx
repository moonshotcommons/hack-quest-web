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
          className={`flex-center body-s relative h-[56px] w-[200px] cursor-pointer overflow-hidden rounded-t-[10px]  ${
            !curIndex && curIndex === i
              ? 'bg-[#FFF4CE] text-neutral-black'
              : i === curIndex
                ? 'body-s-bold bg-neutral-white text-neutral-black'
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
