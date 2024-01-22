'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { lessonTypeData } from './constant';
import { CompleteStateType, UGCCourseType } from '@/service/webApi/course/type';
import { UgcContext, NavbarDataType } from '../../constants/type';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/useCoursesHooks/useGetLessonLink';
import { useRedirect } from '@/hooks/useRedirect';

interface UgcSidebarProps {}

const UgcSidebar: FC<UgcSidebarProps> = () => {
  const { setNavbarData, lesson } = useContext(UgcContext);
  const [course, setCourse] = useState<UGCCourseType>();
  const setLearnPageTitle = useCourseStore((state) => state.setLearnPageTitle);
  const { getLink } = useGetLessonLink();
  const { redirectToUrl } = useRedirect();

  const { items, defaultOpenKeys } = useMemo(() => {
    let defaultOpenKeys: string[] = [];
    let items: SidebarItemType[] = [];
    if (!course || !lesson)
      return {
        defaultOpenKeys,
        items
      };
    items = course.units!.map((unit) => {
      let prevLessonState = CompleteStateType.COMPLETED;
      return {
        key: unit.id,
        label: unit.title,
        data: unit,
        type: 'group',
        children: unit.pages!.map((page, i) => {
          if (page.id === lesson.id) defaultOpenKeys.push(unit.id);
          const disable =
            page.state === CompleteStateType.NOT_STARTED &&
            prevLessonState !== CompleteStateType.COMPLETED;
          const newPage = {
            key: page.id,
            disable,
            label: (
              <div
                className={`flex w-full justify-between items-center ${
                  disable ? 'cursor-not-allowed' : ''
                }`}
              >
                <div className="flex flex-col pr-5 flex-1 overflow-hidden shrink-0">
                  <span className="w-full body-m text-neutral-black break-words line-clamp-2">
                    {page.title}
                  </span>
                  <span className="caption-12pt text-neutral-black">
                    {lessonTypeData[page.type].label}
                  </span>
                </div>
                {page.state !== CompleteStateType.COMPLETED && (
                  <div className="w-6 h-6 rounded-full border border-neutral-rich-gray flex justify-center items-center">
                    {lessonTypeData[page.type].icon}
                  </div>
                )}
                {page.state === CompleteStateType.COMPLETED && (
                  <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12.5" r="12" fill="#00C365" />
                    <path
                      d="M6 12.4999L10.8 17.2999L19.2 8.8999"
                      stroke="white"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            ),
            type: 'item',
            data: page
          };
          prevLessonState = page.state;
          return newPage as any;
        })
      };
    });

    return {
      defaultOpenKeys,
      items: items
    };
  }, [lesson, course]);

  const { run } = useRequest(
    () => {
      return webApi.courseApi.getCourseDetail(lesson?.courseId, true, true);
    },
    {
      manual: false,
      onSuccess(res: unknown) {
        setCourse(res as UGCCourseType);
      },
      cacheKey: lesson?.courseId
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
    if (lesson) run();
  }, [lesson]);

  useEffect(() => {
    course && setLearnPageTitle(course.title);
    getNavbar(items[0]?.children?.[0]);
  }, [course]);

  if (!lesson || !course) return null;

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
