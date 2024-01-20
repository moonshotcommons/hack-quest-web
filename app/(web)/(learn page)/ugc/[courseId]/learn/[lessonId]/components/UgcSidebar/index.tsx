'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { lessonTypeData } from './constant';
import { UGCCourseType } from '@/service/webApi/course/type';
import { UgcContext, NavbarDataType } from '../../constants/type';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRedirect } from '@/hooks/useRedirect';

interface UgcSidebarProps {
  lesson: any;
}

const UgcSidebar: FC<UgcSidebarProps> = ({ lesson }) => {
  const { setNavbarData } = useContext(UgcContext);
  const [course, setCourse] = useState<UGCCourseType>();
  const setLearnPageTitle = useCourseStore((state) => state.setLearnPageTitle);
  const { getLink } = useGetLessonLink();
  const { redirectToUrl } = useRedirect();

  const { items, defaultOpenKeys } = useMemo(() => {
    let defaultOpenKeys: string[] = [];
    let items: SidebarItemType[] = [];
    if (!course)
      return {
        defaultOpenKeys,
        items
      };

    items = course.units!.map((unit) => {
      return {
        key: unit.id,
        label: unit.title,
        data: unit,
        type: 'group',
        children: unit.pages!.map((page) => {
          if (page.id === lesson.id) defaultOpenKeys.push(unit.id);
          return {
            key: page.id,
            label: (
              <div className="flex w-full justify-between items-center">
                <div className="flex flex-col pr-5 flex-1 overflow-hidden shrink-0">
                  <span className="w-full body-m text-neutral-black break-words line-clamp-2">
                    {page.title}
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

    return {
      defaultOpenKeys,
      items: items
    };
  }, [lesson, course]);

  useRequest(
    () => {
      return webApi.courseApi.getCourseDetail(lesson.courseId, true, true);
    },
    {
      onSuccess(res: unknown) {
        setCourse(res as UGCCourseType);
      },
      cacheKey: lesson.courseId
    }
  );

  const getNavbar = (item: any) => {
    if (!course) return;
    const unitName = course.units!.find((unit) =>
      unit.pages.find((page) => page.id === item.key)
    )?.title;
    const navbarData = [
      { label: course.title },
      { label: unitName },
      { label: item.data.title }
    ];
    setNavbarData(navbarData as NavbarDataType[]);
  };

  useEffect(() => {
    course && setLearnPageTitle(course.title);
    getNavbar(items[0]?.children?.[0]);
  }, [course]);

  if (!course) return null;
  return (
    <Sidebar
      title={course.title}
      items={items}
      className="w-[18.5rem] h-full"
      defaultSelect={lesson.id}
      defaultOpenKeys={defaultOpenKeys}
      onSelect={(key, item: any) => {
        if (item.id === lesson.id) return;
        const link = getLink(course.type, key, course.name);
        redirectToUrl(link);
      }}
    ></Sidebar>
  );
};

export default UgcSidebar;
