import CheckIcon from '@/components/Common/Icon/Check';
import LockIcon from '@/components/Common/Icon/Lock';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress } from '@/helper/formate';
import { cn, getCourseLink, getLessonLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress, Typography } from 'antd';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, useContext } from 'react';
import styled from 'styled-components';
import { LearningStatus } from '../type';
import { QueryIdType } from '../../Breadcrumb/type';
import Button from '../../Common/Button';

const CustomProgress = styled(Progress)`
  .ant-progress-inner {
    .ant-progress-text {
      color: white;
      font-size: 1rem;
    }
  }
`;

interface UnitCardProps {
  unit: CourseUnitType;
  isLock?: boolean;
  courseType?: CourseType;
  index: number;
  courseDetail?: CourseDetailType;
  learningStatus?: LearningStatus;
  loading?: boolean;
}

const UnitButton: FC<
  UnitCardProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
> = (props) => {
  const { unit, isLock, loading = false, ...rest } = props;
  if (isLock) {
    return null;
  }

  if (unit.progress === 1) {
    return null;
  }

  if (!unit.progress) {
    return (
      <Button
        loading={loading}
        disabled={loading}
        className="w-[165px] px-0 hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px] transition py-[11px]
         border border-solid bg-course-learning-button-bg border-course-learning-button-border-color rounded-[32px] whitespace-nowrap text-[16px] text-[#0B0B0B] font-next-book cursor-pointer leading-[125%]"
        {...rest}
      >
        Start
      </Button>
    );
  }

  return (
    <Button
      loading={loading}
      disabled={loading}
      className="w-[165px] py-[11px] hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px] transition border border-solid bg-course-learning-button-bg border-course-learning-button-border-color rounded-[32px] whitespace-nowrap text-[#0B0B0B] font-next-book text-[16px] cursor-pointer leading-[125%]"
      {...rest}
    >
      Resume
    </Button>
  );
};

const UnitCard: FC<UnitCardProps> = (props) => {
  const {
    unit,
    isLock = true,
    courseDetail,
    courseType,
    index,
    learningStatus = LearningStatus.UN_START
  } = props;
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  return (
    <div className="py-[30px] flex items-center pl-[54px] pr-[50px]">
      {/* <div
        className={`w-[23.25rem] h-[9.8125rem] rounded-[1.25rem] overflow-hidden flex justify-center ${
          unit.progress === 1 ? 'cursor-pointer' : ''
        }`}
        onClick={async (e) => {
          if (unit.progress === 1) {
            const unitPages = await webApi.courseApi.getCourseUnitLessons(
              courseDetail?.id || '',
              unit.id
            );
            const lessonId = unitPages.pages[0]?.id;
            router.replace(
              `${getCourseLink(courseType)}/${
                courseDetail?.name
              }/learn/${lessonId}`
            );
          }
        }}
      ></div> */}
      <div className="w-[65px] h-[65px] flex items-center justify-center">
        {learningStatus !== LearningStatus.UN_START && (
          <div className="text-text-default-color flex items-center justify-center">
            {isLock ? (
              <span className="text-course-unit-lock-icon-color">
                <LockIcon
                  width={16}
                  height={21}
                  color="currentColor"
                ></LockIcon>
              </span>
            ) : (
              <CustomProgress
                type="circle"
                percent={Math.floor(computeProgress(unit.progress))}
                strokeWidth={2}
                strokeColor={
                  (theme === Theme.Dark && '#9EFA13') ||
                  (theme === Theme.Light && '#FCC409') ||
                  '#9EFA13'
                }
                trailColor={
                  (theme === Theme.Dark && '#676767') ||
                  (theme === Theme.Light && '#DADADA') ||
                  '#676767'
                }
                size={80}
                format={(percent: any) => {
                  if (percent === 100) {
                    return (
                      <span className="flex justify-center items-center align-middle text-course-progress-icon-color">
                        <CheckIcon
                          width={32}
                          height={32}
                          color="currentColor"
                        />
                      </span>
                    );
                  }
                  return (
                    <span className="text-text-default-color">{`${percent} %`}</span>
                  );
                }}
              ></CustomProgress>
            )}
          </div>
        )}

        {learningStatus === LearningStatus.UN_START && (
          <div className="w-[65px] h-[65px] border-2 border-[#000] rounded-full relative">
            <span className="absolute text-[32px] font-next-poster text-[#000 tracking-[1.92px] left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {index + 1}
            </span>
          </div>
        )}
      </div>

      <div className="ml-[60px] lg:ml-[120px] xl:ml-[335px] flex-1">
        <div
          className={cn(
            'max-w-[450px]',
            unit.progress === 1 ? 'cursor-pointer' : ''
          )}
          onClick={async (e) => {
            if (unit.progress === 1) {
              const unitPages = await webApi.courseApi.getCourseUnitLessons(
                courseDetail?.id || '',
                unit.id
              );
              const lessonId = unitPages.pages[0]?.id;
              const { query } = router;
              let link = `${getLessonLink(
                courseType as CourseType,
                courseDetail?.name as string,
                lessonId,
                courseDetail?.id as string,
                {
                  menu: query.menu as string,
                  idTypes: [
                    QueryIdType.LEARNING_TRACK_ID,
                    QueryIdType.MENU_COURSE_ID
                  ],
                  ids: [
                    query[QueryIdType.LEARNING_TRACK_ID] || '',
                    query[QueryIdType.MENU_COURSE_ID] || ''
                  ] as string[]
                }
              )}`;
              router.replace(link);
            }
          }}
        >
          <h2 className="font-next-book-bold font-bold text-[1.5rem] text-text-default-color leading-[120%]">
            {unit.name}
          </h2>
          <div>
            <Typography.Paragraph
              ellipsis={{ rows: 3 }}
              className="text-course-unit-desc-text-color font-next-book leading-[120%] text-base mt-4"
            >
              {unit.description}
            </Typography.Paragraph>
          </div>
        </div>
      </div>

      <div className="w-[165px] max-w-[165px]">
        <UnitButton
          unit={unit}
          isLock={isLock}
          index={index}
          loading={loading}
          onClick={() => {
            BurialPoint.track('courseDetail-unit按钮', {
              courseName: courseDetail?.name || '',
              unitName: unit.name
            });
            courseDetail && jumpLearningLesson(courseDetail);
          }}
        ></UnitButton>
      </div>
    </div>
  );
};

export default UnitCard;
