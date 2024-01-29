import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { FC } from 'react';
import { QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { useRedirect } from '@/hooks/useRedirect';
import MobCardProgress from '../MobCardProgress';
import Button from '@/components/Common/Button';

interface PracticeCardProps {
  // children: ReactNode;
  course: ProjectCourseType;
  from?: 'dashboard' | 'project';
  inProgress?: boolean;
}

const MobPracticeCard: FC<PracticeCardProps> = (props) => {
  const { course, from = 'project', inProgress = false } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();

  return (
    <div
      className={
        'flex flex-col w-full gap-[1rem] rounded-[1rem] p-[1rem] bg-neutral-white relative'
      }
      // onClick={() => {
      //   BurialPoint.track('home-practice卡片点击', { practice: course.name });
      //   redirectToUrl(
      //     `${menuLink.electives}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
      //   );
      // }}
      onClick={(e) => {
        BurialPoint.track('home-course卡片Continue按钮点击', {
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
      {course.progress && course.progress >= 1 ? (
        <div className="absolute right-[1rem] top-[1rem]">
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
      <div className="caption-12pt h-fit w-fit px-[.75rem] py-[0.25rem] text-neutral-rich-gray  border-[0.5px] border-neutral-rich-gray rounded-[1.25rem] ">
        {course.track}
      </div>
      <div className="body-m-bold text-neutral-dark-gray">{course.name}</div>
      {from === 'dashboard' && inProgress ? (
        <>
          <MobCardProgress progress={course.progress || 0} />
          <Button
            className="w-full h-[48px] bg-yellow-primary text-neutral-off-black"
            loading={loading}
            disabled={loading}
            onClick={(e) => {
              BurialPoint.track('home-course卡片Continue按钮点击', {
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
        <>
          <p className="line-clamp-2  body-xs text-neutral-medium-gray">
            {course.description}
          </p>
          <CourseTags
            language={course.language}
            level={course.level as string}
            unitCount={course.unitCount || 0}
            className="justify-between"
          ></CourseTags>
        </>
      )}
    </div>
  );
};

export default MobPracticeCard;
