import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import { CourseType } from '@/service/webApi/course/type';
import { FC, useCallback, useRef } from 'react';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { useRedirect } from '@/hooks/router/useRedirect';
import MobMiniElectiveDetailModal, { MiniElectiveDetailModalRef } from '../MobMiniElectiveDetailModal';
import { ElectiveCourseType } from '@/service/webApi/elective/type';
import MobCardProgress from '../MobCardProgress';
import { MenuLink } from '@/components/Web/Layout/BasePage/Navbar/type';

interface ElectiveCardProps {
  // children: ReactNode;
  course: ElectiveCourseType;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
  onCourseClick?: (course: ElectiveCourseType) => void;
  from?: 'dashboard' | 'elective';
}

const MobElectiveCard: FC<ElectiveCardProps> = (props) => {
  const { course, inProgress = false, from = 'elective' } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();
  const miniElectiveDetailInstance = useRef<MiniElectiveDetailModalRef>(null);

  const onCourseClick = useCallback(() => {
    switch (course.type) {
      // case CourseType.MINI:
      //   miniElectiveDetailInstance.current?.open(course);
      //   return;
      case CourseType.UGC:
        redirectToUrl(`${MenuLink.PRACTICES}/${course.id}`);
        return;
      default:
        redirectToUrl(`${MenuLink.ELECTIVES}/${course.id}`);
        return;
      // jumpLearningLesson(course, {
      //   menu: 'electives',
      //   idTypes: [QueryIdType.MENU_COURSE_ID],
      //   ids: [course.id]
      // });
    }
  }, [course]);

  return (
    <>
      <div
        className={cn(
          'relative flex w-full cursor-pointer flex-col gap-[1rem] overflow-hidden rounded-[1rem] bg-neutral-white p-[1rem]'
        )}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', {
            courseName: course.title
          });
          onCourseClick();
        }}
      >
        {course.progress && course.progress >= 1 ? (
          <div className="absolute right-[1rem] top-[1rem]">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="16" fill="#00C365" />
              <path d="M8 15.9999L14.4 22.3999L25.6 11.1999" stroke="white" strokeLinecap="round" />
            </svg>
          </div>
        ) : null}
        <div className="caption-12pt h-fit w-fit rounded-[1.25rem] border-[0.5px] border-neutral-rich-gray  px-[.75rem] py-[0.25rem] text-neutral-rich-gray ">
          {course.track}
        </div>
        <div className="body-m-bold text-neutral-dark-gray">{course.title}</div>
        {from === 'dashboard' && inProgress ? (
          <>
            <MobCardProgress progress={course.progress || 0} />
            <Button
              className="h-[48px] w-full bg-yellow-primary text-neutral-off-black"
              loading={loading}
              disabled={loading}
              onClick={(e) => {
                BurialPoint.track('home-course卡片resume按钮点击', {
                  courseName: course.title
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
          <>
            <p className="body-xs  line-clamp-2 text-neutral-medium-gray">{course.description}</p>
          </>
        )}
      </div>
      <MobMiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </>
  );
};

export default MobElectiveCard;
