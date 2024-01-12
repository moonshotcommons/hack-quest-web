import Button from '@/components/Common/Button';
import { BurialPoint } from '@/helper/burialPoint';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseType } from '@/service/webApi/course/type';
import Image from 'next/image';
import { FC, useCallback, useRef } from 'react';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import { Tag } from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '../MiniElectiveDetailModal';
import AltIcon from '@/components/Common/Icon/AltIcon';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

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
      case CourseType.Mini:
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
          'flex flex-col rounded-[16px] h-[371px] bg-white w-[302px] card-hover relative cursor-pointer',
          className
        )}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', { courseName: course.name });
          onCourseClick();
        }}
      >
        {
          <div
            className={`absolute font-neuemachina-light top-6  z-[9] right-[16px]`}
          >
            {/* {course.progress < 1 && course.progress > 0 && (
              <CustomProgress
                type="circle"
                percent={Math.floor(computeProgress(course.progress))}
                strokeWidth={6}
                strokeColor={'#FCC409'}
                trailColor={'#8C8C8C'}
                size={32}
                format={(percent: any) => {
                  if (percent === 100) {
                    return (
                      <span className="flex justify-center items-center align-middle text-[#3E3E3E]">
                        <CheckIcon
                          width={32}
                          height={32}
                          color="currentColor"
                        />
                      </span>
                    );
                  }
                  return (
                    <p className="flex justify-center relative top-[1px] items-end text-[12px] text-[#3E3E3E]   font-neuemachina-light whitespace-nowrap">
                      <span className="relative left-[3px]">{`${percent}`}</span>
                      <span className="scale-50 relative top-[1px] ">%</span>
                    </p>
                  );
                }}
              ></CustomProgress>
            )} */}
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
        }
        <div className="h-[120px] w-full flex items-center justify-center relative rounded-t-2xl overflow-hidden">
          <Image
            src={course.image}
            fill
            alt="cover"
            className="object-cover"
          ></Image>
        </div>
        <div className="py-5 px-6 flex flex-col flex-1 justify-between">
          {/* <h3 className="text-[#0B0B0B] font-next-book leading-[160%]  tracking-[0.32px] opacity-60 text-base">
            {tagFormate(course.type)}
          </h3> */}
          <div className="flex flex-col gap-y-4">
            <div className="flex justify-between">
              <div className="px-[10px] py-1 border border-neutral-rich-gray w-fit rounded-full button-text-s text-neutral-rich-gray uppercase">
                {course.track}
              </div>
              <Tag
                icon={<AltIcon />}
                size="small"
                className="tagFont uppercase"
              >
                {course.language}
              </Tag>
            </div>
            <h2 className="text-h4 line-clamp-1 text-neutral-off-black">
              {course.title}
            </h2>
            {!inProgress && (
              <p className="line-clamp-2 body-s text-neutral-medium-gray ">
                {course.description}
              </p>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-9 h-9 rounded-full relative overflow-hidden">
              <Image
                src={course.creator?.profileImage || ''}
                fill
                alt="creator"
              ></Image>
            </div>
            <span className="body-s-bold">{course.creator?.name}</span>
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
      <MiniElectiveDetailModal ref={miniElectiveDetailInstance} />
    </>
  );
};

export default ElectiveCard;
