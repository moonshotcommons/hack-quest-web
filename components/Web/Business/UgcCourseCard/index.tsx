'use client';
import React, { MouseEvent } from 'react';
import Image from 'next/image';
import TrackTag from '@/components/Common/TrackTag';
import Button from '@/components/Common/Button';
import { CourseTab } from '@/app/[lang]/(web)/(base page)/(home)/instructor/constants/type';
import UgcTags from './UgcTags';
import { UGCCourseType } from '@/service/webApi/course/type';
import { MenuLink } from '../../Layout/BasePage/Navbar/type';
import UgcCardCover from '@/public/images/home/instructor_cover.png';
import { useRedirect } from '@/hooks/useRedirect';
import { CreationPageKey } from '@/app/[lang]/(web)/(learn page)/ugc/[courseId]/creation/constant/type';

interface UgcCourseCardProp {
  isPublic?: boolean;
  course: UGCCourseType;
}

const UgcCourseCard: React.FC<UgcCourseCardProp> = ({
  isPublic = true,
  course
}) => {
  const status = course.status;
  const { redirectToUrl } = useRedirect();
  const goEdit = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    redirectToUrl(
      `${MenuLink.UGC}/${course.id}/creation/${CreationPageKey.Introduction}`
    );
  };
  const goDetail = () => {
    redirectToUrl(` ${MenuLink.COURSE_MARKET}/${course.id}`);
  };
  const renderButton = () => {
    switch (status) {
      case CourseTab.PUBLISHED:
        return (
          <>
            <Button
              type="primary"
              className="button-text-s h-[34px] flex-1 uppercase"
            >
              Preview
            </Button>
            <Button
              ghost
              onClick={goEdit}
              className="button-text-s h-[34px] flex-1 border-neutral-black uppercase"
            >
              edit
            </Button>
          </>
        );
      case CourseTab.DRAFT:
        return (
          <>
            <Button
              type="primary"
              onClick={goEdit}
              className="button-text-s h-[34px] flex-1 uppercase"
            >
              edit & publish
            </Button>
          </>
        );
      case CourseTab.UNDER_REVIEW:
        return (
          <>
            <Button
              ghost
              className="button-text-s h-[34px] flex-1 border-neutral-black uppercase"
            >
              revoke
            </Button>
          </>
        );
      case CourseTab.UNPUBLISHED:
        return (
          <>
            <Button
              type="primary"
              className="button-text-s h-[34px] flex-1 p-0 uppercase"
            >
              Preview
            </Button>
            <Button
              ghost
              onClick={goEdit}
              className="button-text-s h-[34px] flex-1 border-neutral-black p-0 uppercase"
            >
              edit & publish
            </Button>
          </>
        );
    }
  };
  return (
    <div
      onClick={goDetail}
      className="card-hover block overflow-hidden rounded-[16px] bg-neutral-white text-neutral-off-black"
    >
      <div className="relative h-0 w-full pt-[56%]">
        <Image
          src={course.image || UgcCardCover}
          alt="instructorCover"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex h-[216px] flex-col justify-between p-[16px]">
        <div className="flex flex-col gap-[16px]">
          <TrackTag track={course.track} />
          <div className="body-m-bold line-clamp-2">{course.title}</div>
          {isPublic && (
            <div className="body-s line-clamp-2 text-neutral-medium-gray">
              {course.description}
            </div>
          )}
        </div>
        {!isPublic ? (
          <div className="flex flex-col gap-[16px]">
            <UgcTags isPublic={isPublic} course={course} />
            <div className="flex justify-between gap-[8px]">
              {renderButton()}
            </div>
          </div>
        ) : (
          <UgcTags isPublic={isPublic} course={course} />
        )}
      </div>
    </div>
  );
};

export default UgcCourseCard;
