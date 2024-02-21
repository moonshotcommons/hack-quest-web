import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import Button from '@/components/Common/Button';
import { MenuLink } from '@/components/Layout/Navbar/type';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useRedirect } from '@/hooks/useRedirect';
import MobCardProgress from '@/components/Mobile/MobCardProgress';

interface LearningTrackCardInProgressProp {
  learningTrack: LearningTrackDetailType;
}

const LearningTrackCardInProgress: React.FC<
  LearningTrackCardInProgressProp
> = ({ learningTrack }) => {
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const goLearningTrackDetail = () => {
    BurialPoint.track('dashboard-learning track卡片点击');
    redirectToUrl(
      `${MenuLink.LEARNING_TRACK}/${learningTrack.id}?${QueryIdType.LEARNING_TRACK_ID}=${learningTrack.id}&menu=${Menu.LEARNING_TRACK}`
    );
  };

  const handleContinue = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    BurialPoint.track('dashboard-learning track卡片continue按钮点击', {
      learningTrackName: learningTrack.name
    });
    const section = learningTrack.sections.find((v) => (v?.progress || 0) < 1);
    if (section) {
      const course = section.courses.find((v) => (v?.progress || 0) < 1);
      if (course)
        jumpLearningLesson(course, {
          menu: Menu.LEARNING_TRACK,
          idTypes: [QueryIdType.LEARNING_TRACK_ID, QueryIdType.MENU_COURSE_ID],
          ids: [learningTrack.id, course.id]
        });
    }
  };

  return (
    <div
      className="relative flex w-full flex-col gap-[1rem] overflow-hidden rounded-[16px] bg-neutral-white p-[1rem]"
      onClick={goLearningTrackDetail}
    >
      <div className="absolute right-[16px] top-[1rem]">
        <div className="relative h-[3rem] w-[3rem]">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <div className="caption-12pt h-fit w-fit rounded-[1.25rem] border-[0.5px] border-neutral-rich-gray  px-[.75rem] py-[0.25rem] text-neutral-rich-gray">
        {learningTrack.track}
      </div>
      <div className="body-m-bold line-clamp-1 w-[calc(100%-3.125rem)] text-neutral-off-black">
        {learningTrack.name}
      </div>

      <MobCardProgress progress={learningTrack.progress || 0} />
      <Button
        className="h-[48px] w-full bg-yellow-primary text-neutral-off-black"
        loading={jumpLoading}
        disabled={jumpLoading}
        onClick={handleContinue}
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default LearningTrackCardInProgress;
