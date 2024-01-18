import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import CardProgress from '@/components/Web/Business/CardProgress';
import Button from '@/components/Common/Button';
import { MenuLink } from '@/components/Layout/Navbar/type';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useRedirect } from '@/hooks/useRedirect';

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
      const course = section.courses.find((v) => {
        const progress = v.progress || 0;
        return progress < 1;
      });
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
      className="h-[228px] w-full p-[16px] flex flex-col justify-between cursor-pointer rounded-[16px] bg-[var(--neutral-white)] overflow-hidden hover:-translate-y-1 transition-all duration-300  hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]"
      onClick={goLearningTrackDetail}
    >
      <div className="flex justify-between">
        <div className="h-[100px]  flex-1 flex-shrink-0 pr-[30px]">
          <div className="button-text-s w-fit mb-[16px] px-[10px] py-[4px] text-[var(--neutral-off-black)] border border-neutral-off-black rounded-[20px] ">
            {learningTrack.track}
          </div>
          <div className="text-h4 line-clamp-2 text-neutral-off-black">
            {learningTrack.name}
          </div>
        </div>
        <div className="w-[100px] h-[100px] relative">
          <Image
            src={learningTrack.image || LearningTrackImg}
            fill
            alt="learning-track-img"
            className="object-cover"
          ></Image>
        </div>
      </div>
      <CardProgress progress={learningTrack.progress || 0} />
      <Button
        className="w-full h-[49px] bg-yellow-primary text-neutral-off-black"
        loading={jumpLoading}
        onClick={handleContinue}
      >
        CONTINUE
      </Button>
    </div>
  );
};

export default LearningTrackCardInProgress;
