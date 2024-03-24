import CheckIcon from '@/components/Common/Icon/Check';
import LockIcon from '@/components/Common/Icon/Lock';
import { Theme } from '@/constants/enum';
import { BurialPoint } from '@/helper/burialPoint';
import { computeProgress } from '@/helper/formate';
import { cn, getLessonLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/courses/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress, Typography } from 'antd';
import { useRouter } from 'next/navigation';
import { FC, useContext } from 'react';
import styled from 'styled-components';
import { LearningStatus } from '../type';
import Button from '@/components/Common/Button';
import { QueryIdType } from '../../Business/Breadcrumb/type';

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
        className="body-m w-[165px] cursor-pointer whitespace-nowrap rounded-[32px] border
         border-solid border-course-learning-button-border-color bg-course-learning-button-bg px-0 py-[11px] text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
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
      className="body-m w-[165px] cursor-pointer whitespace-nowrap rounded-[32px] border border-solid border-course-learning-button-border-color bg-course-learning-button-bg py-[11px] text-neutral-black transition hover:-translate-y-[1px] hover:shadow-[rgba(0,0,0,0.15)_1.95px_1.95px_2.6px]"
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
  const query = new URLSearchParams(
    typeof window !== 'undefined' ? window.location.search : ''
  );
  return (
    <div className="flex items-center py-[30px] pl-[54px] pr-[50px]">
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
      <div className="flex h-[65px] w-[65px] items-center justify-center">
        {learningStatus !== LearningStatus.UN_START && (
          <div className="flex items-center justify-center text-text-default-color">
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
                      <span className="flex items-center justify-center align-middle text-course-progress-icon-color">
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
          <div className="relative h-[65px] w-[65px] rounded-full border-2 border-neutral-black">
            <span className="text-[#000 text-h3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {index + 1}
            </span>
          </div>
        )}
      </div>

      <div className="ml-[60px] flex-1 lg:ml-[120px] xl:ml-[335px]">
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
              let link = `${getLessonLink(
                courseType as CourseType,
                courseDetail?.title as string,
                lessonId,
                courseDetail?.id as string,
                {
                  menu: query.get('menu') as string,
                  idTypes: [
                    QueryIdType.LEARNING_TRACK_ID,
                    QueryIdType.MENU_COURSE_ID
                  ],
                  ids: [
                    query.get(QueryIdType.LEARNING_TRACK_ID) || '',
                    query.get(QueryIdType.MENU_COURSE_ID) || ''
                  ] as string[]
                }
              )}`;
              router.replace(link);
            }
          }}
        >
          <h2 className="body-xl-bold text-text-default-color">{unit.title}</h2>
          <div>
            <Typography.Paragraph
              ellipsis={{ rows: 3 }}
              className="body-m mt-4 text-course-unit-desc-text-color"
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
              courseName: courseDetail?.title || '',
              unitName: unit.title
            });
            courseDetail && jumpLearningLesson(courseDetail);
          }}
        ></UnitButton>
      </div>
    </div>
  );
};

export default UnitCard;
