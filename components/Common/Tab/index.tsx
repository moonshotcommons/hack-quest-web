import { TabType } from '@/constants/enum';
import { FC, ReactNode, useState } from 'react';

export interface TabItem {
  title: ReactNode;
  type: TabType;
}

interface TabProps {
  // children: ReactNode;
  onSelect?: (item: any) => void;
  selectField?: keyof TabItem;
  tabs: TabItem[];
  defaultSelect?: TabType;
}

const renderSelectState = (type: TabType) => {
  switch (type) {
    case TabType.SYNTAX:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
      );
    case TabType.GUIDED_PROJECT:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#5C1DE6] to-[#1B7DEC]"></div>
      );
    case TabType.CONCEPT_LEARNING:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div>
      );
    case TabType.TEASER:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#8E8E8E] to-[#FFF]"></div>
      );
  }
};

const Tab: FC<TabProps> = (props) => {
  const { onSelect, tabs, selectField, defaultSelect } = props;
  const [selectTab, setSelectTab] = useState<TabType>(
    defaultSelect || tabs[0].type
  );

  return (
    <div className="relative flex gap-[5rem] items-center h-16 top-line bottom-line">
      {tabs.map((item) => {
        return (
          <div
            key={item.type}
            className={`relative h-full flex items-center cursor-pointer text-[#F1F1F1] ${
              selectTab === item.type
                ? 'font-next-poster-Bold text-base'
                : 'font-next-poster-Thin font-thin text-base'
            }`}
            onClick={() => {
              setSelectTab(item.type);
              onSelect?.(selectField ? item[`${selectField}`] : item);
            }}
          >
            <h2>{item.title}</h2>
            {selectTab === item.type ? renderSelectState(selectTab) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
