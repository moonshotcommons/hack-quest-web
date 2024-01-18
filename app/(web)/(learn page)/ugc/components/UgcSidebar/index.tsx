'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { FC, useMemo } from 'react';
import { lessonTypeData } from './constant';
import { UGCCourseType } from '@/service/webApi/course/type';

interface UgcSidebarProps {
  course: UGCCourseType;
}

const UgcSidebar: FC<UgcSidebarProps> = ({ course }) => {
  const items: SidebarItemType[] = useMemo(() => {
    return course.units!.map((unit) => {
      return {
        key: unit.id,
        label: unit.name,
        data: unit,
        type: 'group',
        children: unit.pages!.map((page) => {
          return {
            key: page.id,
            label: (
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col pr-5 flex-1 overflow-hidden shrink-0">
                  <span className="w-full body-m text-neutral-black break-words line-clamp-2">
                    {page.name}
                  </span>
                  <span className="caption-12pt text-neutral-black">
                    {lessonTypeData[page.type].label}
                  </span>
                </div>
                <div className="w-6 h-6 rounded-full border border-neutral-rich-gray flex justify-center items-center">
                  {lessonTypeData[page.type].icon}
                </div>
              </div>
            ),
            type: 'item',
            data: page
          };
        })
      };
    });
  }, []);

  return (
    <Sidebar
      title={course.name}
      items={items}
      className="w-[18.5rem] h-full"
      defaultSelect={items[0].children![0].key}
      onSelect={(key, item) => {
        console.log(key, item);
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
