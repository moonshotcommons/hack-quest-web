import Button from '@/components/Common/Button';
import CheckIcon from '@/components/Common/Icon/Check';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import {
  ProjectCourseType,
  CourseType,
  CourseBaseType
} from '@/service/webApi/course/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import { FC, useCallback, useRef } from 'react';
import { styled } from 'styled-components';
import { Menu, QueryIdType } from '@/components/Web/Business/Breadcrumb/type';
import CourseTags from '@/components/Web/Business/CourseTags';
import { menuLink } from '@/components/Web/Business/Breadcrumb/data';
import { useRedirect } from '@/hooks/useRedirect';
import MiniElectiveDetailModal, {
  MiniElectiveDetailModalRef
} from '../MobMiniElectiveDetailModal';
import { ElectiveCourseType } from '@/service/webApi/elective/type';

interface CourseCardProps {
  // children: ReactNode;
  course: CourseBaseType;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
  onCourseClick?: (course: CourseBaseType) => void;
}

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: #3e3e3e;
      font-size: 12px;
    }
  }
`;

const borderColor: Record<string, string> = {
  [CourseType.GUIDED_PROJECT]: 'border-[#DBCDF6]',
  [CourseType.CONCEPT]: 'border-[#DBCDF6]',
  [CourseType.SYNTAX]: 'border-[#E5F3FF]',
  [CourseType.TEASER]: 'border-[#E5F3FF]',
  [CourseType.MINI]: 'border-[#E5F3FF]'
};

const MobCourseCard: FC<CourseCardProps> = (props) => {
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
        miniElectiveDetailInstance.current?.open(course as ElectiveCourseType);
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
          'relative mt-1 flex h-fit w-[305px] cursor-pointer  flex-col rounded-[10px] border-t-[10px] bg-neutral-white px-5 pb-5 shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)]',
          borderColor[course.type as any]
        )}
        onClick={() => {
          BurialPoint.track('home-course卡片点击', { courseName: course.name });
          onCourseClick();
        }}
      >
        {(inProgress || inCompleted || baseProgress) && (
          <div className="absolute left-[16px] top-[13px]">
            {!!course.progress &&
              course.progress < 1 &&
              course.progress > 0 && (
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
                        <span className="flex items-center justify-center align-middle text-neutral-rich-gray">
                          <CheckIcon
                            width={32}
                            height={32}
                            color="currentColor"
                          />
                        </span>
                      );
                    }
                    return (
                      <p className="body-s relative top-[1px] flex items-end justify-center whitespace-nowrap text-neutral-rich-gray">
                        <span className="relative left-[3px]">{`${percent}`}</span>
                        <span className="relative top-[1px] scale-50 ">%</span>
                      </p>
                    );
                  }}
                ></CustomProgress>
              )}
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
        )}
        <div className="flex h-[148px] w-[265px] items-center justify-center">
          <div className="relative h-[87px] w-[150px]">
            <Image
              src={`${
                process.env.NODE_ENV === 'development'
                  ? ''
                  : process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA ?? ''
              }/images/Web/course/course_cover/${course.type}.svg`}
              fill
              alt="course"
              className="object-contain"
            ></Image>
          </div>
        </div>
        <h3 className="body-m text-neutral-black opacity-60">
          {tagFormate(course.type)}
        </h3>
        <h2 className="text-h3-mob mb-[9px] mt-[5px] line-clamp-1 text-neutral-black">
          {course.name}
        </h2>
        {!inProgress && (
          <Typography.Paragraph
            ellipsis={{ rows: 2 }}
            className="my-[13px] min-h-[45px]"
          >
            <div className="body-s text-neutral-black">
              {course.description}
            </div>
          </Typography.Paragraph>
        )}
        <div className="mt-[9px]">
          <CourseTags
            level={course.level as string}
            duration={course.duration}
            unitCount={(course as ProjectCourseType).unitCount || 0}
            type={course.type}
          ></CourseTags>
        </div>
        {inProgress && (
          <div className="flex flex-col gap-y-5">
            <div className="h-[20px] w-full border-b border-neutral-black"></div>
            <Button
              type="primary"
              className="body-m flex px-0 py-[12px]"
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
              className="body-m flex rounded-[32px] border border-neutral-black px-0 py-[12px]"
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
      {course.type === CourseType.MINI && (
        <MiniElectiveDetailModal ref={miniElectiveDetailInstance} />
      )}
    </>
  );
};

export default MobCourseCard;
