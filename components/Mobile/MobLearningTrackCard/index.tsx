import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import { cn } from '@/helper/utils';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
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

  useEffect(() => {
    setLearningTrack(track);
  }, [track]);

  const goLearningTrackDetail = (e: any) => {
    if (isLandingPage) return;
    redirectToUrl(
      `${menuLink.learningTrack}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  return (
    <div
      className={cn(
        ' w-full  p-[1.25rem] flex flex-col gap-[1.25rem] rounded-[1rem] bg-neutral-white overflow-hidden',
        className
      )}
      onClick={goLearningTrackDetail}
    >
      <div className="flex w-full justify-between">
        <div className="caption-12pt h-fit w-fit px-[.75rem] py-[0.25rem] text-neutral-rich-gray  border-[0.5px] border-neutral-rich-gray rounded-[1.25rem] ">
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
        <div className="w-[3rem] h-[3rem] relative">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <div className="w-[calc(100%-3rem)] text-neutral-off-black body-m-bold line-clamp-1 mt-[-1.8rem]">
        {learningTrack.name}
      </div>
      <div className="body-xs text-neutral-medium-gray  line-clamp-2">
        {learningTrack.description}
      </div>
      <div>
        <CourseTags
          language={learningTrack.language}
          level={learningTrack?.level as string}
          unitCount={learningTrack?.courseCount}
          type={'learning-track'}
          className="justify-between body-xs  text-neutral-rich-gray"
        ></CourseTags>
      </div>
    </div>
  );
};

export default MobLearningTrackCard;
