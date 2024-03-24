import { LearningTrackDetailType } from '@/service/webApi/learningTrack/type';
import LearningTrackImg from '@/public/images/home/learningtrack_img.png';
import Image from 'next/image';
import React, { MouseEvent } from 'react';
import CardProgress from '@/components/Web/Business/CardProgress';
import Button from '@/components/Common/Button';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { useRedirect } from '@/hooks/router/useRedirect';
import CourseTags from '@/components/Web/Business/CourseTags';
import TrackTag from '@/components/Common/TrackTag';
import CompletedIcon from '@/components/Common/Icon/Completed';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface LearningTrackCardProp {
  learningTrack: LearningTrackDetailType;
  inProgress: Boolean;
}

const LearningTrackCard: React.FC<LearningTrackCardProp> = ({
  learningTrack,
  inProgress
}) => {
  const { jumpLearningLesson, loading: jumpLoading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const goLearningTrackDetail = () => {
    BurialPoint.track('dashboard-learning track卡片点击');
    redirectToUrl(`${MenuLink.LEARNING_TRACK}/${learningTrack.id}`);
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
      className="card-hover relative flex h-[192px] w-full items-center gap-[30px]  overflow-hidden rounded-[16px] bg-neutral-white p-[16px]"
      onClick={goLearningTrackDetail}
    >
      {!inProgress && (
        <div className="absolute right-[16px] top-[16px] z-10">
          <CompletedIcon />
        </div>
      )}
      <div className="relative h-[160px] w-[160px]">
        <Image
          src={learningTrack.image || LearningTrackImg}
          fill
          alt="learning-track-img"
          className="object-cover"
        ></Image>
      </div>
      <div
        className={`flex h-full flex-1 flex-shrink-0  flex-col justify-between ${inProgress ? 'py-[16px]' : ''}`}
      >
        <TrackTag track={learningTrack.track} />
        <div>
          <div className="body-m-bold line-clamp-1 text-neutral-off-black">
            {learningTrack.name}
          </div>
          {!inProgress && (
            <div className="body-s mt-[8px] line-clamp-2 text-neutral-medium-gray">
              {learningTrack.description}
            </div>
          )}
        </div>

        <CourseTags
          language={learningTrack.language}
          level={learningTrack?.level as string}
          unitCount={learningTrack?.courseCount}
          type={'learning-track'}
        ></CourseTags>
        {inProgress && (
          <div className="max-w-[318px]">
            <CardProgress progress={learningTrack.progress || 0} />
          </div>
        )}
      </div>
      {inProgress && (
        <Button
          className="button-text-m h-[51px] w-[223px] bg-yellow-primary text-neutral-off-black"
          loading={jumpLoading}
          disabled={jumpLoading}
          onClick={handleContinue}
        >
          CONTINUE
        </Button>
      )}
    </div>
  );
};

export default LearningTrackCard;
