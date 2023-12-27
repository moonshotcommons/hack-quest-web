import LearningImage from '@/public/images/home/learningtrack_img.png';
import { LearningTrackCourseType } from '@/service/webApi/course/type';
import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import Image from 'next/image';
import React, { useEffect, useMemo, useState } from 'react';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import { cn } from '@/helper/utils';
interface LearningTrackCardProps {
  learningTrack: LearningTrackDetailType;
  isLandingPage?: boolean;
  status?: LearningTrackCourseType;
  className?: string;
}
const LearningTrackCard: React.FC<LearningTrackCardProps> = ({
  learningTrack: track,
  isLandingPage,
  status,
  className
}) => {
  const { redirectToUrl } = useRedirect();
  const [learningTrack, setLearningTrack] =
    useState<LearningTrackDetailType>(track);
  const learningTrackStatus = useMemo(() => {
    if (status) return status;
    const { progress } = learningTrack;
    if (learningTrack.enrolled && progress > 0 && progress < 1) {
      return LearningTrackCourseType.IN_PROCESS;
    } else if (progress >= 1) {
      return LearningTrackCourseType.COMPLETED;
    } else {
      return LearningTrackCourseType.UN_ENROLL;
    }
  }, [learningTrack, status]);

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
        'h-[264px] w-full  p-[32px] cursor-pointer rounded-[24px] bg-[#fff] overflow-hidden flex items-center gap-[16px] hover:-translate-y-1 transition-all duration-300  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]',
        className
      )}
      onClick={goLearningTrackDetail}
    >
      <div className="flex-1 h-full flex flex-col flex-shrink-0 justify-between">
        <div className="text-[12px] w-fit px-[10px] py-[4px] text-[#131313] border border-[#3E3E3E] rounded-[20px] ">
          Basic
        </div>
        <div>
          <div className="text-[#131313] text-[18px] line-clamp-1">
            {learningTrack.name}
          </div>
          <div className="text-[14px] h-[66px] text-[#8C8C8C] leading-[22.4px] line-clamp-3 mt-[8px]">
            {learningTrack.description}
          </div>
        </div>
        <div>
          <CourseTags
            alt={learningTrack?.language}
            level={learningTrack?.level as string}
            unitCount={learningTrack?.courseCount}
            type={'learning-track'}
          ></CourseTags>
        </div>
      </div>
      <div className="w-[200px] h-[200px] relative">
        <Image
          src={LearningImage}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
    </div>
  );
};

export default LearningTrackCard;
