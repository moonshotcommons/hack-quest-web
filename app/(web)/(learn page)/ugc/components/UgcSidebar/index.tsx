'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { FC, useContext, useEffect, useMemo } from 'react';
import { lessonTypeData } from './constant';
import { UGCCourseType } from '@/service/webApi/course/type';
import { UgcContext, NavbarDataType } from '../../constants/type';
import { useCourseStore } from '@/store/zustand/courseStore';

interface UgcSidebarProps {
  course: UGCCourseType;
}

const UgcSidebar: FC<UgcSidebarProps> = ({ course }) => {
  const { setNavbarData } = useContext(UgcContext);
  const setLearnPageTitle = useCourseStore((state) => state.setLearnPageTitle);
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

  const getNavbar = (item: any) => {
    if (!item) return;
    const unitName = course.units!.find((unit) =>
      unit.pages.find((page) => page.id === item.key)
    )?.name;
    const navbarData = [
      { label: course.name },
      { label: unitName },
      { label: item.data.name }
    ];
    setNavbarData(navbarData as NavbarDataType[]);
  };
  useEffect(() => {
    setLearnPageTitle(course.name);
    getNavbar(items[0]?.children?.[0]);
  }, []);

  return (
    <Sidebar
      title={course.name}
      items={items}
      className="w-[18.5rem] h-full"
      defaultSelect={items[0].children![0].key}
      onSelect={(key, item) => {
        console.log(key, item);
        getNavbar(item as SidebarItemType);
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
