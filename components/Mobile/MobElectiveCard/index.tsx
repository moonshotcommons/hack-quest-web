import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseType } from '@/service/webApi/course/type';
import { Progress } from 'antd';
import { FC, useCallback, useRef } from 'react';
import { styled } from 'styled-components';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { Tag } from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import MobMiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '../MobMiniElectiveDetailModal';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface ElectiveCardProps {
  // children: ReactNode;
  course: ElectiveCourseType;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
  onCourseClick?: (course: ElectiveCourseType) => void;
}

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;

const MobElectiveCard: FC<ElectiveCardProps> = (props) => {
  const {
    course,
    inProgress = false,
    inCompleted = false,
    baseProgress = false,
    onCourseClick: courseClick
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
          `${menuLink.electives}/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${Menu.ELECTIVES}`
        );
    }
  }, [course]);

  return (
    <>
      <div
        className={cn(
          'flex flex-col rounded-[1rem] w-full bg-white relative cursor-pointer overflow-hidden'
        )}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', { courseName: course.name });
          onCourseClick();
        }}
      >
        {/* {
          <div className="absolute font-neuemachina-light top-6 left-6 z-[9]">
            {!!course.progress && course.progress >= 1 && (
              <svg
                width="32"
                height="32"
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
            )}
          </div>
        } */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div className="flex flex-col">
            <h2 className="text-h4-mob line-clamp-1 text-neutral-off-black">
              {course.name}
            </h2>
            {!inProgress && (
              <p className="line-clamp-2 caption-12pt text-neutral-medium-gray mt-2">
                {course.description}
              </p>
            )}

            <div className="flex justify-between mt-[1.25rem]">
              <div className="px-[10px] py-1 border border-neutral-rich-gray w-fit rounded-full button-text-s text-neutral-rich-gray uppercase">
                {course.track}
              </div>
              <Tag
                icon={<AltIcon />}
                size="small"
                className="tagFont uppercase button-text-s"
              >
                {course.language}
              </Tag>
            </div>
          </div>

          {/* <div className="mt-[9px]">
            <CourseTags
              level={course.level as string}
              duration={course.duration}
              unitCount={course.unitCount || course.pageCount || 0}
              type={course.type}
            ></CourseTags>
          </div> */}
          {inProgress && (
            <div className="flex flex-col gap-y-5">
              <div className="w-full h-[20px] border-b border-[#000]"></div>
              <Button
                type="primary"
                className="px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
                block
                loading={loading}
                disabled={loading}
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
                Resume
              </Button>

              <Button
                className="border border-[#000] rounded-[32px] px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
                block
                onClick={() => {
                  BurialPoint.track('home-course卡片View Syllabus按钮点击', {
                    courseName: course.name
                  });
                }}
              >
                View Syllabus
              </Button>
            </div>
          )}
        </div>
      </div>
      <MobMiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </>
  );
};

export default MobElectiveCard;
