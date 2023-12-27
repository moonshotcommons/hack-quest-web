import Button from '@/components/v2/Common/Button';
import { Theme } from '@/constants/enum';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn, getCourseLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import { useRedirect } from '@/hooks/useRedirect';
import { CourseType } from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress } from 'antd';
import { FC, useContext, useState } from 'react';
import styled from 'styled-components';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: var(--learning-track-progress-text-color);
      font-size: 0.625rem;
      .anticon-check {
        font-size: 1rem;
      }
    }
  }
`;

interface TrackCardProps {
  course: any;
  // isLock?: boolean;
  // courseType?: CourseType;
  // index: number;
  // courseDetail?: CourseDetailType;
}

// const UnitButton: FC<
//   TrackCardProps & ButtonHTMLAttributes<HTMLButtonElement>
// > = (props) => {
//   const { unit, isLock, ...rest } = props;
//   if (isLock) {
//     return null;
//   }

//   if (unit.progress === 1) {
//     return null;
//   }

//   if (!unit.progress) {
//     return (
//       <button
//         className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
//         {...rest}
//       >
//         Start Learning
//       </button>
//     );
//   }

//   return (
//     <button
//       className="px-8 py-4 border border-solid border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap text-sm text-[#F2F2F2] primary-button-hover cursor-pointer"
//       {...rest}
//     >
//       Resume Learning
//     </button>
//   );
// };

const renderColorTag = (type: CourseType) => {
  switch (type) {
    case CourseType.SYNTAX:
      return (
        <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#0891D5] to-[#38C1A5]"></div>
      );
    case CourseType.GUIDED_PROJECT:
      return (
        <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#5C1DE6] to-[#1B7DEC]"></div>
      );
    case CourseType.CONCEPT:
      return (
        <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#EB3E1C] to-[#E0AD38]"></div>
      );
    case CourseType.TEASER:
      return (
        <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#8E8E8E] to-[#FFF]"></div>
      );
  }
};

const TrackCard: FC<TrackCardProps> = (props) => {
  const { course } = props;
  const [hoverCourseIndex, setHoverCourseIndex] = useState<number | null>(null);
  const { theme } = useContext(ThemeContext);
  const { redirectToUrl } = useRedirect();
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  return (
    <div className=" pt-[2.5rem] pb-[1.5rem] w-full flex items-start">
      <div className="font-next-book leading-[120%] text-text-default-color text-[1rem] w-[30%] flex mt-2">
        {`${course.title} - >`}
      </div>
      <ul className="flex flex-col w-[70%]">
        {course.courses.map((item: any, index: number) => {
          return (
            <li
              key={index}
              onClick={(e) =>
                redirectToUrl(`${getCourseLink(item.type)}/${item.id}`)
              }
              className={cn(
                `flex py-[0.5rem] h-[4.25rem] items-center justify-between pl-[1.25rem] pr-[0.5rem]`,
                hoverCourseIndex === index
                  ? 'bg-learning-track-course-hover-bg rounded-[0.5rem] cursor-pointer'
                  : ''
              )}
              onMouseEnter={(e) => setHoverCourseIndex(index)}
              onMouseLeave={(e) => setHoverCourseIndex(null)}
            >
              <div className="relative flex w-[30.57%]">
                {renderColorTag(item.type)}
                <span className="text-[0.875rem] text-learning-track-course-type-color font-next-book leading-[120%] ml-[1.38rem]">
                  {tagFormate(item.type)}
                </span>
              </div>
              <div className="text-learning-track-course-title-color font-next-book-bold leading-[120%] w-[36%]">
                {item.name}
              </div>
              <div className="w-[3%] text-learning-track-progress-text-color">
                {item.progress > 0 ? (
                  <CustomProgress
                    type="circle"
                    percent={Math.floor(computeProgress(item.progress))}
                    strokeWidth={4}
                    strokeColor={
                      (theme === Theme.Dark && '#9EFA13') ||
                      (theme === Theme.Light && '#FCC409') ||
                      '#9EFA13'
                    }
                    trailColor={
                      (theme === Theme.Dark && '#EDEDED') ||
                      (theme === Theme.Light && '#8C8C8C ') ||
                      '#EDEDED'
                    }
                    size={40}
                  ></CustomProgress>
                ) : null}
              </div>

              <div className="w-[8.875rem] h-full flex items-center justify-end flex-1">
                {hoverCourseIndex === index ? (
                  <Button
                    loading={loading}
                    disabled={loading}
                    className="px-8 text-course-learning-button-text-color py-[0.875rem] font-next-book bg-course-learning-button-bg border border-solid text-[0.625rem] border-course-learning-button-border-color rounded-[2.5rem] whitespace-nowrap leading-[120%]  primary-button-hover cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      jumpLearningLesson(item);
                    }}
                  >
                    {item.progress > 0 ? 'Resume Learning' : 'Start Learning'}
                  </Button>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TrackCard;
