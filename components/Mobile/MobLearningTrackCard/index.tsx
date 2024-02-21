'use client';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { useRedirect } from '@/hooks/useRedirect';
import { cn } from '@/helper/utils';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';
interface MobLearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  status?: LearningTrackCourseType;
  className?: string;
  from?: 'dashboard' | 'learningTrack';
}
const MobLearningTrackCard: React.FC<MobLearningTrackCardProps> = ({
  learningTrack: track,
  isLandingPage,
  className,
  from = 'dashboard'
}) => {
  const { redirectToUrl } = useRedirect();
  const [learningTrack, setLearningTrack] =
    useState<LearningTrackDetailType>(track);

  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  useEffect(() => {
    setLearningTrack(track);
  }, [track]);

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(
      `${MenuLink.LEARNING_TRACK}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  // const handleContinue = (e: MouseEvent<HTMLElement>) => {
  //   e.stopPropagation();
  //   const section = learningTrack.sections.find((v) => (v?.progress || 0) < 1);
  //   if (section) {
  //     const course = section.courses.find((v) => (v?.progress || 0) < 1);
  //     if (course)
  //       jumpLearningLesson(course, {
  //         menu: Menu.LEARNING_TRACK,
  //         idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
  //         ids: [learningTrack.id, course.id]
  //       });
  //   }
  // };

  return (
    <div
      className={cn(
        ' flex  w-full flex-col gap-[1.25rem] overflow-hidden rounded-[1rem] bg-neutral-white p-[1.25rem]',
        className
      )}
      onClick={goLearningTrackDetail}
    >
      <div className="flex w-full justify-between">
        <div className="caption-12pt h-fit w-fit rounded-[1.25rem] border-[0.5px] border-neutral-rich-gray  px-[.75rem] py-[0.25rem] text-neutral-rich-gray ">
          {learningTrack.track}
        </div>
        {from === 'dashboard' && learningTrack.progress === 1 && (
          <div className={`h-[3rem]`}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="16" cy="16" r="16" fill="#00C365" />
              <path
                d="M8 15.9999L14.4 22.3999L25.6 11.1999"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
          </div>
        )}
        <div className="relative h-[3rem] w-[3rem]">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <div className="body-m-bold mt-[-1.8rem] line-clamp-1 w-[calc(100%-3rem)] text-neutral-off-black">
        {learningTrack.name}
      </div>
      <div className="body-xs line-clamp-2  text-neutral-medium-gray">
        {learningTrack.description}
      </div>
      <div>
        <CourseTags
          language={learningTrack.language}
          level={learningTrack?.level as string}
          unitCount={learningTrack?.courseCount}
          type={'learning-track'}
          className="body-xs justify-between  text-neutral-rich-gray"
        ></CourseTags>
      </div>
    </div>
  );
};

export default MobLearningTrackCard;
