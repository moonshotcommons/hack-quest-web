'use client';
import Sidebar, { SidebarItemType } from '@/components/Web/Business/Sidebar';
import { FC, useContext, useEffect, useMemo, useState } from 'react';
import { lessonTypeData } from './constant';
import { CompleteStateType, UGCCourseType } from '@/service/webApi/course/type';
import { useCourseStore } from '@/store/zustand/courseStore';
import { useRequest } from 'ahooks';
import webApi from '@/service';
import { useGetLessonLink } from '@/hooks/courses/useGetLessonLink';
import { useRedirect } from '@/hooks/router/useRedirect';
import { useLearnStore } from '@/store/zustand/learnStore';
import {
  NavbarDataType,
  UgcContext
} from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/learn/constants/type';

interface UgcSidebarProps {}

const UgcSidebar: FC<UgcSidebarProps> = () => {
  const { setNavbarData, lesson } = useContext(UgcContext);
  const [course, setCourse] = useState<UGCCourseType>();

  const sidebarOpen = useLearnStore((state) => state.sidebarOpen);
  const setSidebarOpen = useLearnStore((state) => state.setSidebarOpen);

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
          // const disable =
          //   page.state === CompleteStateType.NOT_STARTED &&
          //   prevLessonState !== CompleteStateType.COMPLETED;
          const disable = false;
          const newPage = {
            key: page.id,
            disable,
            label: (
              <div
                className={`flex w-full items-center justify-between ${
                  disable ? 'cursor-not-allowed' : ''
                }`}
              >
                <div className="flex flex-1 shrink-0 flex-col overflow-hidden pr-5">
                  <span className="body-m line-clamp-2 w-full break-words text-neutral-black">
                    {page.title}
                  </span>
                  <span className="caption-12pt text-neutral-black">
                    {lessonTypeData[page.type].label}
                  </span>
                </div>
                {page.state !== CompleteStateType.COMPLETED && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-rich-gray">
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
      manual: true,
      onSuccess(res: unknown) {
        setCourse(res as UGCCourseType);
      },
      cacheKey: lesson?.courseId
    }
  );

  const getNavbar = () => {
    if (!course) return;
    const units = course.units!.find((unit) =>
      unit.pages.find((page) => page.id === lesson.id)
    );
    const unitName = units?.title;
    const lessonName = units?.pages.find(
      (page) => page.id === lesson.id
    )?.title;
    const navbarData = [
      { label: course.title },
      { label: unitName },
      { label: lessonName }
    ];
    setNavbarData(navbarData as NavbarDataType[]);
  };

  useEffect(() => {
    if (lesson) run();
  }, [lesson]);

  useEffect(() => {
    course && setLearnPageTitle(course.title);
    getNavbar();
  }, [course]);

  if (!lesson || !course) return null;

  if (!sidebarOpen) return false;

  return (
    <div className="absolute left-0 z-50 h-full w-full">
      <div
        className="h-full w-full bg-neutral-black opacity-50"
        onClick={() => setSidebarOpen(false)}
      ></div>
      <div className="absolute left-0 top-0 h-full w-4/5 overflow-hidden">
        <Sidebar
          title={course.title}
          items={items}
          className="h-full w-full"
          defaultSelect={lesson.id}
          open={sidebarOpen}
          isCustomOpen={true}
          defaultOpenKeys={defaultOpenKeys}
          onSelect={(key, item: any) => {
            if (item.id === lesson.id) return;
            const link = getLink(course.type, key, course.title);
            setSidebarOpen(false);
            redirectToUrl(link);
          }}
          onShowListChange={(showList) => setSidebarOpen(showList)}
        ></Sidebar>
      </div>
    </div>
  );
};

export default UgcSidebar;
