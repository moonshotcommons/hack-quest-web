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
        <div className="absolute -top-2 left-0 h-1 w-full rounded-xl bg-gradient-to-t from-[#0891D5] to-[#38C1A5]"></div>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <div className="absolute -top-2 left-0 h-1 w-full rounded-xl bg-gradient-to-t from-[#5C1DE6] to-[#1B7DEC]"></div>
      );
    case CourseType.CONCEPT:
      return (
        <div className="absolute -top-2 left-0 h-1 w-full rounded-xl bg-gradient-to-t from-[#EB3E1C] to-[#E0AD38]"></div>
      );
    case CourseType.TEASER:
      return (
        <div className="absolute -top-2 left-0 h-1 w-full rounded-xl bg-gradient-to-t from-[#8E8E8E] to-[#FFF]"></div>
      );
  }
};

const Tab: FC<TabProps> = (props) => {
  const { onSelect, tabs, selectField, defaultSelect } = props;
  const [selectTab, setSelectTab] = useState<CourseType>(
    defaultSelect || tabs[0].type
  );

  return (
    <div className="top-line bottom-line test-wrap relative flex h-16 w-[102%] items-center gap-[5rem]">
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
            className={`relative ${classes} test-wrap-item flex h-full cursor-pointer items-center text-course-card-title-text-color ${
              selectTab === item.type
                ? 'font-next-poster-Bold text-base'
                : 'font-next-poster-Thin text-base font-thin'
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
