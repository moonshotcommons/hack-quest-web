import { Theme } from '@/constants/enum';
import { computeProgress, tagFormate } from '@/helper/formate';
import { cn } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import {
  CourseDetailType,
  CourseResponse,
  CourseType
} from '@/service/webApi/course/type';
import { SectionType } from '@/service/webApi/learningTrack/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress } from 'antd';
import { useRouter } from 'next/router';
import { FC, useContext, useEffect, useState } from 'react';
import { GrSubtract } from 'react-icons/gr';
import { VscAdd } from 'react-icons/vsc';
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

interface SectionCardProps {
  section: SectionType;
  enrolled?: boolean;
  index: number;
  expandAll: boolean;
  sectionList: SectionType[];
}

// const UnitButton: FC<
//   SectionCardProps & ButtonHTMLAttributes<HTMLButtonElement>
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
    // return (
    //   <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#0891D5] to-[#38C1A5]"></div>
    // );
    case CourseType.GUIDED_PROJECT:
    // return (
    //   <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#5C1DE6] to-[#1B7DEC]"></div>
    // );
    case CourseType.CONCEPT:
    // return (
    //   <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#EB3E1C] to-[#E0AD38]"></div>
    // );
    case CourseType.TEASER:
    // return (
    //   <div className="absolute w-[0.25rem] left-0 h-[1.25rem] rounded-xl bg-gradient-to-r from-[#8E8E8E] to-[#FFF]"></div>
    // );
    default:
      return (
        <div className="w-[0.25rem] left-0 h-[26px] rounded-xl bg-[#8C8C8C]"></div>
      );
  }
};

function SectionList(props: {
  section: SectionType;
  enrolled: boolean;
  theme: Theme;
  sectionIndex: number;
  sectionList: SectionType[];
}) {
  const { section, enrolled, theme, sectionIndex, sectionList } = props;
  const router = useRouter();
  const jumpLearningLesson = useJumpLeaningLesson();

  const renderLearningButton = (item: CourseDetailType, index: number) => {
    if (!enrolled) return null;

    if (item.progress <= 0) {
      // 课程为当前section的第一个，判断上个section的最后一个的进度，如果没有完成，那么不显示按钮
      if (index === 0 && sectionIndex !== 0) {
        let prevCourses = sectionList[sectionIndex - 1].courses;
        let prevCourse = prevCourses[prevCourses.length - 1] as CourseResponse;
        console.log('---------------------------');
        console.log(prevCourse.name, item.name);
        if (prevCourse.progress < 1) return null;
      }

      //  课程不为当前section的第一个，判断上一个course的progress是否完成，完成展示start，未完成不展示
      if (index !== 0) {
        let prevCourse = sectionList[sectionIndex].courses[
          index - 1
        ] as CourseResponse;
        if (prevCourse.progress < 1) return null;
      }
    }

    return (
      <>
        {enrolled && item.progress < 1 && (
          <div className="h-full flex items-center justify-end pr-[50px]">
            <button
              className="w-[165px] py-[11px] leading-[125%] border border-solid bg-course-learning-button-bg border-course-learning-button-border-color rounded-[32px] whitespace-nowrap text-sm text-[#0B0B0B] font-next-book text-[16px] cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                jumpLearningLesson(item);
              }}
            >
              {item.progress > 0 ? 'Resume' : 'Start'}
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <ul className="pl-[90px] flex flex-col gap-y-5 w-full py-[15px]">
      {section.courses.map((item: any, index: number) => {
        return (
          <li
            key={index}
            className={cn(
              `flex h-[4.25rem] items-center justify-between py-[8px]`
            )}
          >
            <div className="text-learning-track-progress-text-color w-[40px] h-[40px]">
              {!enrolled && (
                <div className="w-full h-full relative border border-black rounded-full text-[24px] font-next-poster">
                  <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                    {index + 1}
                  </span>
                </div>
              )}
              {enrolled && (
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
              )}
            </div>

            <div className="flex ml-[10%] gap-[10px] items-center ">
              {renderColorTag(item.type)}
              <span className="inline-flex text-[16px]  text-black opacity-60 tracking-[0.32px] font-next-book leading-[160%] min-w-[120px]">
                {tagFormate(item.type)}
              </span>
            </div>
            <div
              className="text-learning-track-course-title-color font-next-book-bold leading-[120%] w-[36%] ml-[10%] flex-1 cursor-pointer hover:opacity-70 transition"
              onClick={(e) => router.push(`/v2/electives/${item.id}`)}
            >
              {item.name}
            </div>
            {renderLearningButton(item, index)}
          </li>
        );
      })}
    </ul>
  );
}

const SectionCard: FC<SectionCardProps> = (props) => {
  const {
    section,
    enrolled = false,
    index: sectionIndex,
    expandAll,
    sectionList
  } = props;
  const [expand, setExpand] = useState(expandAll);
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    setExpand(expandAll);
  }, [expandAll]);

  const SectionTitle = (
    <div className="flex w-full items-center gap-[35px]">
      <div className="w-[55px] h-[55px]">
        {!enrolled && (
          <div className="w-full h-full relative border border-black rounded-full text-[24px] font-next-poster">
            <span className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {sectionIndex + 1}
            </span>
          </div>
        )}
        {enrolled && (
          <CustomProgress
            type="circle"
            percent={Math.floor(computeProgress(0.4))}
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
            size={55}
          ></CustomProgress>
        )}
      </div>
      <div className="font-next-poster-Bold tracking-[1.26px] leading-normal  text-text-default-color text-[21px] w-[30%] flex mt-2 flex-1">
        {`${section.name}`}
      </div>

      {!expand && (
        <div
          className="cursor-pointer p-[10px] w-fit h-fit"
          onClick={() => setExpand(true)}
        >
          <VscAdd size={28}></VscAdd>
        </div>
      )}
      {expand && (
        <div
          className="cursor-pointer p-[10px] w-fit h-fit"
          onClick={() => setExpand(false)}
        >
          <GrSubtract size={28}></GrSubtract>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-5 w-full flex items-start flex-col ">
      {SectionTitle}
      {expand && (
        <SectionList
          section={section}
          enrolled={enrolled}
          theme={theme}
          sectionIndex={sectionIndex}
          sectionList={sectionList}
        />
      )}
    </div>
  );
};

export default SectionCard;
