import Button from '@/components/Common/Button';
import CheckIcon from '@/components/Common/Icon/Check';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { CourseResponse, CourseType } from '@/service/webApi/course/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { styled } from 'styled-components';
import { MenuLink, QueryIdType } from '../Breadcrumb/type';
import CourseTags from '../CourseTags';

interface CourseCardProps {
  // children: ReactNode;
  course: CourseResponse;
  inProgress?: boolean;
  inCompleted?: boolean;
  baseProgress?: boolean;
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
  [CourseType.Mini]: 'border-[#E5F3FF]'
};

const CourseCard: FC<CourseCardProps> = (props) => {
  const {
    course,
    inProgress = false,
    inCompleted = false,
    baseProgress = false
  } = props;
  const jumpLearningLesson = useJumpLeaningLesson();
  const router = useRouter();

  return (
    <div
      className={cn(
        'flex px-5 pb-5 flex-col border-t-[10px] rounded-[10px]  h-fit bg-white w-[305px] hover:-translate-y-1 transition-all duration-300 mt-1 relative shadow-[0px_0px_4px_0px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(149,157,165,0.2)] cursor-pointer',
        borderColor[course.type as any]
      )}
      onClick={() => {
        BurialPoint.track('home-course卡片点击', { courseName: course.name });
        router.push(
          `/electives/${course.id}?${QueryIdType.MENU_COURSE_ID}=${course.id}&menu=${MenuLink.ELECTIVES}`
        );
      }}
    >
      {(inProgress || inCompleted || baseProgress) && (
        <div className="absolute font-neuemachina-light top-[13px] left-[16px]">
          {course.progress < 1 && course.progress > 0 && (
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
                      <CheckIcon width={32} height={32} color="currentColor" />
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
          )}
          {course.progress >= 1 && (
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
      <div className="h-[148px] w-[265px] flex items-center justify-center">
        <div className="h-[87px] relative  w-[150px]">
          <Image
            src={`${
              process.env.NODE_ENV === 'development'
                ? ''
                : process.env.NEXT_PUBLIC_ASSET_PREFIX_FOR_CHINA ?? ''
            }/images/v2/course/course_cover/${course.type}.svg`}
            fill
            alt="course"
            className="object-contain"
          ></Image>
        </div>
      </div>
      <h3 className="text-[#0B0B0B] font-next-book leading-[160%]  tracking-[0.32px] opacity-60 text-base">
        {tagFormate(course.type)}
      </h3>
      <h2 className="text-[18px] font-next-poster-Bold text-[#000] tracking-[1.08px] mt-[5px] mb-[9px]">
        {course.name}
      </h2>
      {!inProgress && (
        <Typography.Paragraph ellipsis={{ rows: 2 }} className="my-[13px]">
          <div className="text-[14px] font-next-book-Thin leading-[160%] text-[#000]">
            {course.description}
          </div>
        </Typography.Paragraph>
      )}
      <div className="mt-[9px]">
        <CourseTags
          level={course.level as string}
          duration={course.duration}
          unitCount={course.unitCount}
        ></CourseTags>
      </div>
      {inProgress && (
        <div className="flex flex-col gap-y-5">
          <div className="w-full h-[20px] border-b border-[#000]"></div>
          <Button
            type="primary"
            className="px-0 py-[12px] flex text-[16px] font-next-book tracking-[0.32] leading-[125%]"
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
  );
};

export default CourseCard;
