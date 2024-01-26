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
import CourseTags from '@/components/Web/Business/CourseTags';
import TrackTag from '@/components/Common/TrackTag';

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
      className="h-[192px] w-full p-[16px] flex items-center gap-[30px]  rounded-[16px] bg-neutral-white overflow-hidden card-hover"
      onClick={goLearningTrackDetail}
    >
      <div className="w-[160px] h-[160px] relative">
        <Image
          src={learningTrack.image || LearningTrackImg}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
      <div className="h-full flex flex-col justify-between py-[16px] flex-1 flex-shrink-0">
        <TrackTag track={learningTrack.track} />
        <div className="body-m-bold line-clamp-1 text-neutral-off-black">
          {learningTrack.name}
        </div>
        <CourseTags
          language={learningTrack.language}
          level={learningTrack?.level as string}
          unitCount={learningTrack?.courseCount}
          type={'learning-track'}
        ></CourseTags>
        <div className="max-w-[318px]">
          <CardProgress progress={learningTrack.progress || 0} />
        </div>
      </div>
      <Button
        className="w-[223px] h-[51px] bg-yellow-primary text-neutral-off-black button-text-m"
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
