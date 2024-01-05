import { BurialPoint } from '@/helper/burialPoint';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { ProjectCourseType } from '@/service/webApi/course/type';
import { FC } from 'react';
import { Menu, QueryIdType } from '@/components/v2/Business/Breadcrumb/type';
import CourseTags from '@/components/v2/Business/CourseTags';
import { menuLink } from '@/components/v2/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';

interface PracticeCardProps {
  // children: ReactNode;
  course: ProjectCourseType;
}

const MobPracticeCard: FC<PracticeCardProps> = (props) => {
  const { course } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { redirectToUrl } = useRedirect();

  return (
    <div
      className={
        'flex flex-col w-full rounded-[1rem] p-[1.25rem] bg-white relative cursor-pointer'
      }
      onClick={() => {
        BurialPoint.track('home-practice卡片点击', { practice: course.name });
        redirectToUrl(
          `${menuLink.electives}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
        );
      }}
    >
      <div className="flex flex-col gap-5 w-full">
        <div className="button-text-s rounded-full border border-neutral-rich-gray w-fit px-[.625rem] py-1 uppercase">
          {course.track}
        </div>
        <div className="flex flex-col gap-y-2">
          <h2 className="text-h4-mob">{course.name}</h2>
          <p className="line-clamp-2">{course.description}</p>
        </div>

        <CourseTags
          language={course.language}
          level={course.level as string}
          unitCount={course.unitCount || 0}
          className="justify-between"
        ></CourseTags>
      </div>
    </div>
  );
};

export default MobPracticeCard;
