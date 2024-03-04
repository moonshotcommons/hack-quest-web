'use client';
import React from 'react';
import { CourseTab } from '../../constants/type';
import SlideHighlight from '@/components/Common/Navigation/SlideHighlight';
import Button from '@/components/Common/Button';
import { courseTab } from '../../constants/data';
import { useRedirect } from '@/hooks/useRedirect';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
import { InformationKey } from '@/store/zustand/ugcCreationStore';

interface CoursesTabProp {
  curTab: CourseTab;
  changeTab: (val: CourseTab) => void;
}

const CoursesTab: React.FC<CoursesTabProp> = ({ curTab, changeTab }) => {
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
            `${MenuLink.UGC}/-1/creation/${InformationKey.Introduction}`
          )
        }
      >
        create new
      </Button>
    </div>
  );
};

export default CoursesTab;
