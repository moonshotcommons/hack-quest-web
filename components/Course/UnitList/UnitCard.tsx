import CheckIcon from '@/components/Common/Icon/Check';
import LockIcon from '@/components/Common/Icon/Lock';
import PassIcon from '@/components/Common/Icon/Pass';
import Button from '@/components/v2/Common/Button';
import { Theme } from '@/constants/enum';
import { computeProgress } from '@/helper/formate';
import { getCourseLink } from '@/helper/utils';
import { useJumpLeaningLesson } from '@/hooks/useCoursesHooks/useJumpLeaningLesson';
import webApi from '@/service';
import {
  CourseDetailType,
  CourseType,
  CourseUnitType
} from '@/service/webApi/course/type';
import { ThemeContext } from '@/store/context/theme';
import { Progress, Typography } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ButtonHTMLAttributes, FC, ReactNode, useContext } from 'react';
import styled from 'styled-components';

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
  loading?: boolean;
}

const UnitButton: FC<
  UnitCardProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type'>
> = (props) => {
  const { unit, isLock, loading, ...rest } = props;
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
        className="px-8 py-4 border border-solid bg-course-learning-button-bg border-course-learning-button-border-color rounded-[2.5rem] whitespace-nowrap text-sm text-course-learning-button-text-color primary-button-hover cursor-pointer"
        {...rest}
      >
        Start Learning
      </Button>
    );
  }

  return (
    <Button
      loading={loading}
      disabled={loading}
      className="px-8 py-4 border border-solid bg-course-learning-button-bg border-course-learning-button-border-color rounded-[2.5rem] whitespace-nowrap text-sm text-course-learning-button-text-color primary-button-hover cursor-pointer"
      {...rest}
    >
      Resume Learning
    </Button>
  );
};

const UnitCard: FC<UnitCardProps> = (props) => {
  const { unit, isLock = true, courseDetail, courseType, index } = props;
  const router = useRouter();
  const { jumpLearningLesson, loading } = useJumpLeaningLesson();
  const { theme } = useContext(ThemeContext);
  return (
    <div className="py-[1.5rem] flex  items-center">
      <div
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
      >
        <img
          src={`/images/unit/unit_cover/${index + 1}_${theme}.png`}
          alt="cover"
          className="h-full scale-[0.65]"
        ></img>
        {/* <Image
          src={`/images/unit/unit_cover/${index + 1}.png`}
          alt="cover"
          className="h-full scale-[3]"
        ></Image> */}
      </div>
      <div className="ml-[3.69rem] h-[9.8125rem] w-[22.4375rem]">
        <h2 className="font-next-book-bold font-bold text-[1.5rem] mt-[1.72rem] text-text-default-color leading-[120%]">
          {unit.name}
        </h2>
        <div>
          <Typography.Paragraph
            ellipsis={{ rows: 3 }}
            className="text-course-unit-desc-text-color font-next-book leading-[120%] text-base mt-4 "
          >
            {unit.description}
          </Typography.Paragraph>
        </div>
      </div>
      <div className="text-text-default-color flex-1 flex items-center justify-center">
        {isLock ? (
          <span className="text-course-unit-lock-icon-color">
            <LockIcon width={16} height={21} color="currentColor"></LockIcon>
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
                    <CheckIcon width={32} height={32} color="currentColor" />
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

      <div className="flex-1">
        <UnitButton
          unit={unit}
          isLock={isLock}
          index={index}
          loading={loading}
          onClick={() => courseDetail && jumpLearningLesson(courseDetail)}
        ></UnitButton>
      </div>
    </div>
  );
};

export default UnitCard;
