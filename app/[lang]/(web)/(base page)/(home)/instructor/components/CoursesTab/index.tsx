'use client';
import React from 'react';
import { CourseTab, TabType } from '../../constants/type';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import Button from '@/components/Common/Button';

import { useRedirect } from '@/hooks/router/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { CreationPageKey } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/type';

interface CoursesTabProp {
  curTab: CourseTab;
  changeTab: (val: CourseTab) => void;
  courseTab: TabType[];
}

const CoursesTab: React.FC<CoursesTabProp> = ({
  curTab,
  changeTab,
  courseTab
}) => {
  const { redirectToUrl } = useRedirect();

  return (
    <div className="mb-[32px] flex items-center justify-between">
      <SlideHighlight
        className={`flex gap-[30px] pb-[2px]`}
        type="LEARNING_TRACK"
        currentIndex={courseTab.findIndex((v) => v.value === curTab)}
      >
        {courseTab.map((v) => (
          <div
            key={v.value}
            onClick={() => changeTab(v.value as CourseTab)}
            className={`body-l cursor-pointer  text-neutral-black ${
              curTab === v.value ? '  body-l-bold ' : ' '
            }`}
          >
            {`${v.label} (${v.count})`}
          </div>
        ))}
      </SlideHighlight>
      <Button
        type="primary"
        className="button-text-m h-[48px] w-[165px] uppercase"
        onClick={() =>
          redirectToUrl(
            `${MenuLink.UGC}/-1/creation/${CreationPageKey.Introduction}`
          )
        }
      >
        create new
      </Button>
    </div>
  );
};

export default CoursesTab;
