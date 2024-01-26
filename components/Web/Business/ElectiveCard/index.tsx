import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseType } from '@/service/webApi/course/type';
import Image from 'next/image';
import { FC, useCallback, useRef } from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { useRedirect } from '@/hooks/useRedirect';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '../MiniElectiveDetailModal';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import { MenuLink } from '@/components/Layout/Navbar/type';
import CardProgress from '../CardProgress';
import Logo from '@/public/images/logo/logo.svg';
import TrackTag from '@/components/Common/TrackTag';
interface ElectiveCardProps {
  // children: ReactNode;
  course: ElectiveCourseType;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
  onCourseClick?: (course: ElectiveCourseType) => void;
  from?: 'dashboard' | 'project';
  className?: string;
}

const ElectiveCard: FC<ElectiveCardProps> = (props) => {
  const {
    course,
    inProgress = false,
    inCompleted = false,
    baseProgress = false,
    onCourseClick: courseClick,
    from = 'elective',
    className = ''
  } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const miniElectiveDetailInstance = useRef<MiniElectiveDetailModalRef>(null);

  const onCourseClick = useCallback(() => {
    switch (course.type) {
      case CourseType.MINI:
        miniElectiveDetailInstance.current?.open(course);
        return;
      default:
        redirectToUrl(
          `${MenuLink.ELECTIVES}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
        );
    }
  }, [course]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col rounded-[16px] h-[398px] bg-neutral-white w-full card-hover relative',
          className
        )}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', { courseName: course.name });

          onCourseClick();
        }}
      >
        {from === 'dashboard' && !!course.progress && course.progress >= 1 ? (
          <div className={`absolute top-[16px]  right-[16px] z-10`}>
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
        ) : null}
        <div
          className={`h-[182px] w-full flex items-center flex-shrink-0 justify-center relative rounded-t-2xl overflow-hidden`}
        >
          <Image
            src={course.image || ''}
            fill
            alt="cover"
            className="object-cover"
          ></Image>
        </div>
        <div
          className={`flex flex-col flex-1  p-[16px] justify-between relative`}
        >
          <div className="flex flex-col gap-[16px]">
            <TrackTag track={course.track} />
            <h2 className={`body-m-bold  line-clamp-2`}>{course.title}</h2>
            {!inProgress && (
              <div className="body-s text-neutral-medium-gray line-clamp-2">
                {course.description}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[16px]">
            {inProgress ? (
              <>
                <CardProgress progress={course.progress || 0} />
                <Button
                  type="primary"
                  className="px-0 h-[48px]  button-text-m text-neutral-off-black"
                  loading={loading}
                  disabled={loading}
                  block
                  onClick={(e) => {
                    BurialPoint.track('home-course卡片resume按钮点击', {
                      courseName: course.name
                    });
                    e.stopPropagation();
                    jumpLearningLesson(course, {
                      menu: 'electives',
                      idTypes: [QueryIdType.MENU_COURSE_ID],
                      ids: [course.id]
                    });
                  }}
                >
                  CONTINUE
                </Button>
              </>
            ) : (
              <div className="flex gap-3 items-center">
                <div className="w-[16px] h-[16px] rounded-full relative overflow-hidden">
                  <Image
                    src={course.creator?.profileImage || Logo}
                    fill
                    alt="creator"
                  ></Image>
                </div>
                <span className="body-xs-bold">
                  {course.creator?.name || `Hackquest`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <MiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </>
  );
};

export default ElectiveCard;
