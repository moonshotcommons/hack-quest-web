import { TabType } from '@/constants/enum';
import { CourseType } from '@/service/webApi/course/type';
import classNames from 'classnames';
import { FC, ReactNode, useState } from 'react';

export interface TabItem {
  title: ReactNode;
  type: CourseType;
}

interface TabProps {
  // children: ReactNode;
  onSelect?: (item: any) => void;
  selectField?: keyof TabItem;
  tabs: TabItem[];
  defaultSelect?: CourseType;
}

const renderSelectState = (type: CourseType) => {
  switch (type) {
    case CourseType.SYNTAX:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#5C1DE6] to-[#1B7DEC]"></div>
      );
    case CourseType.CONCEPT:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div>
      );
    case CourseType.TEASER:
      return (
        <div className="absolute w-full -top-2 left-0 h-1 rounded-xl bg-gradient-to-t from-[#8E8E8E] to-[#FFF]"></div>
      );
  }
};

const Tab: FC<TabProps> = (props) => {
  const { onSelect, tabs, selectField, defaultSelect } = props;
  const [selectTab, setSelectTab] = useState<CourseType>(
    defaultSelect || tabs[0].type
  );

  return (
    <div className="relative w-[102%] flex gap-[5rem] items-center h-16 top-line bottom-line test-wrap">
      {tabs.map((item) => {
        const classes = classNames({
          // 'left-0': item.type === CourseType.SYNTAX,
          // 'left-[8.875rem]': item.type === CourseType.GUIDED_PROJECT,
          // 'left-[21.0625rem]': item.type === CourseType.CONCEPT,
          // 'left-[33.5rem]': item.type === CourseType.TEASER
        });
        return (
          <div
            key={item.type}
            className={`relative ${classes} h-full flex items-center cursor-pointer text-course-card-title-text-color test-wrap-item ${
              selectTab === item.type
                ? 'font-next-poster-Bold text-base'
                : 'font-next-poster-Thin font-thin text-base'
            }`}
            onClick={() => {
              setSelectTab(item.type);
              onSelect?.(selectField ? item[`${selectField}`] : item);
            }}
          >
            <h2>
              {selectTab === item.type ? `</ ${item.title} >` : item.title}
            </h2>
            {selectTab === item.type ? renderSelectState(selectTab) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
