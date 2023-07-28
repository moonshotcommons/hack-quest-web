import LockIcon from '@/components/Common/Icon/Lock';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn, getCourseLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: white;
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
  const router = useRouter();
  const jumpLearningLesson = useJumpLeaningLesson();
  return (
    <div className=" pt-[2.5rem] pb-[1.5rem] w-full flex items-start">
      <div className="font-next-book leading-[120%] text-[#F2F2F2] text-[1rem] w-[30%] flex mt-2">
        {`${course.title} - >`}
      </div>
      <ul className="flex flex-col w-[70%]">
        {course.courses.map((item: any, index: number) => {
          return (
            <li
              key={index}
              onClick={(e) =>
                router.push(`${getCourseLink(item.type)}/${item.id}`)
              }
              className={cn(
                `flex py-[0.5rem] h-[4.25rem] items-center justify-between pl-[1.25rem] pr-[0.5rem]`,
                hoverCourseIndex === index
                  ? 'bg-[#151515] rounded-[0.5rem] cursor-pointer'
                  : ''
              )}
              onMouseEnter={(e) => setHoverCourseIndex(index)}
              onMouseLeave={(e) => setHoverCourseIndex(null)}
            >
              <div className="relative flex w-[30.57%]">
                {renderColorTag(item.type)}
                <span className="text-[0.875rem] text-[#B2B2B2] font-next-book leading-[120%] ml-[1.38rem]">
                  {tagFormate(item.type)}
                </span>
              </div>
              <div className="text-[#EDEDED] font-next-book-bold leading-[120%] w-[36%]">
                {item.name}
              </div>
              <div className="w-[3%]">
                {item.progress > 0 ? (
                  <CustomProgress
                    type="circle"
                    percent={Math.floor(computeProgress(item.progress))}
                    strokeWidth={4}
                    strokeColor="#EDEDED"
                    trailColor="#494949"
                    size={40}
                  ></CustomProgress>
                ) : null}
              </div>

              <div className="w-[8.875rem] h-full flex items-center justify-end flex-1">
                {hoverCourseIndex === index ? (
                  <button
                    className="px-8 text-[#F2F2F2] py-[0.875rem] font-next-book border border-solid text-[0.625rem] border-[#F2F2F2] rounded-[2.5rem] whitespace-nowrap leading-[120%]  primary-button-hover cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      jumpLearningLesson(item);
                    }}
                  >
                    {item.progress > 0 ? 'Resume Learning' : 'Start Learning'}
                  </button>
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
